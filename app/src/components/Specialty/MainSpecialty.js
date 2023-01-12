import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import AddressDoctor from '../Doctor/AddressDoctor';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ProfileDrBooking from '../Doctor/ProfileDrBooking';
import { SelectList } from 'react-native-dropdown-select-list'
const baseurl = process.env['REACT_APP_URL']




class MainSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            selectedProvince: 'ALL',
            arrDoctor: [],
            Arrprovince: [],
            province: 'PROVINCE',
            dataProvince: [],
            selectProvince: ''

        }
    }

    async componentDidMount() {


        this.doctorSpecialty(this.props.route.params.id, this.state.selectedProvince)
        this.GetAllProvince(this.state.province)
        const dataParent = this.props.route.params.dataSpecialty
        this.setState({
            dataSpecialty: dataParent,
        })




    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
    }


    GetAllProvince = async (inputType) => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/allcode?type=${inputType}`
        }).then(province => {
            this.setState({
                Arrprovince: province.data
            })

            let Data = province.data.data
            let result = []
            if (Data) {
                // console.log('...', Data)

                Data.map(item => {
                    let object = {}
                    object.value = item.valueVi
                    object.key = item.keyMap
                    result.push(object)

                })
                return result
            }

        }).then(result => {
            if (result && result.length > 0) {
                result.unshift({
                    key: 'ALL',
                    value: "Toàn Quốc",
                })
            }
            this.setState({
                dataProvince: result
            })
        })
    }
    doctorSpecialty = async (id, localtion) => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-doctor-specialties?id=${id}&localtion=${localtion}`

        }).then(data => {
            // console.log("dataaa====================", data.data.data.data)
            this.setState({
                arrDoctor: data.data.data.data
            })
        })
    }
    selectedProvince = (key) => {
        // console.log("keyy........", key)
        if (key) {
            this.doctorSpecialty(this.props.route.params.id, key)

        }

    }


    render() {



        const { dataSpecialty, arrDoctor, dataProvince, Arrprovince, selectProvince } = this.state
        let image, inforSpecialty = ''
        if (dataSpecialty && dataSpecialty.image) {
            image = new Buffer(dataSpecialty.image, 'base64').toString('binary')
            inforSpecialty = dataSpecialty.description
        }

        // console.log('dataprovince...............', dataProvince)

        return (
            <>
                <View style={styles.container_MainSpecialty}>
                    <View style={styles.viewHeader_Specialty}>
                        <ImageBackground style={styles.img_dr} source={{
                            uri: image
                        }}>
                            <ScrollView>
                                <Text style={styles.information_Specialty}>
                                    {inforSpecialty}

                                </Text>
                            </ScrollView>


                        </ImageBackground>

                    </View>
                    <View>
                        <Text>Chọn Khu Vực</Text>
                        <View style={{ width: 150 }}>
                            <SelectList
                                setSelected={(key) => this.selectedProvince(key)}
                                search={false}
                                data={dataProvince}
                                defaultOption={key = dataProvince[0]}
                            />
                        </View>
                    </View>

                    <View style={styles.fromListDr}>
                        <ScrollView>

                            {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
                                return (
                                    <View style={styles.List_Doctor_Special} >
                                        <View style={styles.fromDoctor} key={index}>
                                            <View style={styles.inforDoctor}>
                                                <ProfileDrBooking
                                                    idDoctor={item.doctorId}
                                                    isClose={true}
                                                />
                                            </View>

                                            <View style={styles.doctor}>
                                                <ScheduleDoctor
                                                    idDr={item.doctorId}
                                                    navigation={this.props.navigation}
                                                    isCloseAdd={false}
                                                />
                                            </View>

                                        </View>



                                    </View>


                                )


                            })}



                        </ScrollView>

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

    inforDoctor: {
        width: '95%',
        height: 180
    },

    doctor: {
        width: '100%',
        height: 'auto'
    },

    information_Specialty: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500'
    },

    img_dr: {
        width: '100%',
        height: '100%',


    },
    fromDoctor: {
        width: '100%',
        height: 'auto',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    fromListDr: {
        height: 500,
        marginTop: 20
    }



    , List_Doctor_Special: {
        width: '95%',
        height: 'auto',
        margin: 10

    }
    , viewHeader_Specialty: {
        width: '100%',
        height: 300,
        borderWidth: 1,
    }
    , container_MainSpecialty: {
        width: 'auto',
        height: 'auto'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(MainSpecialty);
