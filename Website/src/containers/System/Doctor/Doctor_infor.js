import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor_infor.scss'
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _, { isEmpty, result } from 'lodash';
import { fetchAllPayment } from '../../../store/actions';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

import { getDataCostInforDoctor, getIdNameSpecialty, getIdNameClinic, saveBulkSchedule, getAddressClinic } from '../../../services/userService';




class DoctorInfor extends Component {



    constructor(props) {
        super(props);
        this.state = {
            arrInformation: [],
            listDoctor: [],
            selectedDoctor: '',
            listPrice: [],
            listPayment: [],
            listProvince: [],
            arrSpecialty: [],
            arrClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            btnUpdate: false,
            isloadingData: false,
            selectedSpecialty: '',
            selectedClinic: ''

        }
    }
    componentDidMount = async () => {
        this.props.fetchAllPriceStart()
        this.props.fetchAllPaymentStart()
        this.props.fetchAllProvinceStart()
        this.props.fetchallDoctor()
        let arraySpe = await this.fetchAllSpecials()
        let arrayCli = await this.fetchAllClinic()
        this.setState({
            isloadingData: this.props.isloadingData,
            arrSpecialty: arraySpe,
            arrClinic: arrayCli
        })


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctors !== prevProps.allDoctors) {
            let res = this.fetchAlldoctor(this.props.allDoctors)

            this.setState({
                listDoctor: res
            })
        }
        if (this.props.allPrices !== prevProps.allPrices) {
            let resPrice = this.fetchAllPrice(this.props.allPrices)
            this.setState({
                listPrice: resPrice
            })
        }

        if (this.props.allPayments !== prevProps.allPayments) {
            let resPayments = this.fetchAllPayment(this.props.allPayments)
            this.setState({
                listPayment: resPayments
            })
        }

        if (this.props.allProvince !== prevProps.allProvince) {
            let resAllProvince = this.fetchAllProvince(this.props.allProvince)
            this.setState({
                listProvince: resAllProvince
            })
        }

        if (this.props.language !== prevProps.language) {
            let res = this.fetchAlldoctor(this.props.allDoctors)
            let resPrice = this.fetchAllPrice(this.props.allPrices)
            let resPayments = this.fetchAllPayment(this.props.allPayments)
            let resAllProvince = this.fetchAllProvince(this.props.allProvince)
            let arraySpe = await this.fetchAllSpecials()
            let arrayCli = await this.fetchAllClinic()

            this.setState({
                listDoctor: res,
                listPrice: resPrice,
                listPayment: resPayments,
                listProvince: resAllProvince,
                arrSpecialty: arraySpe,
                arrClinic: arrayCli
            })
        }


        if (this.props.isloadingData !== prevProps.isloadingData) {
            this.setState({
                isloadingData: this.props.isloadingData,
            })
        }





    }

    fetchAllClinic = async () => {
        let language = this.props.language
        let data = await getIdNameClinic()
        let listClinic = data.data
        let arrayClinic = []
        if (listClinic && listClinic.length > 0) {
            listClinic.map((item, index) => {
                let onbject = {}
                onbject.label = language === LANGUAGES.VI ? item.nameVi : item.nameEn
                onbject.value = item.id
                arrayClinic.push(onbject)
            })
        }
        return arrayClinic
    }


    fetchAllSpecials = async () => {
        let language = this.props.language
        let data = await getIdNameSpecialty()
        let arrSpecialty = data.data

        let array = []
        if (arrSpecialty && arrSpecialty.data.length > 0) {

            arrSpecialty.data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.nameVi : item.nameEn
                object.value = item.id
                array.push(object)
            })
        } return array
    }

    fetchAllProvince = (inputProvince) => {
        let language = this.props.language
        let arrProvince = []
        if (inputProvince && inputProvince.length) {

            inputProvince.map((item, index) => {
                let ObjectProvince = {}
                let ProvinceVi = `${item.valueVi}`
                let ProvinceEn = `${item.valueEn}`
                ObjectProvince.label = language === LANGUAGES.VI ? ProvinceVi : ProvinceEn
                ObjectProvince.value = item.keyMap

                arrProvince.push(ObjectProvince)
            })
        }
        return arrProvince
    }

    fetchAllPayment = (inputpayment) => {
        let language = this.props.language
        let arrPayment = []
        if (inputpayment && inputpayment.length > 0) {
            inputpayment.map((item, index) => {
                let ObjectPayment = {}
                let paymentVi = `${item.valueVi}`
                let paymentEn = `${item.valueEn}`
                ObjectPayment.label = language === LANGUAGES.VI ? paymentVi : paymentEn
                ObjectPayment.value = item.keyMap
                arrPayment.push(ObjectPayment)
            })
        }
        return arrPayment

    }

    fetchAllPrice = (inputPrice) => {
        let language = this.props.language
        let arrPrice = []
        if (inputPrice && inputPrice.length > 0) {
            inputPrice.map((item, index) => {
                let ObjectPrice = {}
                let priceVi = `${item.valueVi}.VNĐ`
                let priceEn = `${item.valueEn}$`
                ObjectPrice.label = language === LANGUAGES.VI ? priceVi : priceEn
                ObjectPrice.value = item.keyMap
                arrPrice.push(ObjectPrice)
            })
        }
        return arrPrice
    }


    fetchAlldoctor = (inputdata) => {
        let language = this.props.language
        let arrDoctor = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName}${item.lastName} `
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn
                Object.value = item.id
                arrDoctor.push(Object)
            })

        }
        return arrDoctor

    }

    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })



    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    HandleOnChangeClinic = async (selectedClinic) => {
        this.setState({ selectedClinic: selectedClinic })
        let res = await getAddressClinic(selectedClinic.value)
        let listProvince = this.state.listProvince
        console.log("clinic....", res)
        if (res && res.errCode === 0) {
            let addressClinic = res.data.address
            let provinceId = res.data.province

            let findProvince = listProvince.find(item => {
                return item && item.value === provinceId
            })
            this.setState({
                addressClinic: addressClinic,
                selectedProvince: findProvince

            })
        }

    }



    handleOnchangDoctor = async (selectedDoctor) => {

        this.setState({ selectedDoctor: selectedDoctor })
        let res = await getDataCostInforDoctor(selectedDoctor.value)
        let { listPrice, listPayment, listProvince, arrSpecialty, arrClinic } = this.state
        if (res.data.data && res.data.errCode === 0 && res.data.data.doctorId &&
            res.data.data.paymentId) {

            let Priceid = res.data.data.priceId
            let provinceId = res.data.data.provinceId
            let paymentId = res.data.data.paymentId
            let specialty = res.data.data.InforDrSpecialty.id
            let clinic = res.data.data.InforDrclinicId.id


            let findItemPrice = listPrice.find(item => {
                return item && item.value === Priceid
            })

            let findProvince = listProvince.find(item => {
                return item && item.value === provinceId
            })

            let findlistPayment = listPayment.find(item => {
                return item && item.value === paymentId
            })

            let findSpecialty = arrSpecialty.find(item => {
                return item && item.value === specialty
            })


            let findClinic = arrClinic.find(item => {
                return item && item.value === clinic
            })



            this.setState({

                nameClinic: res.data.data.nameClinic,
                addressClinic: res.data.data.addressClinic,
                note: res.data.data.note,
                selectedPrice: findItemPrice,
                selectedProvince: findProvince,
                selectedPayment: findlistPayment,
                btnUpdate: true,
                selectedSpecialty: findSpecialty,
                selectedClinic: findClinic
            })



        } else {
            this.setState({
                btnUpdate: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                selectedSpecialty: '',
                selectedClinic: ""

            })
        }

    }





    handleOnsave = () => {

        if (!this.state.selectedDoctor || !this.state.selectedPayment
            || !this.state.selectedPrice ||
            !this.state.selectedProvince || !this.state.nameClinic || !this.state.addressClinic
            || !this.state.selectedSpecialty || !this.state.selectedClinic

        ) {
            alert('KHÔNG ĐƯỢC ĐỂ TRỐNG')
            return

        } else {
            const { btnUpdate } = this.state
            this.props.saveInforCostDoctor({
                doctorId: this.state.selectedDoctor.value,
                specialtyId: this.state.selectedSpecialty.value,
                clinicId: this.state.selectedClinic.value,
                priceId: this.state.selectedPrice.value,
                provinceId: this.state.selectedProvince.value,
                paymentId: this.state.selectedPayment.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,

                actions: btnUpdate === false ? 'CREATE' : 'UPDATE'
            })
            if (btnUpdate === true) {
                alert("Sửa thông tin thành công ")
                window.location.reload();
            } if (btnUpdate === false) {
                alert("Thêm thông tin thành công ")
                window.location.reload();
            }

        }

    }

    render() {
        const { nameClinic, addressClinic, note, btnUpdate, isloadingData, listProvince, arrSpecialty } = this.state
        return (
            <div className='container'>
                <span className='tittle_infor'> <FormattedMessage id={'menu.doctor.tittle_inforDR'} /></span>

                <div className='form_InformationDr pt-5'>
                    {isloadingData && isloadingData === true ?
                        ""
                        :
                        <div className='text_loading'>Loadding data ........</div>

                    }
                    <form>

                        <div className="row">

                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.doctor'} /></span>
                                <Select className='form-control'
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleOnchangDoctor}
                                    options={this.state.listDoctor}
                                />



                            </div>
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.price'} /></span>
                                <Select className='form-control'
                                    value={this.state.selectedPrice}
                                    onChange={this.inputChangedHandle.bind(this, "selectedPrice")}
                                    options={this.state.listPrice}
                                />
                            </div>

                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.payment'} /></span>
                                <Select className='form-control'
                                    value={this.state.selectedPayment}
                                    onChange={this.inputChangedHandle.bind(this, "selectedPayment")}
                                    options={this.state.listPayment}
                                />
                            </div>
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.province'} /></span>
                                <Select className='form-control'
                                    value={this.state.selectedProvince}
                                    onChange={this.inputChangedHandle.bind(this, "selectedProvince")}
                                    options={listProvince}

                                />
                            </div>
                        </div>
                        <div className="row col-12 pt-5 ">
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.dr_specialty'} /></span>
                                <Select
                                    className='form-control'
                                    value={this.state.selectedSpecialty}
                                    onChange={this.inputChangedHandle.bind(this, "selectedSpecialty")}
                                    options={arrSpecialty}
                                />
                            </div>
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.dr_clinic'} /></span>
                                <Select
                                    className='form-control'
                                    value={this.state.selectedClinic}
                                    onChange={this.HandleOnChangeClinic}
                                    options={this.state.arrClinic}

                                />
                            </div>


                        </div>

                        <div className="row col-12 pt-5 form2">
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.nameclinic'} /></span>
                                <input type="text" className="form-control"
                                    value={nameClinic}
                                    onChange={(event) => this.onChangeInput(event, 'nameClinic')}

                                />
                            </div>
                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.addclinic'} /></span>
                                <input type="text" className="form-control"

                                    value={addressClinic}
                                    onChange={(event) => this.onChangeInput(event, 'addressClinic')}

                                />
                            </div>

                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.note'} /></span>
                                <input type="text" className="form-control"
                                    value={note}
                                    onChange={(event) => this.onChangeInput(event, 'note')}

                                />

                            </div>

                        </div>



                    </form>
                    <div className='pt-5 but_sendata'>

                        <button
                            type="button"
                            className={btnUpdate === false ? "btn btn-outline-success btn_senddata" : "btn btn-outline-warning btn_senddata"}
                            onClick={() => this.handleOnsave()}>
                            {btnUpdate === false ?

                                <span>Save</span>
                                :
                                <span>Update</span>

                            }

                        </button>
                    </div>
                </div>


            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allPrices: state.admin.allPrices,
        allPayments: state.admin.allPayments,
        allProvince: state.admin.allProvince,
        isloadingData: state.admin.isloadingData,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPriceStart: () => dispatch(actions.fetchAllPrice()),
        fetchAllPaymentStart: () => dispatch(actions.fetchAllPayment()),
        fetchAllProvinceStart: () => dispatch(actions.fetchAllProvince()),
        fetchallDoctor: () => dispatch(actions.fetchallDoctor()),
        saveInforCostDoctor: (data) => dispatch(actions.saveInforCostDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfor);
