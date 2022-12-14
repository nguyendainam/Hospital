import React, { Component } from 'react';
import { connect } from "react-redux";
import './manageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            selectedDoctor_option: {},
            currentDate: new Date(),
            rangeTime: []
        }
    }


    componentDidMount() {
        this.props.fetchallDoctor()
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
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


    handleChangeSelect = async (selectedDoctor_option) => {
        this.setState({ selectedDoctor_option });

    }

    handleOnchange_DatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
        console.log(this.state.currentDate)
    }


    render() {


        console.log("Props", this.state)
        let { rangeTime, } = this.state
        let { language } = this.props
        return (

            <div className='container_schedule'>
                <div className='tittle_ms'> <FormattedMessage id={'menu.doctor.title_sc'} />   </div>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <span>Chọn bác sĩ </span>
                            <Select className='form-control'
                                value={this.state.selectedDoctor_option}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>


                        <div className='col-3 form-group'>
                            <span>chọn ngày </span>
                            <DatePicker
                                onChange={this.handleOnchange_DatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}

                            />
                        </div>


                    </div>
                    <div className=' col-12 hour_schedule'>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (

                                    <button class="buttonTime btn btn-outline-success " key={index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                        }
                    </div>


                </div>
                <button class="btn btn-outline-warning"> Lưu Thông tin</button>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchallDoctor: () => dispatch(actions.fetchallDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
