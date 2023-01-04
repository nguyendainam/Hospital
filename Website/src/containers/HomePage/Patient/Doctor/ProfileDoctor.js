import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl'
import { getDataProfileDoctor } from '../../../../services/userService';
import { result } from 'lodash';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';

class ProfileDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            OpenDescription: false
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.id)
        let open = this.props.OpenDescription
        this.setState({
            dataProfile: data,
            OpenDescription: open
        })
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            let data = this.getInforDoctor(this.props.id)
            // this.setState({
            //     dataProfile: data
            // })
        }
        if (this.props.id !== prevProps.id) {
            let data = await this.getInforDoctor(this.props.id)
            this.setState({
                dataProfile: data,

            })
        }

    }

    getInforDoctor = async (id) => {
        let data = {}
        if (id) {

            let res = await getDataProfileDoctor(id)
            console.log('_____', res)
            if (res && res.profileDoctor && res.profileDoctor.errCode === 0) {
                data = res.profileDoctor.data
            }
            return data
        }







    }
    renderTimeBooking = (dataTime) => {
        // console.log('..DATA TIME..', dataTime)
        const { language } = this.props
        let date, dateVi, dateEn = ''
        if (dataTime && dataTime.TimeTypeData) {
            date = moment(+dataTime.date).format("DD/MM/YYYY") //parse integer
            dateVi = dataTime.TimeTypeData.valueVi
            dateEn = dataTime.TimeTypeData.valueEn
        }

        return (
            <>

                <div className='dateTime'>

                    <div className='Timeeschedule' > {language === LANGUAGES.VI ? dateVi : dateEn}</div>
                    {date}
                </div>
                <div><FormattedMessage id={'home-header.freeSchedule'} /></div>

            </>
        )
    }

    render() {
        const { language } = this.props
        const { dataProfile, OpenDescription } = this.state

        let imageBase64 = ''
        if (dataProfile && dataProfile.image) {
            imageBase64 = new Buffer(dataProfile.image, 'base64').toString('binary')
        }

        let nameVi, nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}:  ${dataProfile.lastName} ${dataProfile.firstName} `
            nameEn = `${dataProfile.positionData.valueEn}:  ${dataProfile.firstName} ${dataProfile.lastName} `
        }

        let addressVi, addClinic, addressEn = ''
        if (dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.ProVinceData) {
            addressVi = dataProfile.Doctor_infor.ProVinceData.valueVi
            addressEn = dataProfile.Doctor_infor.ProVinceData.valueEn
            addClinic = dataProfile.Doctor_infor.addressClinic

        }
        let priceVi, priceEn = ''
        if (dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.PriceData) {
            let priceVi_data = `${dataProfile.Doctor_infor.PriceData.valueVi}`
            priceVi = `Giá Khám:  ${(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(+priceVi_data))}`;
            priceEn = `Cost:  ${dataProfile.Doctor_infor.PriceData.valueEn}.$`


        }


        let des = ''
        if (dataProfile && dataProfile.Markdown) {
            des = dataProfile.Markdown.description
        }



        return (
            <>


                <div className='container_profile'>
                    <div className='Image_doctor_booking'>
                        <div className='imange_dr_booking'
                            style={{ backgroundImage: `url(${imageBase64 ? imageBase64 : ''}) ` }} >

                        </div>
                    </div>
                    <div className='information_main'>
                        <div className='Name_Doctor'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>

                        <div className='description_doctor'>
                            {OpenDescription === false ?
                                <span>
                                    {this.renderTimeBooking(this.props.dataTime)}
                                </span>
                                :
                                <span>{des}</span>

                            }



                        </div>

                        <div className='City'>
                            <span className='city_name'><i className="fas fa-map-marker-alt iconaddress"> </i> {language === LANGUAGES.VI ? addressVi : addressEn}
                            </span>
                            {OpenDescription === false ?
                                <span className='address_clinic'> <FormattedMessage id={'home-header.address'} /> {addClinic}</span>
                                : ''}
                        </div>


                    </div>


                </div>
                <div className='price_doctor'>
                    {OpenDescription === false ?
                        <span className='price_doctor_1'> {language === LANGUAGES.VI ? priceVi : priceEn}
                        </span>
                        : ''
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
