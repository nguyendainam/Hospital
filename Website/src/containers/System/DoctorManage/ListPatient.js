import React, { Component } from 'react';
import { connect } from "react-redux";
import './ListPatient.scss'
import { FormattedMessage } from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import * as actions from '../../../store/actions/index'
import { getInforDoctor, getlistPatientforDr } from '../../../services/doctorService';
import { LANGUAGES } from '../../../utils';

import RemedyModal from './RemedyModal';


class ListPatients extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            DoctorId: '',
            ArrList: [],
            isOpenModal: false,
            dataModal: {},
            isCloseModal: false
        }
    }

    async componentDidMount() {

        let email = this.props.userinfor.email
        let dataDr = await getInforDoctor(email)
        this.setState({
            DoctorId: dataDr.dataDoctor.dataDoctor.id,

        })

    }





    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchange_DatePicker = async (date) => {
        let formatdate = new Date(date[0]).getTime()
        let data = await getlistPatientforDr(this.state.DoctorId, formatdate)

        if (data && data.errCode === 0) {
            this.setState({
                ArrList: data.data
            })
        }

    }

    handleOnclickConfirm = (item) => {


        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.PatientData.email
        }

        this.setState({
            isOpenModal: true,
            dataModal: data
        })
        console.log("item.....", data)
    }


    isCloseModal = () => {
        this.setState({
            isOpenModal: false,
            dataModal: {}
        })
    }

    sendRemedy = () => {
        alert("oke")
    }



    render() {
        let { ArrList } = this.state

        return (
            <>
                <RemedyModal
                    isOpenModal={this.state.isOpenModal}
                    dataModal={this.state.dataModal}
                    isCloseModal={this.isCloseModal}
                    sendRemedy={this.sendRemedy}
                />

                <div className='title '>Danh sách khám bệnh </div>
                <div className='container'>
                    <div className='form_Date'>
                        <span>Chọn ngày</span>
                        <DatePicker
                            onChange={this.handleOnchange_DatePicker}
                            className='form-control'
                            value={this.state.currentDate}

                        />
                    </div>
                    <table class="table">
                        <caption>List of users</caption>
                        <thead>
                            <tr> <th scope="col">#</th>
                                <th scope="col">Tên Bệnh Nhân</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Giờ khám</th>
                                <th scope="col">Trạng thái khách hàng</th>
                                <th scope="col">Trạng thái đơn khám</th>


                            </tr>
                        </thead>
                        <tbody>
                            {ArrList && ArrList.length > 0 ? ArrList.map((item, index) => {
                                let { language } = this.props
                                console.log('.....dataaaaaa..', ArrList)
                                let date = +item.PatientData.birthDay
                                let dateFormat = new Date(date).toString();
                                // let birthday = ''
                                // // birthday = moment().format("DD/MM/YYYY")
                                // console.log(new Date(birthday))
                                return (

                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.PatientData.fullname}</td>
                                        <td>{item.PatientData.address}</td>
                                        <td>{item.PatientData.genderPatient.valueVi}</td>
                                        <td>{moment(dateFormat).format('DD/MM/YYYY')}</td>
                                        <td>{language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn}</td>
                                        <td>{language === LANGUAGES.VI ? item.statusBooking.valueVi : item.statusBooking.valueEn}</td>
                                        <td>
                                            <button className=" btn btn-outline-success "
                                                onClick={() => this.handleOnclickConfirm(item)}
                                            >Xác nhận</button>
                                        </td>
                                    </tr>

                                )

                            })
                                :
                                <div>
                                    <span>Không có lịch khám nào </span>
                                </div>

                            }
                        </tbody>
                    </table>

                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userinfor: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPatients);
