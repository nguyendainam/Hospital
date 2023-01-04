import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./style_Doctor_OutStanding.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { LANGUAGES, } from "../../../utils"
import { withRouter } from 'react-router';

class Doctor_OutStanding extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, pervState, snapShot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux
            })
        }

    }

    componentDidMount() {
        this.props.loadTopDoctorRedux()
    }


    handleViewDetailsDoctor = (doctor) => {

        console.log('VIEW DOCTOR DETAILS ', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };


        let all_arr_Doctors = this.state.arrDoctor;
        let { language } = this.props

        console.log("check TopdoctorRedux: ", this.props.topDoctorsRedux)
        return (
            <React.Fragment>
                <div className='section-Doctor_OutStanding'>
                    <div className='speciaty-content'>
                        <div className='Doctor_OutStanding-header'>
                            <span className='title-header-Doctor_OutStanding'>Bác Sĩ Nổi Bật</span>
                            <div className='Button-header-Doctor_OutStanding'>
                                <button type="button" className="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                {all_arr_Doctors && all_arr_Doctors.length > 0 && all_arr_Doctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}: ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}: ${item.lastName} ${item.firstName} `;

                                    return (
                                        <div className='sepecialty_content_body' key={index} onClick={() => this.handleViewDetailsDoctor(item)} >

                                            <div className='Top_doctor'>
                                                <div className='infor_doctor'>
                                                    <div className='imange_dr'
                                                        style={{ backgroundImage: `url(${imageBase64}) ` }} >

                                                    </div>
                                                </div>
                                                <div className='title_doctor'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>{language === LANGUAGES.VI ? `Khoa: ${item.Doctor_infor.InforDrSpecialty.nameVi}`
                                                        :
                                                        `Department: ${item.Doctor_infor.InforDrSpecialty.nameEn}`


                                                    }</div>
                                                </div>

                                            </div>

                                        </div>

                                    )


                                })}


                            </Slider>
                        </div>
                    </div>

                </div >
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        loadTopDoctorRedux: () => dispatch(actions.fetchTopDoctor())

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor_OutStanding));
