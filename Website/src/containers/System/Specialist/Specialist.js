import React, { Component } from 'react';
import { connect } from "react-redux";
import './Specialist.scss'
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewSpecialty } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);
class Specialist extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nameVi: '',
            nameEn: '',
            imagebase64: '',
            descriptionMarkdown: '',
            descriptioncontentHTML: '',
            specialistName: '',
            previewImgUrl: '',

        }
    }
    async componentDidMount() {

    }









    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
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

    openPreviewImange = () => {

        if (this.state.previewImgUrl === '') return
        this.setState({
            isOpen: true
        })
    }



    handleSaveSpeciaty = async () => {
        let res = await createNewSpecialty({
            nameVi: this.state.nameVi,
            nameEn: this.state.nameEn,
            image: this.state.imagebase64,
            descriptionMarkdown: this.state.descriptionMarkdown,
            contentHTML: this.state.descriptioncontentHTML
        })
        if (res) {
            alert("Save data success")
        } else {
            alert("Save data faild")
        }
    }

    render() {
        return (
            <> <div className='container'>
                <div className='tittle_clinic'>Quản lý chuyên khoa</div>


                <form>
                    <div class="row">
                        <div class="col-3">
                            <div>CHUYÊN KHOA VI </div>
                            <input type="text" className="form-control"
                                placeholder="First name"
                                value={this.state.nameVi}
                                onChange={(event) => this.handleOnchangInput(event, "nameVi")}

                            />
                        </div>

                        <div class="col-3">
                            <div>CHUYÊN KHOA EN</div>
                            <input type="text" className="form-control"
                                placeholder="First name"
                                value={this.state.nameEn}
                                onChange={(event) => this.handleOnchangInput(event, "nameEn")}

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
                        onClick={() => this.handleSaveSpeciaty()}

                    >Add</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);
