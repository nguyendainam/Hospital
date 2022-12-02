import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_Doctor_OutStanding.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Doctor_OutStandingImg from '../../../assets/medical/doctor.png'



class Doctor_OutStanding extends Component {


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
                <div className='section-Doctor_OutStanding'>
                    <div className='speciaty-content'>
                        <div className='Doctor_OutStanding-header'>
                            <span className='title-header-Doctor_OutStanding'>Bác Sĩ Nổi Bật</span>
                            <div className='Button-header-Doctor_OutStanding'>
                                <button type="button" class="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                <div className='sepecialty_content_body'>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
                                    </div>
                                </div>
                                <div>
                                    <div className='infor_doctor'>
                                        <img className='picture_Doctor_OutStanding' src={Doctor_OutStandingImg} />
                                        <span>Bác sĩ: Nguyễn Văn A</span>
                                        <span>Chuyên khoa thần kinh</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor_OutStanding);
