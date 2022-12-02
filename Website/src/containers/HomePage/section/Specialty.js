import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_Specialty.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from '../../../assets/specialty/xuongkhop.png'



class Specialty extends Component {


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
                <div className='section-specialty'>
                    <div className='speciaty-content'>
                        <div className='specialty-header'>
                            <span className='title-header-specialty'>Chuyên Khoa Phổ Biến</span>
                            <div className='Button-header-specialty'>
                                <button type="button" class="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                <div className='sepecialty_content_body'>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
                                        <span>Cơ Xương Khớp 1</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
                                        <span>Cơ Xương Khớp 2</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
                                        <span>Cơ Xương Khớp 3</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
                                        <span>Cơ Xương Khớp 4</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
                                        <span>Cơ Xương Khớp 5</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <img className='picture_specialty' src={specialtyImg} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
