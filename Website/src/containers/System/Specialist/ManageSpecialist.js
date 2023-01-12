import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialist.scss'
import { FormattedMessage } from 'react-intl'
import { CommonUtils, LANGUAGES } from '../../../utils';
import { getIdNameSpecialty } from '../../../services/userService';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getInforSpecitaltybyId, updateInforSpecialty } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialist extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
            selectedSpecialty: '',
            previewImgUrl: [],
            imagebase64: '',
            descriptionMarkdown: '',
            descriptioncontentHTML: '',
            nameEn: '',
            nameVi: '',
            Special: []
        }
    }

    async componentDidMount() {
        let arraySpe = await this.fetchAllSpecials()
        this.setState({
            arrSpecialty: arraySpe
        })
    }


    fetchAllSpecials = async () => {
        let language = this.props.language
        let data = await getIdNameSpecialty()
        let arrSpecialty = data.data

        let array = []
        if (arrSpecialty && arrSpecialty.data.length > 0) {

            arrSpecialty.data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.nameVi : item.nameEn
                object.value = item.id
                array.push(object)
            })
        } return array
    }


    handleOnchangeImage = async (event) => {
        let data_file = event.target.files
        let file = data_file[0]
        console.log("data_fille", data_file)
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("base64", base64)
            let ObjectURL = URL.createObjectURL(file)

            this.setState({
                previewImgUrl: ObjectURL,
                imagebase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptioncontentHTML: html,
        })
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arraySpe = await this.fetchAllSpecials()
            this.setState({
                arrSpecialty: arraySpe
            })
        }

    }
    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    selectedSpecialty = async (data) => {
        this.setState({
            selectedSpecialty: data.value,
            Special: data

        })

        let dataSpecialty = await getInforSpecitaltybyId(data.value)
        console.log(dataSpecialty)
        let image = dataSpecialty.data.data.image
        let imageBase64prew = ''
        if (image) {

            imageBase64prew = new Buffer(image, 'base64').toString('binary')
            this.setState({
                previewImgUrl: imageBase64prew,
                imagebase64: imageBase64prew
            })
        }
        if (dataSpecialty) {
            this.setState({
                nameEn: dataSpecialty.data.data.nameEn,
                nameVi: dataSpecialty.data.data.nameVi,
                descriptionMarkdown: dataSpecialty.data.data.description,
                descriptioncontentHTML: dataSpecialty.data.data.contentHTML
            })
        }
    }



    handleUpdateSpeciaty = async () => {

        // console.log(this.state.selectedSpecialty)
        let data = await updateInforSpecialty({
            id: this.state.selectedSpecialty,
            description: this.state.descriptionMarkdown,
            contentHTML: this.state.descriptioncontentHTML,
            image: this.state.imagebase64,
            nameVi: this.state.nameVi,
            nameEn: this.state.nameEn
        })
        if (data.errCode === 0) {
            let { language } = this.props
            language === LANGUAGES.VI ? alert('Lưu thành công') : alert('Update success !!!')
            window.location.reload();
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    render() {
        let { selectedSpecialty, Special } = this.state
        return (
            <>
                <div className='title'> Thông tin chuyên khoa</div>

                <div className='container'>
                    <form>
                        <div className="row col-12 pt-5 ">
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.dr_specialty'} /></span>
                                <Select
                                    className='form-control'
                                    value={Special}
                                    onChange={(event) => this.selectedSpecialty(event)}
                                    options={this.state.arrSpecialty}
                                />
                            </div>

                            <div className="col-2">
                                <span>Tên VI</span>
                                <input
                                    type="text"
                                    className='form-control' value={this.state.nameVi}
                                    onChange={(event) => this.onChangeInput(event, "nameVi")}
                                />
                            </div>
                            <div className="col-2">
                                <span>Tên EN</span>
                                <input
                                    type="text"
                                    className='form-control' value={this.state.nameEn}
                                    onChange={(event) => this.onChangeInput(event, "nameEn")}
                                />
                            </div>


                            <div className=" col-3">
                                <label for="inputZip"><FormattedMessage id="manage-user.Image" /></label>
                                <div>
                                    <input id='previewImg' type='file' hidden='true'
                                        onChange={(event) => this.handleOnchangeImage(event)}

                                    />
                                    <label htmlFor='previewImg'><i className=" fas fa-solid fa-upload" /> </label>
                                    <div className='preview-Image_specialist-update'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl}) ` }}

                                    >
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-12">
                            <div>Description</div>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}

                            />
                        </div>


                    </form>

                    <button type="button" class=" buttonAddSpec btn btn-outline-success"
                        onClick={() => this.handleUpdateSpeciaty()}

                    >Update</button>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialist);
