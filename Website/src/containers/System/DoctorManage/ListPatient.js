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
import { PostsendPemery } from '../../../services/doctorService';

class ListPatients extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            DoctorId: '',
            ArrList: [],
            isOpenModal: false,
            dataModal: {},
            isCloseModal: false,
            choosendate: ''
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
                ArrList: data.data,
                choosendate: formatdate
            })
        }

    }

    handleOnclickConfirm = (item) => {


        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.PatientData.email,
            timeType: item.timeType,
            fullname: item.PatientData.fullname

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



    getPatien = async (date) => {
        let data = await getlistPatientforDr(this.state.DoctorId, date)
        if (data && data.errCode === 0) {
            this.setState({
                ArrList: data.data
            })
        }

    }


    sendRemedy = async (datafromRemedy) => {

        let { language } = this.props
        let { dataModal, choosendate } = this.state
        let res = await PostsendPemery({

            imgBase64: datafromRemedy.imgBase64,
            email: datafromRemedy.email,
            doctorId: dataModal.doctorId,
            fullname: dataModal.fullname,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: language === LANGUAGES.VI ? 'vi' : 'en'

        })
        if (res && res.errCode === 0) {

            language === LANGUAGES.VI ?
                alert("Cập nhật thành công") :
                alert("Update successful")
            this.getPatien(choosendate)
        } else {
            language === LANGUAGES.VI ?
                alert("Lỗi") :
                alert("Error")
        }

        console.log("data....from remedy..", res)
        this.setState({
            isOpenModal: false
        })

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
                    <table className="table">
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
                                <tr>
                                    <td colSpan="12">Không có lịch khám nào </td>
                                </tr>

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
