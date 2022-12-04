import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_MedicalFacility.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MedicalFacilityImg from '../../../assets/medical/medical.png'

import ngoaikhoa from '../../../assets/ngoaikhoa.png'
import thankinh from '../../../assets/thankinh.png'
import thieunhi from '../../../assets/thieunhi.png'

class MedicalFacility extends Component {


    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (
            <React.Fragment>
                <div className='section-MedicalFacility'>
                    <div className='speciaty-content'>
                        <div className='MedicalFacility-header'>
                            <span className='title-header-MedicalFacility'>Chuyên Khoa Nổi Tiếng</span>
                            <div className='Button-header-MedicalFacility'>
                                <button type="button" class="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                <div className='medical_content_body'>
                                    <div className='Main_Clinic'>
                                        <div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={ngoaikhoa} />

                                        </div>
                                    </div>

                                    <span style={{ fontSize: 20, fontWeight: 'bold', color: '#97FFFF' }} >Ngoại Khoa</span>
                                </div>
                                <div>
                                    <div className='Main_Clinic' >
                                        <div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={thankinh} />
                                        </div>
                                        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#97FFFF' }}>Khoa Thần Kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='Main_Clinic'
                                    ><div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={thieunhi} />
                                        </div>
                                        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#97FFFF' }}>Khoa Trẻ Em </span>
                                    </div>
                                </div>
                                <div>
                                    <div className='Main_Clinic'>
                                        <div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        </div>
                                        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#97FFFF' }}>Nha Khoa</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='Main_Clinic' >
                                        <div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={thankinh} />
                                        </div>
                                        <span>Cơ Xương Khớp 2</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='Main_Clinic'>
                                        <div className='Imange_clinic'>
                                            <img className='picture_MedicalFacility' src={thankinh} />
                                        </div>
                                        <span>Răng Hàm Mặt</span>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
