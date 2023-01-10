import React, { Component } from 'react';
import { connect } from "react-redux";
import './DrInfor.scss'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select';
import _, { isEmpty, result } from 'lodash';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';

import { getInforDoctor } from '../../../services/doctorService';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class DrInfor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataInforDoctor: [],
            description: '',
            contentMarkdown: '',
            idDr: '',
            contentHTML: '',
            mardown: []
        }
    }

    async componentDidMount() {
        let email = this.props.userInfo.email
        let dataDr = await getInforDoctor(email)
        this.setState({
            dataInforDoctor: dataDr.dataDoctor.dataDoctor,

        })

        let markdown = dataDr.dataDoctor.dataDoctor.Markdown
        if (markdown) {
            this.setState({
                description: markdown.description,
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML
            })
        } else {
            this.setState({
                description: '',
                contentMarkdown: ''
            })
        }
    }





    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnSaveMarlkdown = () => {
        this.props.saveDetailDoctorAction({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.dataInforDoctor.id,
            action: 'EDIT'

        })
    }

    render() {
        let { dataInforDoctor, Markdown } = this.state
        let { language } = this.props
        let nameDr = ''
        if (dataInforDoctor && !_.isEmpty(dataInforDoctor)) {
            nameDr = language === LANGUAGES.VI ? `${dataInforDoctor.lastName}${dataInforDoctor.firstName}` : `${dataInforDoctor.firstName}${dataInforDoctor.lastName}`
        }



        return (
            <>
                <div className='container' >
                    <div className='container-title-form'>
                        <div className='.container-title-form-aaa'>THÊM THÔNG TIN </div>
                    </div>

                    <div className='more-infor'>
                        <div className='chooseDoctor'>
                            <label> Bác sĩ</label>
                            <input type="text" className='form-control' disabled placeholder={nameDr} />
                        </div>

                        <div className='input_content'>
                            <textarea rows={5} cols={75}
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.description}
                            >

                            </textarea>
                        </div>
                    </div>



                    <div className='container pt-5 input-form-doctor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}

                        />



                    </div>
                    <div className='pt-3' >
                        <button
                            onClick={() => this.handleOnSaveMarlkdown()}
                            className='btn btn-outline-success'
                        >

                            <span>CẬP NHẬT THÔNG TIN</span>
                        </button>
                    </div>

                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        saveDetailDoctorAction: (data) => dispatch(actions.saveDetailDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrInfor);
