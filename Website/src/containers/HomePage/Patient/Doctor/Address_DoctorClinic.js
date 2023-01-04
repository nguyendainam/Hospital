import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../Header/Header'
import './Address_DoctorClinic.scss'
import { LANGUAGES } from '../../../../utils';
import Footer from '../../Footer/Footer'
import { getDataCostInforDoctor } from '../../../../services/userService'
import { FormattedMessage } from 'react-intl';
class Address_DoctorClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            isShowDetailCost: false,
            priceVi: '',

        }
    }

    async componentDidMount() {
        let idDoctor = this.props.doctorId
        let res = await getDataCostInforDoctor(idDoctor)
        if (res) {
            this.setState({
                dataClinic: res
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let idDoctor = this.props.doctorId
            let res = await getDataCostInforDoctor(idDoctor)
            if (res) {
                this.setState({
                    dataClinic: res
                })
            }
        }
    }


    isshowDetail = (status) => {
        console.log("... status", status)
        this.setState({
            isShowDetailCost: status
        })
    }

    render() {

        const { language } = this.props
        const DataInfor = this.state.dataClinic
        const { isShowDetailCost } = this.state
        console.log('...', DataInfor)

        let pricevi = '', priceEn = ''
        if (DataInfor && DataInfor.data && DataInfor.data.data && DataInfor.data.data.PriceData) {

            let money = DataInfor.data.data.PriceData.valueVi
            pricevi = `Giá Khám:  ${(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(+money))}`;
            priceEn = `Cost:  ${DataInfor.data.data.PriceData.valueEn}.$`

        }
        return (
            <>
                <div className='mainsClinic_doctor'>
                    <div className='thanhdoc'></div>
                    <div className='content_up'>


                        <div className='container_clinic'><span>Địa chỉ phòng khám</span></div>

                        <div>
                            {DataInfor && DataInfor.data && DataInfor.data.data && DataInfor.data.data.nameClinic

                                && DataInfor.data.data.addressClinic
                                ?
                                <>

                                    <span className='address-doctor'>{DataInfor.data.data.nameClinic}</span>
                                    <div><span className='nameClinic' >{DataInfor.data.data.addressClinic}</span></div>



                                </>
                                : <>
                                    <span> Chưa có địa chỉ khám cụ thể</span>




                                </>
                            }

                            <div className='thanhngang'> </div>

                            <div className='hideShow'>
                                {isShowDetailCost === false ?

                                    <div className=' content_dow'>

                                        <span className='giakham'>
                                            {DataInfor && DataInfor.data && DataInfor.data.data && DataInfor.data.data.PriceData
                                                && language === LANGUAGES.VI ?
                                                pricevi
                                                : priceEn}
                                        </span>






                                        <div onClick={() => this.isshowDetail(true)} className="text_detail">
                                            <FormattedMessage id={'home-header.See_details'} />
                                        </div>
                                    </div>

                                    :

                                    <div className='banggia'>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='costtable'>
                                                            <div>
                                                                <span className='giakham'>
                                                                    {DataInfor && DataInfor.data && DataInfor.data.data && DataInfor.data.data.PriceData
                                                                        && language === LANGUAGES.VI ?
                                                                        pricevi
                                                                        : priceEn}
                                                                </span>


                                                            </div>
                                                        </div>

                                                        {DataInfor && DataInfor.data
                                                            && DataInfor.data.data
                                                            && DataInfor.data.data.paymentId
                                                            && DataInfor.data.data.paymentId === 'PAY1'
                                                            ?
                                                            <i> <FormattedMessage id={'home-header.Paycash'} /> </i>
                                                            :
                                                            <i>  </i>
                                                        }

                                                        {DataInfor && DataInfor.data
                                                            && DataInfor.data.data
                                                            && DataInfor.data.data.paymentId
                                                            && DataInfor.data.data.paymentId === 'PAY2'

                                                            ?
                                                            <i> <FormattedMessage id={'home-header.Paycard'} /> </i>
                                                            :
                                                            ''
                                                        }

                                                        {DataInfor && DataInfor.data
                                                            && DataInfor.data.data
                                                            && DataInfor.data.data.paymentId
                                                            && DataInfor.data.data.paymentId === 'PAY3'

                                                            ?
                                                            <i> <FormattedMessage id={'home-header.Payall'} /> </i>
                                                            :
                                                            ''
                                                        }


                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td><FormattedMessage id={'home-header.title_booking'} /></td>

                                                </tr>
                                            </tbody>
                                            <div onClick={() => this.isshowDetail(false)} className="text_detail">

                                                <FormattedMessage id={'home-header.unSee_details'} />

                                            </div>
                                        </table>

                                    </div>

                                }







                            </div>




                        </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(Address_DoctorClinic);
