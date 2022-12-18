import React, { Component } from 'react';
import { connect } from "react-redux";
import './ScheduleDoctor.scss'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorbyDay } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl'
class ScheduleDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }

    async componentDidMount() {
        let alldays = this.ScheduleLanguage()
        let res = await getScheduleDoctorbyDay(this.props.doctorId, alldays[0].value)
        this.setState({
            allDays: alldays,
            allAvalableTime: res.infor.data
        })



        this.setState({
            allDays: alldays,
        })

    }


    ScheduleLanguage = () => {
        let { language } = this.props
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            if (language === LANGUAGES.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(object)


        }
        return arrDate;
        // this.setState({
        //     allDays: arrDate
        // })


    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


        let { language } = this.props
        if (this.props.language !== prevProps.language) {
            let arrDate = []
            for (let i = 0; i < 7; i++) {
                let object = {}

                if (language === LANGUAGES.VI) {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
                if (language === LANGUAGES.EN) {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }


                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

                arrDate.push(object)
            }

            this.setState({
                allDays: arrDate
            })
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let alldays = this.ScheduleLanguage()
            let res = await getScheduleDoctorbyDay(this.props.doctorId, alldays[0].value)
            this.setState({
                allDays: alldays,
                allAvalableTime: res.data
            })

        }


    }

    handleOnchange = async (event) => {
        console.log('datadoctor', this.props.doctorId)
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

    render() {
        let dataDay = this.state.allDays
        let { language } = this.props
        let { allAvalableTime } = this.state
        return (
            <>
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
                                            class="button_schedule btn btn-outline-success"
                                            key={index}
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
