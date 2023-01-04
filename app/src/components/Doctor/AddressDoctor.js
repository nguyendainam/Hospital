import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'




const baseurl = process.env['REACT_APP_URL']

class AddressDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataAddress: [],
            isshowModel: false
        }
    }

    async componentDidMount() {
        this.getDataAddressDoctor(this.props.idDoctor)


    }


    getDataAddressDoctor = async (inputId) => {
        let data = {}
        if (inputId) {
            await axios({
                method: 'GET',
                url: `${baseurl}/api/get-infor-cost-doctor-byid?doctorId=${inputId}`
            }).then(result => {
                this.setState({
                    dataAddress: result.data.data
                })
            }).catch((err) => {
                console.log("ERROR................", err);
            })
        }



    }






    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idDoctor !== prevProps.idDoctor) {
            this.getDataAddressDoctor(this.props.idDoctor)
        }
    }

    HideDetail = () => {
        this.setState({
            isshowModel: true
        })
    }

    UnHideDetail = () => {
        this.setState({
            isshowModel: false
        })
    }

    render() {

        // console.log("...", typeof price1)
        // console.log('....dataa______', this.state.dataAddress)
        let address, money, country, nameClinic, price = ''
        const { dataAddress, isshowModel } = this.state


        if (dataAddress && dataAddress.data && dataAddress.data.PaymenteData
            && dataAddress.data.PriceData
            && dataAddress.data.ProVinceData) {

            nameClinic = dataAddress.data.nameClinic
            address = dataAddress.data.addressClinic
            price = dataAddress.data.PriceData.valueVi
            money = `Giá Khám:  ${(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(+price))}`;

        }

        let pay = ''
        let typePrice = ''
        if (dataAddress && dataAddress.data && dataAddress.data.paymentId) {
            pay = dataAddress.data.paymentId
            if (pay === 'PAY1') {
                typePrice = "Chỉ nhận thanh toán bằng tiền mặt"
            }
            if (pay === 'PAY2') {
                typePrice = "Chỉ nhận thanh toán qua thẻ"
            }
            if (pay === 'PAY3') {
                typePrice = "Có thể thanh toán qua thẻ hoặc tiền mặt"
            }
        }


        return (
            <View>
                <View>
                    <Text style={styles.title_adr}>Địa chỉ phòng khám </Text>
                    <Text style={styles.nameClinic}>{nameClinic}</Text>
                    <Text style={styles.addressClinic} >{address}</Text>



                    {isshowModel && isshowModel === true ?
                        <View>
                            <TouchableOpacity onPress={() => this.UnHideDetail()}>
                                <View>

                                    <Text style={styles.price}>{money}</Text>
                                    <Text>{typePrice}</Text>
                                    <Text >
                                        {dataAddress && dataAddress.data && dataAddress.data.note ? dataAddress.data.note : ''}
                                    </Text>
                                    <Text style={styles.detailShow}>Ẩn Xem Chi Tiết</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <Text style={styles.price}>{money}</Text>
                            <TouchableOpacity onPress={() => this.HideDetail()}>
                                <View>
                                    <Text style={styles.detailShow}>Xem chi tiết</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

const styles = StyleSheet.create({

    detailShow: {
        color: 'blue'
    },

    price: {
        color: 'deeppink',
        fontWeight: '600',
        paddingTop: 5
    },

    addressClinic: {
        color: 'black',
        fontSize: 15,
        paddingTop: 5,
        fontStyle: 'italic',
        color: 'black'
    },

    nameClinic: {
        color: 'black',
        fontSize: 15,
        color: 'black',
        fontWeight: '500'
    }
    , title_adr: {
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 5
    }


})


export default connect(mapStateToProps, mapDispatchToProps)(AddressDoctor);
