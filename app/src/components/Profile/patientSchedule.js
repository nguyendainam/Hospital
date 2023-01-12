import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import moment from 'moment';
import { SelectList } from 'react-native-dropdown-select-list';

const baseurl = process.env['REACT_APP_URL']
class PatientSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDate: [],
            dataPatient: []
        }
    }

    async componentDidMount() {
        let getDate = this.getArrayDate()
        let firstDate = getDate[5].key
        let idPatient = this.props.dataUser.id

        this.getData(idPatient, firstDate)
        this.setState({
            arrDate: getDate
        })
    }

    getData = async (idPatient, date) => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/patient-get-schedule?patientId=${idPatient}&date=${date}`
        }).then(data => {
            this.setState({
                dataPatient: data.data
            })
        })

    }



    getArrayDate = () => {

        let arrDate = []
        for (let i = -5; i < 5; i++) {
            let object = {}
            if (i === 0) {
                let today = moment(new Date()).format('- DD/MM')
                object.value = `Hôm nay ${today} `
                object.key = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                arrDate.push(object)
            } else {
                object.value = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.key = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                arrDate.push(object)

            }


        }
        return arrDate



    }




    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    dateSelected = (key) => {
        let idPatient = this.props.dataUser.id
        this.getData(idPatient, key)
    }


    cancelSchedule = async (item) => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/patient-cancel-schedule?patientId=${item.patientId}&token=${item.token}`
        }).then(data => {
            let notifi = data.data
            console.log("...........", notifi)
            if (notifi.errCode === 0) {
                let idPatient = this.props.dataUser.id
                this.getData(idPatient, item.date)
            }
        })




    }

    render() {

        let { arrDate } = this.state
        let dataPatient = this.state.dataPatient.data
        //   console.log('date....', dataPatient)
        return (
            <>
                <View style={styles.containerSchedule}>
                    <Text>Lịch khám bệnh</Text>

                    <View>
                        <SelectList

                            data={arrDate}
                            label={arrDate.label}
                            setSelected={(key) => { this.dateSelected(key) }}
                            search={false}
                            boxStyles={{ marginHorizontal: 20, borderColor: '#FF8E9E', fontWeight: 'blod' }}
                            inputStyles={{ color: '#FF577F', fontWeight: '900' }}
                            dropdownStyles={{ color: 'pink', borderColor: 'white' }}
                            placeholder='Chọn lịch '
                            dropdownTextStyles={{ color: '#FF8E9E', fontWeight: '700' }}
                            dropdownItemStyles={{ marginHorizontal: 10 }}
                            defaultOption={key = arrDate[5]}




                        />
                    </View>

                    <View style={styles.formPatient}>
                        {dataPatient && dataPatient.length > 0 ?

                            dataPatient.map((item, index) => {
                                return (
                                    <View style={styles.information} key={index}>
                                        <View style={styles.form1}>
                                            <Text style={{ width: '50%' }}>Tên Bệnh Nhân</Text>
                                            <Text style={{ width: '50%' }}>{item.PatientData.fullname}</Text>
                                        </View>
                                        <View style={styles.form1}>
                                            <Text style={{ width: '50%' }} >Tên Bác Sĩ</Text>
                                            <Text style={{ width: '50%' }}>{item.BookingDoctor.positionData.valueVi}: {item.BookingDoctor.lastName} {item.BookingDoctor.firstName}</Text>
                                        </View>
                                        <View style={styles.form1}>
                                            <Text style={{ width: '50%' }} >Giờ khám</Text>
                                            <Text style={{ width: '50%' }}>{item.timeTypeBooking.valueVi}</Text>
                                        </View>
                                        <View style={styles.form1}>
                                            <Text style={{ width: '50%' }}>Trạng thái</Text>
                                            <Text style={{ width: '50%', color: 'red' }}>{item.statusBooking.valueVi}</Text>
                                        </View>


                                        {item.statusId === 'S3' || item.statusId === 'S4' ?
                                            <Text></Text> :
                                            <TouchableOpacity
                                                onPress={() => this.cancelSchedule(item)}
                                            >
                                                <View style={styles.button}>
                                                    <Text style={{ color: 'black' }}>Hủy lịch hẹn</Text>
                                                </View>
                                            </TouchableOpacity>

                                        }


                                    </View>
                                )


                            })

                            : <Text>Không có lịch khám nào</Text>

                        }



                    </View>
                </View>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loaddingUser: state.authReducer.isloading,
        dataUser: state.authReducer.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

const styles = StyleSheet.create({


    containerSchedule: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        marginTop: 20,
        width: 100,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    }

    , form1: {
        alignItems: 'center',
        marginLeft: 20,
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1
    }

    , formPatient: {
        width: '100%',
        height: 'auto',
        marginTop: 20
    },
    information: {
        width: '100%',
        height: 280,
        borderWidth: 1,
        marginTop: 50,
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(PatientSchedule);
