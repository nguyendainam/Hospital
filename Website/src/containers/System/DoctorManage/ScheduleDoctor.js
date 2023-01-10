import React, { Component } from 'react';
import { connect } from "react-redux";
import './ScheduleDoctor.scss'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import { getInforDoctor } from '../../../services/doctorService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import * as actions from '../../../store/actions/index'
import { saveBulkSchedule } from '../../../services/userService';
import AllSchedule from './AllSchedule';

class ScheduleDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            dataInforDoctor: [],
            rangeTime: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllScheduleTime()

        let email = this.props.userInfo.email
        let dataDr = await getInforDoctor(email)
        this.setState({
            dataInforDoctor: dataDr.dataDoctor.dataDoctor,

        })
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




    async componentDidUpdate(prevProps, prevState, snapshot) {
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

    handleOnSave = async () => {
        let { language } = this.props
        let arrSchedule = []
        let { dataInforDoctor, currentDate, rangeTime } = this.state
        let idDoctor = dataInforDoctor.id
        if (!currentDate) {
            language === LANGUAGES.VI ?
                alert("Vui lòng chọn ngày") : alert("Please select a clinic date")
        }
        let formatdate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let ObjectTime = {}
                    ObjectTime.doctorId = idDoctor
                    ObjectTime.date = formatdate
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
            doctorId: idDoctor,
            formatedDate: formatdate
        })
        console.log('feedback saveBulkSchedule from database', res)
        if (res.schedule && res.schedule.errCode === 0) {
            alert("Thêm dữ liệu thành công")
            window.location.reload();
        } else {
            alert("Lỗi, Không lưu được data")
        }

        console.log(".....state.....", this.state)

    }



    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { dataInforDoctor, rangeTime } = this.state
        let { language } = this.props
        let nameDr = ''
        if (dataInforDoctor && !_.isEmpty(dataInforDoctor)) {
            nameDr = language === LANGUAGES.VI ? `${dataInforDoctor.lastName}${dataInforDoctor.firstName}` : `${dataInforDoctor.firstName}${dataInforDoctor.lastName}`
        }

        console.log(rangeTime)


        return (
            <>
                <div className='container_schedule'>
                    <div className='title'> <FormattedMessage id={'menu.doctor.title_sc'} /></div>
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-5 form-group'>
                                <span>Chọn bác sĩ </span>
                                <input type="text" className='form-control' disabled placeholder={nameDr} />
                            </div>


                            <div className='col-5 form-group'>
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
                                            className={item.isSelected === true ?
                                                ' buttonTime btn btn-outline-warning' : ' buttonTime btn btn-outline-success'}
                                            key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                        </button>
                                    )
                                })
                            }
                        </div>


                    </div>


                    <div className='buttonSave_DRSchedule'>
                        <button className="buttonSchedule btn btn-outline-warning"
                            onClick={() => this.handleOnSave()}
                        > Lưu Thông tin</button>
                    </div>
                </div>


                <div>
                    <AllSchedule
                        idDoctor={dataInforDoctor.id}
                    />
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
