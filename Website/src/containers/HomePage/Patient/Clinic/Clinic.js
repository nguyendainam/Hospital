import React, { Component } from 'react';
import { connect } from "react-redux";
import './Clinic.scss'
import { FormattedMessage } from 'react-intl'
import ProfileDoctor from '../Doctor/ProfileDoctor';
import Address_DoctorClinic from '../Doctor/Address_DoctorClinic';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import Header from '../../Header/Header';
import { LANGUAGES } from '../../../../utils/constant';
import { getDataDoctorClinic, getAddressClinic, getAllcodeSpecialty } from '../../../../services/userService';



class Clinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],
            selecSpecialty: 'ALL',
            arrDoctorClinic: [],
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        let data = await getAddressClinic(id)
        this.dataDoctorClinic(id, this.state.selecSpecialty)
        this.getAllcodeSpecialty()
        this.setState({
            arrClinic: data,
        })



    }

    dataDoctorClinic = async (idClinic, idSpecialty) => {

        let datadoctor = await getDataDoctorClinic(idClinic, idSpecialty)
        this.setState({
            arrDoctorClinic: datadoctor.data
        })
    }

    getAllcodeSpecialty = async () => {
        let data = await getAllcodeSpecialty()
        let list = data.data.data
        if (list && list.length > 0) {
            list.unshift({
                id: 'ALL',
                nameEn: 'All',
                nameVi: "Tất cả các khoa",
            })
            this.setState({
                dataSpecialty: list
            })
        } else {
            console.log("err")
        }


    }



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSelectOptions = (event) => {
        let id = this.props.match.params.id
        this.dataDoctorClinic(id, event.target.value)

    }

    render() {
        let imageBase64, name_clinic, addressClinic, description = ''
        let { language } = this.props
        const { arrClinic, arrDoctorClinic, dataSpecialty } = this.state
        //console.log('dataa....', arrClinic.data)

        if (arrClinic && arrClinic.data) {
            imageBase64 = new Buffer(arrClinic.data.image, 'base64').toString('binary')
            name_clinic = language === LANGUAGES.VI ? arrClinic.data.nameVi : arrClinic.data.nameEn
            addressClinic = arrClinic.data.address
            description = arrClinic.data.descriptionHTML
        }

        // console.log('...doctorClinic.........', arrDoctorClinic)

        return (
            <>

                <Header />
                <div className='container'>
                    <div className='background_img' >

                        <div className='bgr_clinic' style={{ backgroundImage: `url(${imageBase64}) ` }} > </div>

                    </div>
                    <div className='name_clinic'>
                        <span className='name_clinic_text'>{name_clinic}</span>
                        <span className='address_clinic_text'>{addressClinic}</span>
                    </div>
                    <div className='content_clinic'>
                        <form className='from_des_clinic'>
                            <span dangerouslySetInnerHTML={{ __html: description }} ></span>
                        </form>

                    </div>
                    <div className='from_list_specialty'>
                        <span><FormattedMessage id={'home-header.chooseSpecialty'} /> </span>
                        <select className='form-control'
                            onClick={(event) => this.handleSelectOptions(event)}
                        >
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.id}
                                        >
                                            {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                        </option>
                                    )
                                })


                            }
                        </select>

                    </div>
                    <div className='doctor_clinic'>

                        {arrDoctorClinic && arrDoctorClinic.length > 0 && arrDoctorClinic.map((item, index) => {
                            return (
                                <div className='form_doctor_clinic' key={index}>
                                    <div className='infor_dr'>
                                        <ProfileDoctor
                                            id={item.doctorId
                                            }
                                            doctorId={item.doctorId}
                                            OpenDescription={true}
                                        />

                                    </div>

                                    <div className='schedule'>
                                        <ScheduleDoctor
                                            doctorId={item.doctorId}
                                        />
                                    </div>
                                </div>
                            )

                        })}


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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
