import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModel.scss'
import { Modal } from 'reactstrap';
import * as actions from '../../../../../store/actions'
import { FormattedMessage } from 'react-intl'
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGES } from '../../../../../utils';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-flatpickr';
import Select from 'react-select';
import { postPatientAppoiment, getDataProfileDoctor } from '../../../../../services/userService';




class BookingModel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            birthday: '',
            genders: [],
            selectGender: '',
            phoneNumber: '',
            address: '',
            reason: '',
            doctorId: '',
            allDays: '',
            timeType: '',
            date: '',
            dataProfile: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        let doctorId = this.props.dataBookingModel.doctorId
        this.setState({
            doctorId: doctorId,
            timeType: this.props.dataBookingModel.timeType,
            date: this.props.dataBookingModel.date,
        })





    }

    buildGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap
                result.push(object)
            })

        } return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGender(this.props.genders),

            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildGender(this.props.genders)
            })
        }

        if (this.props.dataBookingModel != prevProps.dataBookingModel) {
            let doctorId = this.props.dataBookingModel.doctorId
            this.setState({
                doctorId: doctorId,
                timeType: this.props.dataBookingModel.timeType,
                date: this.props.dataBookingModel.date

            })
        }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let conpySate = { ...this.state }
        conpySate[id] = valueInput
        this.setState({
            ...conpySate
        })
    }

    handleOnChangebirthDay = (date) => {

        this.setState({
            birthday: date[0]
        })
    }

    selectedGender = (gender) => {
        this.setState({
            selectGender: gender
        })
    }

    buildTimeBooking = (dataTime) => {
        const { language } = this.props




        let date, dateVi, dateEn = ''
        if (dataTime && dataTime.TimeTypeData) {
            let time = language === LANGUAGES.VI ? dataTime.TimeTypeData.valueVi : dataTime.TimeTypeData.valueEn

            date = moment(+dataTime.date).format("DD/MM/YYYY") //parse integer
            dateVi = dataTime.TimeTypeData.valueVi
            dateEn = dataTime.TimeTypeData.valueEn

            return `${date} - ${time}`
        }
        return ''


    }

    getInforDoctor = (dataDr) => {
        let { language } = this.props
        let name = ''
        if (dataDr && !_.isEmpty(dataDr)) {
            name = language === LANGUAGES.VI ?
                `${dataDr.doctorSchedule.lastName}${dataDr.doctorSchedule.firstName}`
                :
                `${dataDr.doctorSchedule.firstName}${dataDr.doctorSchedule.lastName}`
            return name
        }
        return ''

    }





    confirmBooking = async () => {
        let birth = new Date(this.state.birthday).getTime()
        let datetime = this.buildTimeBooking(this.props.dataBookingModel)
        let Name_Doctor = this.getInforDoctor(this.props.dataBookingModel)
        let data = await postPatientAppoiment({
            email: this.state.email,
            fullName: this.state.fullName,
            gender: this.state.selectGender.value,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            reason: this.state.reason,
            birthday: birth,
            doctorId: this.state.doctorId,
            date: this.state.date,
            timeType: this.state.timeType,
            language: this.props.language,
            datetime: datetime,
            DoctorName: Name_Doctor


        })

        console.log("data")
        if (data.data && data.data.errCode === 0) {
            alert('ĐẶT LỊCH THÀNH CÔNG')
            this.props.isCloseModel()

        } else {
            alert('ĐẶT LỊCH KHÔNG THÀNH CÔNG')
        }




    }

    render() {

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { isOpenModel, isCloseModel, dataBookingModel } = this.props

        let doctorId = ''
        if (dataBookingModel && !_.isEmpty(dataBookingModel)) {
            doctorId = dataBookingModel.doctorId
        }


        console.log(dataBookingModel)


        return (
            <>
                {/* toggle = {} */}

                <Modal
                    isOpen={isOpenModel}
                    className={'booking_modal'}
                    centered
                    size='lg'>
                    <div className='container_modal'>
                        <div className='header_modal'>
                            <span className='title_booking_left'><FormattedMessage id={"home-header.patient.bookSchedule"} /></span>
                            <span className='title_booking_right'
                                onClick={isCloseModel}>
                                <i className="fas fa-times" ></i>
                            </span>
                        </div>

                        <div className='form_inputModal' >
                            <div className='Doctor_infor'>
                                <ProfileDoctor
                                    id={doctorId}
                                    dataTime={dataBookingModel}
                                    OpenDescription={false}
                                />
                            </div>
                            <div className='form_booking'>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.name"} /></span>
                                        <input className='form-control'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnChangeInput(event, "fullName")}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.email"} /></span>
                                        <input className='form-control'
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeInput(event, "email")}

                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.phone"} /></span>
                                        <input className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}

                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.birthday"} /></span>
                                        <DatePicker
                                            className='form-control'
                                            onChange={this.handleOnChangebirthDay}
                                            value={this.state.birthday}
                                            maxDate={yesterday}


                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.address"} /></span>
                                        <input className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangeInput(event, "address")}

                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.gender"} /></span>
                                        <Select className='form-control'
                                            value={this.state.selectGender}
                                            onChange={this.selectedGender}
                                            options={this.state.genders}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <span><FormattedMessage id={"home-header.patient.Note"} /></span>
                                        <textarea className='form-control'
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnChangeInput(event, "reason")}
                                        />
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className='fomr_footer'>
                            <button type="button"
                                className="button_inform btn btn-outline-success"
                                onClick={() => this.confirmBooking()}
                            >
                                SAVE
                            </button>
                            <button type="button" className=" button_inform btn btn-outline-danger" onClick={isCloseModel} >Cancel</button>

                        </div>


                    </div>


                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
