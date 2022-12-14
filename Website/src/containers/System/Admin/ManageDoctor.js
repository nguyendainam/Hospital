import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { getDetailsInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {



    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            BtnUpdateData: false,


        }
    }

    componentDidMount() {
        this.props.fetchallDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputdata) => {
        let result = [];
        let { language } = this.props
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName}${item.lastName} `
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn
                Object.value = item.id
                result.push(Object)
            })

        }
        return result
    }

    handleSaveContentMarkdown = () => {

        let { BtnUpdateData } = this.state

        this.props.saveDetailDoctorAction({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: BtnUpdateData === false ? 'CREATE' : 'EDIT'

        })

        console.log('check state:', this.props.saveDetailDoctorAction)
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailsInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentHTML
            && res.data.Markdown.contentMarkdown
        ) {


            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                BtnUpdateData: true

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                BtnUpdateData: false
            })
        }


        console.log(`Option selected:`, res)

    };

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { BtnUpdateData } = this.state
        return (
            <div className='container' >
                <div className='container-title-form'>
                    <div className='.container-title-form-aaa'>THÊM THÔNG TIN </div>
                </div>

                <div className='more-infor'>
                    <div className='chooseDoctor'>
                        <label>Chọn Bác sĩ</label>
                        <Select className='form-control'
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />
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
                        value={this.state.contentMarkdown} />



                </div>
                <div className='pt-3' >
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={BtnUpdateData === false ? '  btn btn-outline-success' : ' btn btn-outline-warning'}
                        style={{ width: 170, marginBottom: 100 }}

                    >{BtnUpdateData === false ?
                        <span>Lưu thông tin</span>
                        :
                        <span>Cập Nhật thông tin</span>
                        } </button>
                </div>

            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
        fetchallDoctor: () => dispatch(actions.fetchallDoctor()),
        saveDetailDoctorAction: (data) => dispatch(actions.saveDetailDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
