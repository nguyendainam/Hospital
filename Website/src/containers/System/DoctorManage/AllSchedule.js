import React, { Component } from 'react';
import { connect } from "react-redux";
import './AllSchedule.scss'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';

import { getScheduleDoctorbyDay } from '../../../services/userService';
import { deleteSchedule } from '../../../services/doctorService';

class AllSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
        }
    }

    async componentDidMount() {
        let alldays = this.ScheduleLanguage()
        let res = await getScheduleDoctorbyDay(this.props.idDoctor, alldays[0].value)
        this.setState({
            allDays: alldays,
            allAvalableTime: res.infor.data
        })
    }

    ScheduleLanguage = () => {
        let { language } = this.props
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let letDateandMonth = moment(new Date()).format(' DD/MM');
                    let Today = ` Hôm nay -${letDateandMonth} `
                    object.label = Today
                } else {

                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
            }


            if (language === LANGUAGES.EN) {

                if (i === 0) {
                    let letDateandMonthEn = moment(new Date()).locale('en').format('DD/MM');

                    let TodayEn = ` Today - ${letDateandMonthEn} `
                    object.label = TodayEn
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }


            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(object)


        }
        return arrDate;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language != prevProps.language) {
            let alldays = this.ScheduleLanguage()
            this.setState({
                allDays: alldays
            })
        }
    }

    SelectedDate = async (event) => {

        let res = await getScheduleDoctorbyDay(this.props.idDoctor, event.target.value)
        this.setState({
            allAvalableTime: res.infor.data
        })

        console.log("timeee", res.infor.data)

    }

    DeleteTime = async (item) => {
        let data = await deleteSchedule({
            doctorId: item.doctorId,
            timeType: item.timeType,
            date: item.date
        })
        console.log("dataaaa....", data.errCode)
        if (data && data.errCode === 0) {
            alert("Delete Successfull")
            let res = await getScheduleDoctorbyDay(this.props.idDoctor, item.date)
            this.setState({
                allAvalableTime: res.infor.data
            })

        } else {
            alert("Delete failed")
        }
    }

    render() {
        let { language } = this.props
        let { allDays, allAvalableTime } = this.state
        return (
            <>
                <div className='title'>LỊCH khám bệnh </div>
                <div className='container from-container-schedule'>
                    <div className='formSchedule'>
                        <div className='formselect'>
                            <span>From select day</span>
                            <select className='form-control selectDate'
                                onClick={(event) => this.SelectedDate(event)}
                            >
                                {allDays && allDays.length > 0
                                    && allDays.map((item, index) => {
                                        return (
                                            <option key={index}
                                                value={item.value}>
                                                {item.label}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                        <div className='form_time col-12'>
                            <div className='times'>
                                <div className=''>
                                    {allAvalableTime && allAvalableTime.length > 0 ?
                                        allAvalableTime.map((item, index) => {
                                            return (
                                                <>
                                                    <button key={index} type="button" class="btntime btn btn-outline-success"><span className='texttime'>
                                                        {language === LANGUAGES.VI ? item.TimeTypeData.valueVi : item.TimeTypeData.valueEn}
                                                    </span>
                                                    </button>
                                                    <i className="fas fa-trash-alt" onClick={() => this.DeleteTime(item)}>
                                                    </i>
                                                </>
                                            )
                                        })
                                        : <span>Không có lịch khám bệnh</span>
                                    }




                                </div>




                            </div>

                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSchedule);
