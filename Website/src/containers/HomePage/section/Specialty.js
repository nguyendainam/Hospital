import React, { Component } from 'react';

import { connect } from 'react-redux'
import "./style_Specialty.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ngoaikhoa from '../../../assets/ngoaikhoa.png'
import { LANGUAGES } from '../../../utils';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {


    constructor(props) {
        super(props)
        this.state = {
            arrSpecialty: [],
            Imagebase64: ''
        }
    }

    componentDidMount = async () => {

        let data = await getAllSpecialty()
        this.setState({
            arrSpecialty: data.data.data
        })

    }

    handleViewDetailSpecialty = (idspecial) => {

        console.log('VIEW DOCTOR DETAILS ', idspecial)
        this.props.history.push(`/detail-specialties/${idspecial.id}`)
    }


    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        let { arrSpecialty } = this.state
        const { language } = this.props
        return (
            <React.Fragment>



                <div className='section-MedicalFacility'>
                    <div className='speciaty-content'>
                        <div className='MedicalFacility-header'>
                            <span className='title-header-MedicalFacility'><FormattedMessage id={'home-header.chuyenkhoanoitieng'} /></span>

                        </div>
                        <div className='container'>
                            <Slider {...settings}>

                                {arrSpecialty && arrSpecialty.length > 0 &&


                                    arrSpecialty.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        return (

                                            <div className='medical_content_body'>
                                                <div className='Main_Clinic' key={index}
                                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                                >
                                                    <div className='Imange_clinic'>
                                                        <img className='picture_MedicalFacility' src={imageBase64} />

                                                    </div>
                                                    <span className='textName_clinic'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</span>
                                                </div>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
