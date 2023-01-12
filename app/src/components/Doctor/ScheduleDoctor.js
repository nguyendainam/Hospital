import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import { Buffer } from 'buffer'

import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import AddressDoctor from './AddressDoctor';

import { SelectList } from 'react-native-dropdown-select-list'
import moment from "moment-timezone";
import vi from "moment/locale/vi";




const baseurl = process.env['REACT_APP_URL']
class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: {},
            keyDate: '',
            ListDate: [],
            idDr: ''
        };
    }






    componentDidMount = () => {

        let idDoctor = this.props.idDr
        let getDate = this.getArrayDate()
        let firstDate = getDate[0].key
        axios({
            method: 'GET',
            url: `${baseurl}/api/get-schedule-by-day?doctorId=${this.props.idDr}&date=${firstDate}`
        }).then((schedule) => {
            this.setState({
                ListDate: schedule.data.infor
            })
        }).catch((err) => {
            console.log("ERROR................", err);
        })




        this.setState({
            allDays: getDate,
            idDr: idDoctor
        })


    }



    getArrayDate = () => {

        let arrDate = []
        for (let i = 0; i < 7; i++) {
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


    dateSelected = async (key) => {
        let doctorId = this.props.idDr
        let date = key
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-schedule-by-day?doctorId=${doctorId}&date=${date}`
        }).then((schedule) => {
            this.setState({
                ListDate: schedule.data.infor
            })

            // console.log('=======lisdate========', this.state.ListDate)

        }).catch((err) => {
            console.log("ERROR................", err);
        })



    }

    BookSchedule = (item) => {
        this.props.navigation.push('BookSchedule', {
            data: item.doctorId,
            dataDoctor: this.state.ListDate.data,
            Time: item
        }


        )
    }


    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.idDr !== prevProps.idDr) {
            let idDoctor = this.props.idDr
            let getDate = this.getArrayDate()
            let firstDate = getDate[0].key
            axios({
                method: 'GET',
                url: `${baseurl}/api/get-schedule-by-day?doctorId=${this.props.idDr}&date=${firstDate}`
            }).then((schedule) => {
                this.setState({
                    ListDate: schedule.data.infor
                })
            }).catch((err) => {
                console.log("ERROR................", err);
            })
            this.setState({
                allDays: getDate,
                idDr: idDoctor
            })




        }
    }

    render() {

        dataDate = this.state.allDays
        ListDate = this.state.ListDate.data
        let idDoctor = this.props.idDr

        let isCloseAdd = this.props.isCloseAdd


        return (
            <View style={styles.mainSchedule}>
                <Text style={{ paddingLeft: 30, fontSize: 18, color: '#FF597B', fontWeight: 'bold' }}>
                    Chọn lịch khám bệnh
                </Text>
                <View style={styles.ScheduleDRform} >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={styles.formChooseDate}>
                            <SelectList

                                data={dataDate}
                                label={dataDate.label}
                                setSelected={(key) => { this.dateSelected(key) }}
                                search={false}
                                boxStyles={{ marginHorizontal: 20, borderColor: '#FF8E9E', fontWeight: 'blod' }}
                                inputStyles={{ color: '#FF577F', fontWeight: '900' }}
                                dropdownStyles={{ color: 'pink', borderColor: 'white' }}
                                placeholder='Chọn lịch '
                                dropdownTextStyles={{ color: '#FF8E9E', fontWeight: '700' }}
                                dropdownItemStyles={{ marginHorizontal: 10 }}
                                defaultOption={key = dataDate[0]}




                            />


                        </View>
                        <View style={styles.formclinic}>
                            <View style={{ width: 1, height: '50%', borderColor: '#00F5FF', borderWidth: 2 }}></View>
                            <View style={styles.formClinicDoctor}>
                                <AddressDoctor
                                    idDoctor={idDoctor}
                                    openaddress={isCloseAdd}
                                />
                            </View>

                        </View>

                    </View>



                    <View style={styles.formListSchedule} >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            {ListDate && ListDate.length > 0
                                ?
                                ListDate.map((item, index) => {
                                    // console.log("itemm", item)
                                    return (
                                        <TouchableOpacity
                                            // onPress={() => { this.BookSchedule(idDoctor) }}

                                            onPress={() => this.BookSchedule((item))}

                                            key={index}
                                        >
                                            <View style={styles.fontSchedule}>
                                                <Text style={styles.textHour}> {item.TimeTypeData.valueVi}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#FF597B', paddingLeft: 10 }}> Bác sĩ không có lịch khám, vui lòng chọn ngày khác !</Text>
                            }




                        </ScrollView>
                    </View>


                </View>
            </View>
        );
    }
}








const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}


const styles = StyleSheet.create({

    formClinicDoctor: {
        width: '100%',
        height: '100%',
        paddingLeft: 5,
    }
    , formclinic: {
        width: 230, height: 250,
        display: 'flex',
        flexDirection: 'row'

    },
    textHour: {
        fontWeight: '900',
        color: '#F56EB3'
    },

    fontSchedule: {

        width: 140,
        height: 60,
        borderWidth: 3,
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F65A83'
    },
    formChooseDate: {
        width: 170,
        height: 70,

    }
    ,
    mainSchedule: {
        marginTop: 30,
        width: '100%',
        height: 400,
        borderTopColor: 'white'
    }

    , ScheduleDRform: {
        width: '100%',
        height: '90%',
        borderTopWidth: 2,
        borderColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopColor: 'white'

    },
    formListSchedule: {
        marginLeft: 10,
        marginTop: 10,
        width: 370,
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#00F5FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',


    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor)

