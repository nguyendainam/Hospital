import React, { Component } from 'react';
import { connect } from "react-redux";
import './Clinic.scss'
import { FormattedMessage } from 'react-intl'
import { getAddressClinic } from '../../../../services/userService'



import Header from '../../Header/Header';
import { LANGUAGES } from '../../../../utils/constant';


class Clinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrClinic: []
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        let data = await getAddressClinic(id)
        this.setState({
            arrClinic: data
        })
    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let imageBase64, name_clinic, addressClinic, description = ''
        let { language } = this.props
        const { arrClinic } = this.state
        console.log('dataa....', arrClinic.data)

        if (arrClinic && arrClinic.data) {
            imageBase64 = new Buffer(arrClinic.data.image, 'base64').toString('binary')
            name_clinic = language === LANGUAGES.VI ? arrClinic.data.nameVi : arrClinic.data.nameEn
            addressClinic = arrClinic.data.address
            description = arrClinic.data.descriptionHTML
        }

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
                        <div dangerouslySetInnerHTML={{ __html: description }} ></div>
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
