import React, { Component } from 'react';
import { connect } from "react-redux";
import './manageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _, { isEmpty, result } from 'lodash';
import { saveBulkSchedule } from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            selectedDoctor_option: {},
            currentDate: '',
            rangeTime: [],

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

            let dataTime = this.props.allScheduleTime;

            if (dataTime && dataTime.length > 0) {
                dataTime = dataTime.map(item => ({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                rangeTime: dataTime
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

    }

    handleClickButton = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor_option, currentDate } = this.state
        let arrSchedule = []
        if (selectedDoctor_option && _.isEmpty(selectedDoctor_option)) {
            alert("Vui lòng chọn bác sĩ")
            return
        }
        if (!currentDate) {
            alert("Vui lòng chọn ngày")
            return
        }

        // format lại date theo kiểu dateTime của database
        let formatedDate = new Date(currentDate).getTime()
        // console.log('Fomated date', formatedDate)

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            console.log('selected time ', selectedTime)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let ObjectTime = {}
                    ObjectTime.doctorId = selectedDoctor_option.value
                    ObjectTime.date = formatedDate
                    ObjectTime.timeType = schedule.keyMap
                    arrSchedule.push(ObjectTime);
                })


            } else {
                alert("Vui lòng chọn khoảng thời gian")
                return;
            }
        }


        let res = await saveBulkSchedule({
            arrSchedule: arrSchedule,
            doctorId: selectedDoctor_option.value,
            formatedDate: formatedDate
        })




        console.log('feedback saveBulkSchedule from database', res)
        if (res.schedule && res.schedule.errCode === 0) {
            alert("Thêm dữ liệu thành công")
            window.location.reload();
        } else {
            alert("Lỗi, Không lưu được data")
        }

    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { rangeTime } = this.state
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
                                minDate={yesterday}

                            />
                        </div>


                    </div>
                    <div className=' col-12 hour_schedule'>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        onClick={() => this.handleClickButton(item)}
                                        class={item.isSelected === true ?
                                            ' buttonTime btn btn-outline-warning' : ' buttonTime btn btn-outline-success'}
                                        key={index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                    </button>
                                )
                            })
                        }
                    </div>


                </div>
                <button
                    onClick={() => this.handleSaveSchedule()}
                    class="btn btn-outline-warning"> Lưu Thông tin</button>
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
