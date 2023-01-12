import React, { Component } from 'react';
import { connect } from "react-redux";
import './Specialties.scss'
import { FormattedMessage } from 'react-intl'
import Header from '../../Header/Header';
import Select from 'react-select';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import Address_DoctorClinic from '../Doctor/Address_DoctorClinic';
import { getAllCodeService, getdoctorSpecitalty, getInforSpecitaltybyId } from '../../../../services/userService';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions/index'


class Specialties extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            arrSpecialty: [],
            province: '',
            listProvince: [],
            selectedProvince: 'ALL'
        }
    }

    async componentDidMount() {
        this.getDataDetails()
        this.getProvince()




    }


    getProvince = async () => {
        let data = await getAllCodeService('PROVINCE')
        let listProvince = data.data
        console.log(",,,,,,,,,,,,,,,,,", listProvince)
        if (listProvince && listProvince.length > 0) {
            listProvince.unshift({
                createdAt: 'null',
                keyMap: 'ALL',
                type: 'PROVINCE',
                valueEn: 'All',
                valueVi: "Toàn Quốc",
            })
            this.setState({

                listProvince: listProvince
            })

        }

    }


    getDataDetails = async () => {
        let id = this.props.match.params.id
        let localtion = this.state.selectedProvince
        let listDoctor = await getdoctorSpecitalty(id, localtion)
        let dataSpecialty = await getInforSpecitaltybyId(id)
        this.setState({
            arrDoctor: listDoctor.data.data,
            arrSpecialty: dataSpecialty.data,
        })

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let listDoctor = await getdoctorSpecitalty(this.props.match.params.id, this.state.selectedProvince)
            this.setState({
                arrDoctor: listDoctor.data.data,
            })
        }

        if (this.props.dataProfile !== prevProps.dataProfile) {
            let data = await this.getInforDoctor(this.props.id)
            this.setState({
                dataProfile: data,

            })
        }
    }



    handleOnchangeSelect = async (event) => {
        console.log('..... value ', event.target.value)
        if (event) {
            let id = this.props.match.params.id
            let localtion = event.target.value
            let listDoctor = await getdoctorSpecitalty(id, localtion)
            this.setState({
                arrDoctor: listDoctor.data.data,
            })

        }

    }


    render() {
        let imageBase64 = ''
        let { arrDoctor, arrSpecialty, listProvince } = this.state
        console.log("arrdoctor", arrDoctor)

        if (arrSpecialty && arrSpecialty.data) {
            imageBase64 = new Buffer(arrSpecialty.data.image, 'base64').toString('binary')
        }
        const { language } = this.props
        return (
            <>

                <Header />

                <div className='specialty_pages'>
                    {arrSpecialty && arrSpecialty.data ?

                        <div>
                            <div className='fomr_infor_specialties' style={{ backgroundImage: `url(${imageBase64}) ` }} >


                            </div>
                            <div className='container'>
                                <div className='name_specialty'>{language === LANGUAGES.VI ? arrSpecialty.data.nameVi : arrSpecialty.data.nameEn}</div>

                                <div className='form_descipt'>

                                    <form className='listent_DES'>
                                        <span dangerouslySetInnerHTML={{ __html: arrSpecialty.data.contentHTML }} ></span>
                                    </form>



                                </div>

                            </div>

                        </div>
                        :
                        ''
                    }

                    <div className='selectProvince'>
                        <span>Chọn khu vực</span>
                        <select className='form-control'
                            onChange={(event) => this.handleOnchangeSelect(event)}
                        >
                            {listProvince && listProvince.length > 0
                                && listProvince.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.keyMap}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    {arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            console.log('...item doctorId', item.doctorId)
                            return (
                                <div className='form-inforDr-Specialties' key={index}>
                                    <div className='content_left
                                    '>
                                        <div className='form_information_doctor'>
                                            <ProfileDoctor
                                                id={item.doctorId}
                                                doctorId={item.doctorId}
                                                OpenDescription={true}
                                            />

                                        </div>
                                    </div>

                                    <div className='content_right'>
                                        <div className='schedule_up'>
                                            <ScheduleDoctor
                                                doctorId={item.doctorId}
                                            />


                                        </div>
                                        <div className='schudule_down'>
                                            <Address_DoctorClinic
                                                doctorId={item.doctorId} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allProvince: state.admin.allProvince,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvinceStart: () => dispatch(actions.fetchAllProvince()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
