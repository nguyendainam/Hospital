import React, { Component } from 'react';
import { connect } from "react-redux";
import './ScheduleDoctor.scss'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorbyDay } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl'

import BookingModel from './Model/BookingModel';

class ScheduleDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isBookingModel: false,
            dataBookingModel: [],
            dataTime: []
        }
    }

    async componentDidMount() {
        let alldays = this.ScheduleLanguage()
        let res = await getScheduleDoctorbyDay(this.props.doctorId, alldays[0].value)
        this.setState({
            allDays: alldays,
            allAvalableTime: res.infor.data
        })



        // this.setState({
        //     allDays: alldays,
        // })

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
                    let letDateandMonthEn = moment(new Date()).locale('en').format('ddd - DD/MM');

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

        if (this.props.doctorId !== prevProps.doctorId) {
            let alldays = this.ScheduleLanguage()
            let res = await getScheduleDoctorbyDay(this.props.doctorId, alldays[0].value)
            this.setState({
                allDays: alldays,
                allAvalableTime: res.data
            })

        }
        const { language } = this.props
        if (this.props.language !== prevProps.language) {
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


                else {

                    if (i === 0) {
                        let letDateandMonth = moment(new Date()).format(' DD/MM');

                        let TodayEn = ` Today - ${letDateandMonth} `
                        object.label = TodayEn
                    } else {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                    }


                }

                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                arrDate.push(object)

                this.setState({
                    allDays: arrDate
                })
            }

        }


    }

    handleOnchange = async (event) => {
        if (this.props.doctorId) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorbyDay(doctorId, date)
            if (res) {
                let allTimedata = res.infor.data
                this.setState({
                    allAvalableTime: allTimedata

                })

            }





        }


    }

    handleHideScheduleTime = (item) => {
        this.setState({
            isBookingModel: true,
            dataBookingModel: item,




        })
    }

    closeBookingModel = () => {
        this.setState({
            isBookingModel: false
        })
    }

    render() {
        let dataDay = this.state.allDays
        let { language } = this.props
        let { allAvalableTime, isBookingModel, dataBookingModel, dataTime } = this.state

        return (
            <>
                <BookingModel
                    isOpenModel={isBookingModel}
                    isCloseModel={this.closeBookingModel}
                    dataBookingModel={dataBookingModel}
                    dataTime={this.state.dataBookingModel}

                />

                <div className='mainschedule_doctor'>
                    <div className='all_schedule'>
                        <select className='selectDay'
                            onChange={(event) => this.handleOnchange(event)}
                        >
                            {dataDay && dataDay.length > 0
                                && dataDay.map((item, index) => {
                                    return (
                                        <option className='option_Day' value={item.value} key={index} >{item.label} </option>
                                    )
                                })
                            }

                        </select>

                    </div>
                    <div className='time_steps'>
                        <div className='titleShedule'>

                            <span>
                                <i className="fas fa-calendar-times"></i> <FormattedMessage id={'home-header.Schedule'} />
                            </span>
                        </div>

                        <div className='formSchedule_button'>
                            {allAvalableTime && allAvalableTime.length > 0 ?

                                // {allAvalableTime && allAvalableTime.length > 0 &&

                                allAvalableTime.map((item, index) => {
                                    let timevi = `${item.TimeTypeData.valueVi}`;
                                    let timeEn = `${item.TimeTypeData.valueEn}`;
                                    return (
                                        <button
                                            type="button"
                                            className="button_schedule btn btn-outline-success"
                                            key={index}
                                            onClick={() => this.handleHideScheduleTime(item)}

                                        > {language === LANGUAGES.VI ? timevi : timeEn}
                                        </button>
                                    )
                                })



                                //    }
                                :
                                <div className='text-schedule'>
                                    <span className='text_schedule_content'><FormattedMessage id={'home-header.NoSchedule'} /></span>
                                </div>
                            }



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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
