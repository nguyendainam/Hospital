import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import ProfileDrBooking from '../Doctor/ProfileDrBooking';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import { SelectList } from 'react-native-dropdown-select-list';



const baseurl = process.env['REACT_APP_URL']
class DoctorClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrSpecialties: [],
            selecSpecialty: 'ALL',
            arrClinic: [],
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let idClinic = this.props.idClinic
        this.dataDoctorClinic(idClinic, this.state.selecSpecialty)
        this.getAllcodeSpecialty()

    }


    dataDoctorClinic = async (idClinic, idSpecialty) => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-doctors-clinics?idClinic=${idClinic}&specialtyId=${idSpecialty}`
        }).then(result => {
            this.setState({
                arrClinic: result.data.data
            })
        })
    }



    getAllcodeSpecialty = async () => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/list-allcode-specialty`
        }).then(data => {
            let list = data.data.data.data
            let result = []
            if (list) {
                list.map(item => {
                    let object = {}
                    object.value = item.nameVi
                    object.key = item.id
                    result.push(object)
                })

                return result
            }



        }).then(result => {
            if (result && result.length > 0) {
                result.unshift({
                    key: 'ALL',
                    value: 'Tất cả các chuyên khoa'
                })
            }
            this.setState({
                dataSpecialty: result
            })
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idClinic !== prevProps.idClinic) {
            this.selectedSpecialty()
        }
    }


    selectedSpecialty = (key) => {
        this.dataDoctorClinic(this.props.idClinic, key)
    }

    render() {
        let { arrClinic, dataSpecialty } = this.state

        return (
            <>
                <View style={styles.containerDrClinic}>


                    <Text>CHỌN CHUYÊN KHOA</Text>
                    <View style={styles.formSelect}>

                        <SelectList
                            setSelected={(key) => this.selectedSpecialty(key)}
                            search={false}
                            data={dataSpecialty}
                            defaultOption={key = dataSpecialty[0]}
                        />
                    </View>


                    <View style={styles.formlistDoctor}>
                        {arrClinic ?
                            arrClinic.map((item, index) => {
                                return (
                                    <>
                                        <View style={styles.doctor} key={index}>
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
                                                    isCloseAdd={true}

                                                />
                                            </View>
                                        </View>
                                    </>
                                )
                            })

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

    formSelect: {
        width: 250,
    },

    doctor: {
        width: '100%',
        borderBottomColor: '#86E5FF',
        borderBottomWidth: 1
    },

    inforDoctor: {
        width: '100%',
        height: 180,

    },


    formlistDoctor: {
        width: '100%',
        height: 'auto',

    },

    chossenSpe: {
        marginLeft: 5,
        width: '100%',
        height: 80,
    },
    containerDrClinic: {
        marginTop: 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(DoctorClinic);
