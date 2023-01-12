import React, { Component } from 'react';
import { connect } from "react-redux";
import './InformationDoctor.scss'
import { FormattedMessage } from 'react-intl'
import { getInforDoctor } from '../../../services/doctorService';
import { getDataCostInforDoctor, getIdNameSpecialty, getIdNameClinic, saveBulkSchedule, getAddressClinic } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import _ from 'lodash';


class InformationDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrInformation: [],
            listDoctor: [],
            dataInforDoctor: [],
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
            selectedClinic: '',
            selectedDoctor: '',

        }
    }

    async componentDidMount() {
        // lay data 
        this.props.fetchAllPriceStart()
        this.props.fetchAllPaymentStart()
        this.props.fetchAllProvinceStart()
        let arraySpe = await this.fetchAllSpecials()
        let arrayCli = await this.fetchAllClinic()
        let email = this.props.userInfo.email
        let dataDr = await getInforDoctor(email)
        this.setState({
            dataInforDoctor: dataDr.dataDoctor.dataDoctor,
            arrSpecialty: arraySpe,
            arrClinic: arrayCli

        })
        this.getdataInformationDoctor(dataDr)



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


    async componentDidUpdate(prevProps, prevState, snapshot) {
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


    getdataInformationDoctor = async (data) => {

        let id = data.dataDoctor.dataDoctor.id
        this.setState({ selectedDoctor: id })
        let res = await getDataCostInforDoctor(id)

        console.log('.........................', res)
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
                doctorId: this.state.selectedDoctor,
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
        let { language } = this.props
        const { nameClinic, addressClinic, note, btnUpdate, isloadingData, listProvince, arrSpecialty, dataInforDoctor } = this.state
        console.log('this....', this.props.userInfo)
        let nameDr = ''
        if (dataInforDoctor && !_.isEmpty(dataInforDoctor)) {
            nameDr = language === LANGUAGES.VI ? `${dataInforDoctor.lastName}${dataInforDoctor.firstName}` : `${dataInforDoctor.firstName}${dataInforDoctor.lastName}`
        }

        return (
            <>
                <div className='title'>Quản lý thông tin bác sĩ</div>


                <div className='container'>
                    <form>

                        <div className="row">

                            <div className="col-3">
                                <span><FormattedMessage id={'menu.doctor.doctor'} /></span>
                                <input type="text" className='form-control' disabled placeholder={nameDr}
                                    onChange={this.handleOnchangDoctor}
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
                                    options={this.state.listProvince}

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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        allPrices: state.admin.allPrices,
        allPayments: state.admin.allPayments,
        allProvince: state.admin.allProvince,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchAllPriceStart: () => dispatch(actions.fetchAllPrice()),
        fetchAllPaymentStart: () => dispatch(actions.fetchAllPayment()),
        fetchAllProvinceStart: () => dispatch(actions.fetchAllProvince()),
        saveInforCostDoctor: (data) => dispatch(actions.saveInforCostDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationDoctor);
