import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./Handbook.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HandbookImg from '../../../assets/medical/handbook.png'



class Handbook extends Component {


    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <div className='section-Handbook'>
                    <div className='speciaty-content'>
                        <div className='container'>
                            <div className='Handbook-header'>
                                <span className='title-header-Handbook'>Cẩm Nang Sức Khỏe</span>

                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>
                                <div className='sepecialty_content_body'>
                                    <div className='content_handbook'>
                                        <img className='picture_Handbook' src={HandbookImg} />
                                        <div className='Text_handbook'>
                                            <span className='title_handbook'>CẨM NANG CHĂM SÓC SỨC KHỎE</span>
                                            <span className='content_title_handbook'>Sự khác biệt mà các Gói khám sức khỏe tổng quát tại Vinmec mang lại là khả năng phát hiện sớm và kịp thời các bệnh đang gia tăng và được coi là nguyên nhân hàng đầu gây tử vong ở Việt Nam hiện nay như: Đột quỵ, ung thư, bệnh lý hô hấp, đái tháo đường; các bệnh lý hay gặp như tăng huyết áp, rốỉ loạn mỡ máu...). Với trẻ nhỏ là khả năng đánh giá toàn diện sức khỏe và tìm ra các bệnh lý trong giai đoạn tiềm ẩn có thể ảnh hưởng tới cuộc sống sau này.</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='content_handbook'>
                                        <img className='picture_Handbook' src={HandbookImg} />
                                        <div className='Text_handbook'>
                                            <span className='title_handbook'>CẨM NANG CHĂM SÓC SỨC KHỎE</span>
                                            <span className='content_title_handbook'>Sự khác biệt mà các Gói khám sức khỏe tổng quát tại Vinmec mang lại là khả năng phát hiện sớm và kịp thời các bệnh đang gia tăng và được coi là nguyên nhân hàng đầu gây tử vong ở Việt Nam hiện nay như: Đột quỵ, ung thư, bệnh lý hô hấp, đái tháo đường; các bệnh lý hay gặp như tăng huyết áp, rốỉ loạn mỡ máu...). Với trẻ nhỏ là khả năng đánh giá toàn diện sức khỏe và tìm ra các bệnh lý trong giai đoạn tiềm ẩn có thể ảnh hưởng tới cuộc sống sau này.</span>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
