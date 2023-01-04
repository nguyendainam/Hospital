import React, { Component } from 'react';
import { connect } from "react-redux";
import './Clinic.scss'
import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import * as actions from '../../../store/actions/index'
import { createNewClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class Clinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            description: '',
            descriptioncontentHTML: '',
            nameVi: '',
            nameEn: '',
            previewImgUrl: '',
            imagebase64: '',
            listProvince: [],
            selectedProvince: '',
            address: ''


        }
    }

    async componentDidMount() {
        this.props.fetchAllProvinceStart()

        let resAllProvince = this.fetchAllProvince(this.props.allProvince)
        this.setState({
            listProvince: resAllProvince
        })

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.allProvince !== prevProps.allProvince) {
            let resAllProvince = this.fetchAllProvince(this.props.allProvince)
            this.setState({
                listProvince: resAllProvince
            })
        }
        if (this.props.language !== prevProps.language) {

            let resAllProvince = this.fetchAllProvince(this.props.allProvince)
            this.setState({
                listProvince: resAllProvince
            })

        }
    }
    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })



    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            description: text,
            descriptioncontentHTML: html,
        })
    }
    handleOnchangInput = (event, id) => {
        let stateCoopy = {
            ...this.state
        }
        stateCoopy[id] = event.target.value
        this.setState({
            ...stateCoopy
        })
    }


    handleOnchangeImage = async (event) => {
        let data_file = event.target.files
        let file = data_file[0]

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


    fetchAllProvince = (inputProvince) => {
        let language = this.props.language
        let arrProvince = []
        if (inputProvince && inputProvince.length) {

            inputProvince.map((item, index) => {
                let ObjectProvince = {}
                let ProvinceVi = `${item.valueVi}`
                let ProvinceEn = `${item.valueEn}`
                ObjectProvince.label = language === LANGUAGES.VI ? ProvinceVi : ProvinceEn
                ObjectProvince.value = item.keyMap

                arrProvince.push(ObjectProvince)
            })
        }
        return arrProvince
    }


    handleSaveClinc = async () => {
        let res = await createNewClinic({
            address: this.state.address,
            description: this.state.description,
            descriptionHTML: this.state.descriptioncontentHTML,
            image: this.state.imagebase64,
            nameVi: this.state.nameVi,
            nameEn: this.state.nameEn,
            province: this.state.selectedProvince.value


        })
        if (res && res.errCode === 0) {
            alert("SAVE DATA SUCCESS")
        } else {
            alert("SAVE DATA FAILE")
        }
    }
    openPreviewImange = () => {

        if (this.state.previewImgUrl === '') return
        this.setState({
            isOpen: true
        })
    }


    render() {

        return (
            <>
                <div className='container_Clinic'>
                    <div className='title_clinic'>
                        <span>QUẢN LÝ PHÒNG KHÁM</span>
                    </div>
                    <div className='container'>

                        <form>
                            <div class="row">
                                <div class="col-3">
                                    <div>PHÒNG KHÁM </div>
                                    <input type="text" className="form-control"
                                        placeholder="Tiếng việt"
                                        value={this.state.nameVi}
                                        onChange={(event) => this.handleOnchangInput(event, "nameVi")}

                                    />
                                </div>


                                <div class="col-3">
                                    <div>CLINIC</div>
                                    <input type="text" className="form-control"
                                        placeholder="Tiếng anh"
                                        value={this.state.nameEn}
                                        onChange={(event) => this.handleOnchangInput(event, "nameEn")}

                                    />
                                </div>

                                <div class="col-3">
                                    <div>Địa chỉ </div>
                                    <input type="text" className="form-control"
                                        placeholder="Tiếng việt"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangInput(event, "address")}

                                    />
                                </div>

                                <div className="col-3">
                                    <span><FormattedMessage id={'menu.doctor.province'} /></span>
                                    <Select className='form-control'
                                        value={this.state.selectedProvince}
                                        onChange={this.inputChangedHandle.bind(this, "selectedProvince")}
                                        options={this.state.listProvince}

                                    />
                                </div>



                                <div className=" col-3">
                                    <label for="inputZip"><FormattedMessage id="manage-user.Image" /></label>
                                    <div>
                                        <input id='previewImg' type='file' hidden='true'
                                            onChange={(event) => this.handleOnchangeImage(event)}

                                        />
                                        <label htmlFor='previewImg'><i className=" fas fa-solid fa-upload" /> </label>
                                        <div className='preview-Image_specialist'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl}) ` }}
                                            onClick={() => this.openPreviewImange()}
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

                            <button type="button" class=" buttonAddSpec btn btn-outline-success"
                                onClick={() => this.handleSaveClinc()}

                            >Add</button>
                        </form>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allProvince: state.admin.allProvince,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvinceStart: () => dispatch(actions.fetchAllProvince()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
