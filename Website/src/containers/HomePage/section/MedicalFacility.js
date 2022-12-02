import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_MedicalFacility.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MedicalFacilityImg from '../../../assets/medical/medical.png'



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
                            <span className='title-header-MedicalFacility'>Cơ Sở Y Tế Nổi Bật</span>
                            <div className='Button-header-MedicalFacility'>
                                <button type="button" class="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                <div className='sepecialty_content_body'>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 1</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 2</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 3</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 4</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 5</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_MedicalFacility' src={MedicalFacilityImg} />
                                        <span>Cơ Xương Khớp 6</span>
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
