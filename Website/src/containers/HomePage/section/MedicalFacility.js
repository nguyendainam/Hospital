import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_MedicalFacility.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';
import { LANGUAGES } from '../../../utils';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrClinic: [],
            Imagebase64: ''
        }
    }

    componentDidMount = async () => {

        let data = await getAllClinic()

        console.log("dataa.. clinic............", data)
        this.setState({
            arrClinic: data.data
        })

    }
    handleViewDetailClinic = (idClinic) => {
        this.props.history.push(`/detail-clinic/${idClinic.id}`)
    }



    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        const { arrClinic } = this.state

        return (
            <React.Fragment>
                <div className='section-specialty'>
                    <div className='speciaty-content'>
                        <div className='specialty-header'>
                            <span className='title-header-specialty'>Các Chi Nhánh Phòng Khám</span>
                            <div className='Button-header-specialty'>
                                <button type="button" className="btn btn-outline-secondary">Xem thêm</button>
                            </div>
                        </div>
                        <div className='container'>
                            <Slider {...settings}>

                                {arrClinic && arrClinic.length > 0 &&

                                    arrClinic.map((item, index) => {
                                        let language = this.props.language
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        return (
                                            <div className='Clinic_content_body' key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            >
                                                <div className='clinic_From' >
                                                    <img className='picture_specialty' src={imageBase64} />

                                                </div>
                                                <span className='nameClinic'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</span>
                                            </div>
                                        )
                                    })

                                }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
