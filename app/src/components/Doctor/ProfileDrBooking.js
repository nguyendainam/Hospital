import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'

const baseurl = process.env['REACT_APP_URL']
class PhofileDrBooking extends Component {


    constructor(props) {
        super(props);
        this.state = {
            images: '',
            data: [],
            isCloseAddress: false
        }
    }

    async componentDidMount() {


        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-profile-doctor-by-id?doctorId=${this.props.idDoctor}`

        }).then(result => {

            const dataInput = result.data
            imageBase64 = new Buffer(dataInput.profileDoctor.data.image, 'base64').toString('binary')
            let dataDr = dataInput.profileDoctor
            this.setState({
                data: dataDr,
                images: imageBase64
            })



        })

        const isClose = this.props.isClose
        if (isClose) {
            this.setState({
                isCloseAddress: isClose
            })
        }



    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idDoctor !== prevProps.idDoctor) {

            await axios({
                method: 'GET',
                url: `${baseurl}/api/get-profile-doctor-by-id?doctorId=${this.props.idDoctor}`

            }).then(result => {

                const dataInput = result.data
                imageBase64 = new Buffer(dataInput.profileDoctor.data.image, 'base64').toString('binary')
                let dataDr = dataInput.profileDoctor
                this.setState({
                    data: dataDr,
                    images: imageBase64
                })



            })

            const isClose = this.props.isClose
            if (isClose) {
                this.setState({
                    isCloseAddress: isClose
                })
            }
        }

    }


    render() {


        const { data, isCloseAddress } = this.state
        let fullNameDr, nameClinic, addClinic, city, price, description = ''
        if (data && data.data &&
            data.data.positionData &&
            data.data.positionData.valueVi &&
            data.data.Doctor_infor &&
            data.data.Doctor_infor.ProVinceData &&
            data.data.Doctor_infor.PriceData

        ) {
            console.log(data.data.positionData.valueVi)
            fullNameDr = `${data.data.positionData.valueVi} ${data.data.lastName} ${data.data.firstName}`
            nameClinic = `${data.data.Doctor_infor.nameClinic}`
            addClinic = ` ${data.data.Doctor_infor.addressClinic}`
            city = `${data.data.Doctor_infor.ProVinceData.valueVi}`
            let money = data.data.Doctor_infor.PriceData.valueVi

            price = `Giá Khám:  ${(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(+money))}`;


        }

        if (data.data && data.data.Markdown && data.data.Markdown.description) {
            description = data.data.Markdown.description
        }



        return (
            <>
                <View style={styles.title}>
                    {isCloseAddress === false ?
                        <Text style={styles.nameDr} >ĐẶT LỊCH KHÁM</Text>
                        : ''}
                </View>
                <View style={styles.main_container}>
                    <View style={styles.image_doctor}>
                        <Image source={{ uri: this.state.images }} style={styles.imgDr} />
                    </View>

                    <View style={styles.formInformation}>
                        <Text style={styles.nameDr}> {fullNameDr}</Text>
                        {isCloseAddress === false ?
                            <>

                                <Text style={styles.nameClinic}> {nameClinic}</Text>
                                <Text style={styles.addClinic}> {addClinic}</Text>
                                <Text style={styles.city}> <Image source={images.localtion} />  {city} </Text>
                                <Text style={styles.price}>{price}</Text>

                            </>
                            :
                            ''
                        }{isCloseAddress === true ?
                            <View style={{ width: 200, height: 100 }}>
                                <ScrollView >
                                    <Text>{description}</Text>
                                </ScrollView>

                            </View>

                            : ''
                        }

                    </View>
                </View>
            </>
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



    price: {
        color: 'deeppink',
        fontWeight: 'bold',
        paddingTop: 10

    },

    city: {
        color: 'blue'
    },

    addClinic: {
        color: 'black',
        fontWeight: '500',
        fontStyle: 'italic'
    },


    title: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    nameClinic: {
        color: 'black',
        paddingTop: 10,
        fontWeight: '700'
    },


    imgDr: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    nameDr: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'deeppink'
    }

    ,
    formInformation: {
        width: 280,
        height: 150,
        marginLeft: 10,
        justifyContent: 'center',
        paddingLeft: 20
    },

    main_container: {
        marginTop: 10,
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'white',
        backgroundColor: 'white',



    },
    image_doctor: {
        width: 120,
        height: 120,
        borderWidth: 1,
        marginLeft: 10,
        borderRadius: 50,
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(PhofileDrBooking);
