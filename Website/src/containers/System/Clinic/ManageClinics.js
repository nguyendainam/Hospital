import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinics.scss'
import { FormattedMessage } from 'react-intl'
import { getIdNameClinic } from '../../../services/userService';
import { CommonUtils, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getAddressClinic, updateInformationClinic } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinics extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],
            selectedClinic: '',
            description: '',
            descriptioncontentHTML: '',
            nameVi: '',
            nameEn: '',
            previewImgUrl: '',
            imagebase64: '',
            listProvince: [],
            selectedProvince: '',
            address: '',
        }
    }

    async componentDidMount() {
        let arrayCli = await this.fetchAllClinic()
        this.props.fetchAllProvinceStart()
        this.setState({
            arrClinic: arrayCli
        })
    }


    fetchAllClinic = async () => {
        let language = this.props.language
        let data = await getIdNameClinic()
        let listClinic = data.data
        let arrayClinic = []
        if (listClinic && listClinic.length > 0) {
            listClinic.map((item, index) => {
                let onbject = {}
                onbject.label = language === LANGUAGES.VI ? item.nameVi : item.nameEn
                onbject.value = item.id
                arrayClinic.push(onbject)
            })
        }
        return arrayClinic
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




    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allProvince !== prevProps.allProvince) {
            let resAllProvince = this.fetchAllProvince(this.props.allProvince)
            this.setState({
                listProvince: resAllProvince
            })
        }
    }

    HandleOnChangeClinic = async (selectedClinic) => {
        console.log(selectedClinic)


        let { listProvince } = this.state
        this.setState({
            selectedClinic: selectedClinic
        })
        let data = await getAddressClinic(selectedClinic.value)
        console.log(data)
        if (data) {
            let image = data.data.image
            let imageBase64prew = ''
            if (image) {
                imageBase64prew = new Buffer(image, 'base64').toString('binary')
                this.setState({
                    previewImgUrl: imageBase64prew,
                    imagebase64: imageBase64prew
                })
            }
            let provinceId = data.data.province
            let findProvince = listProvince.find(item => {
                return item && item.value === provinceId
            })
            this.setState({
                nameVi: data.data.nameVi,
                nameEn: data.data.nameEn,
                selectedProvince: findProvince,
                address: data.data.address,
                description: data.data.description,
                descriptioncontentHTML: data.data.descriptionHTML,

            })
        }
    }



    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    openPreviewImange = () => {

        if (this.state.previewImgUrl === '') return
        this.setState({
            isOpen: true
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            description: text,
            descriptioncontentHTML: html,
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




    handleUpdateClinic = async () => {

        let data = await updateInformationClinic({
            id: this.state.selectedClinic.value,
            address: this.state.address,
            province: this.state.selectedProvince.value,
            description: this.state.description,
            descriptionHTML: this.state.descriptioncontentHTML,
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



    render() {

        return (
            <>
                <div className='title'> Quản lý thông tin phòng khám</div>

                <div className='container'>
                    <form>

                        <div className='row'>
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.dr_clinic'} /></span>
                                <Select
                                    className='form-control'
                                    value={this.state.selectedClinic}
                                    onChange={this.HandleOnChangeClinic}
                                    options={this.state.arrClinic}
                                />
                            </div>

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
                                    placeholder="english"
                                    value={this.state.nameEn}
                                    onChange={(event) => this.handleOnchangInput(event, "nameEn")}

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

                            <div class="col-3">
                                <div>Địa chỉ </div>
                                <input type="text" className="form-control"
                                    placeholder="Tiếng việt"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangInput(event, "address")}

                                />
                            </div>

                            <div className=" col-3">
                                <label for="inputZip"><FormattedMessage id="manage-user.Image" /></label>
                                <div>
                                    <input id='previewImg' type='file' hidden='true'
                                        onChange={(event) => this.handleOnchangeImage(event)}

                                    />
                                    <label htmlFor='previewImg'><i className=" fas fa-solid fa-upload" /> </label>
                                    <div className='preview-Image_clinic'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl}) ` }}
                                        onClick={() => this.openPreviewImange()}
                                    >
                                    </div>
                                </div>
                            </div>



                            <div class="col-12">
                                <div>Description</div>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.description}

                                />
                            </div>
                        </div>



                        <button type="button" class=" buttonAddSpec btn btn-outline-success"
                            onClick={() => this.handleUpdateClinic()}

                        >Update</button>

                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinics);
