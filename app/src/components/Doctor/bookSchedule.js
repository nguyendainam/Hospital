import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import ProfileDrBooking from './ProfileDrBooking';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
const baseurl = process.env['REACT_APP_URL']
class BookSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataFromParent: '',
            Time: '',
            email: '',
            fullName: '',
            address: '',
            gender: ' ',
            note: '',
            setGender: '',
            datetime: '',
            getday: '',


        }
    }

    componentDidMount() {
        let data = this.props.route.params.data
        let timeType = this.props.route.params.Time

        this.setState({
            dataFromParent: data,
            Time: timeType


        })
    }




    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    sendDataBooking = async () => {
        const { Time } = this.state
        let date = ''
        if (Time && Time.TimeTypeData && Time.date) {
            timeSchedule = Time.TimeTypeData.valueVi
            date = moment(+Time.date).format('dddd DD/MM/YYYY')

        }


        let datetime = `${this.state.Time.TimeTypeData.valueVi} ${date}`
        let nameDoctor = `${Time.doctorSchedule.lastName} ${Time.doctorSchedule.firstName}`
        if (!this.state.email || !this.state.Time.timeType || !this.state.dataFromParent
            || !this.state.Time.date) {
            alert("Không được để trống thông tin")
            return

        } else {
            await axios({
                method: 'POST',
                url: `${baseurl}/api/patient-book-Appointment`,
                data: {
                    email: this.state.email,
                    fullName: this.state.fullName,
                    datetime: datetime,
                    DoctorName: nameDoctor,
                    address: this.state.address,
                    gender: this.state.setGender,
                    date: this.state.Time.date,
                    timeType: this.state.Time.timeType,
                    doctorId: this.state.dataFromParent,
                    note: this.state.note,
                    roleId: 'R3',
                    language: 'vi'
                }
            }).then(result => {
                // console.log('.......', result.data)
                alert("Tạo thành công, vui lòng kiểm tra email để xác nhận")
                this.setState({
                    email: '',
                    fullName: '',
                    address: '',
                    note: '',

                })




            }).catch(error => {
                console.log(error)
            })
        }
    }
    render() {
        const { Time } = this.state
        let timeSchedule, date, value = ''
        if (Time && Time.TimeTypeData && Time.date) {
            timeSchedule = Time.TimeTypeData.valueVi
            date = moment(+Time.date).format('dddd DD/MM/YYYY')

        }



        const data = [
            { key: 'M', value: 'Nam' },
            { key: 'F', value: 'Nữ' },
            { key: 'O', value: 'Khác' },
        ];
        return (
            <>


                <View style={styles.main_bookSchedule}>
                    <ProfileDrBooking
                        id={this.state.dataFromParent}
                        idDoctor={this.props.route.params.data}
                    />


                    <View style={styles.timeSchedule}>
                        <Text style={styles.text}>Thời gian khám:</Text>
                        <Text style={styles.times}>{timeSchedule}</Text>
                    </View>
                    <View style={styles.timeSchedule}>
                        <Text style={styles.text}>Ngày:</Text>
                        <Text style={styles.times}>{date}</Text>
                    </View>

                </View>

                <View style={styles.form_input_schedule}>
                    <Text>Vui lòng nhập thông tin</Text>
                    <View>
                        <Text>Địa chỉ Email</Text>
                        <TextInput style={styles.textInput_schedule}
                            value={this.state.email}
                            onChangeText={this.inputChangedHandle.bind(this, "email")}

                        />
                    </View>
                    <View>
                        <Text>Tên</Text>
                        <TextInput style={styles.textInput_schedule}
                            value={this.state.fullName}
                            onChangeText={this.inputChangedHandle.bind(this, "fullName")}
                        />
                    </View>
                    <View>
                        <Text>Địa chỉ liên hệ</Text>
                        <TextInput style={styles.textInput_schedule}
                            value={this.state.address}
                            onChangeText={this.inputChangedHandle.bind(this, "address")}
                        />

                    </View>


                    <View>
                        <Text>Lý do khám</Text>
                        <TextInput style={styles.textInput_schedule}
                            value={this.state.note}
                            onChangeText={this.inputChangedHandle.bind(this, "note")}
                        />
                    </View>
                    <View style={styles.form_footer}>
                        <Text>Giới Tính </Text>
                        <View style={styles.gender}>

                            <SelectList data={data} style={styles.selectOpition}
                                setSelected={(item, index) => {
                                    this.setState({
                                        setGender: item
                                    })
                                }}
                                search={false}
                                defaultOption={{ key: 'M', value: 'Nam' }}
                                // boxStyles={{ backgroundColor: 'white' }}
                                inputStyles={{ fontSize: 15 }}
                                dropdownItemStyles={{ marginHorizontal: 10 }}
                                dropdownTextStyles={{ fontSize: 10, fontWeight: '500', color: 'black' }}


                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={this.sendDataBooking}
                            >
                                <View style={styles.button_schedule}>
                                    <Text>ĐẶT LỊCH KHÁM</Text>
                                </View>
                            </TouchableOpacity>


                        </View>

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
    gender: {
        marginRight: 20
    },


    form_footer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15
    },
    selectOpition: {
        height: 50
    },

    button_schedule: {
        width: 150,
        height: 50,
        marginTop: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textInput_schedule: {
        width: 220,
        height: 40,
        borderWidth: 1
    },
    dayandgender: {
        display: 'flex',
        flexDirection: 'row'
    }
    ,
    form_input_schedule: {
        width: '100%',
        height: 'auto',
        borderTopColor: 'white'
        , borderTopWidth: 2,
        alignItems: 'center',
        backgroundColor: 'white'
    },


    text: {
        color: 'black'
    },
    times: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue',
        paddingLeft: 5
    },

    timeSchedule: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row'
    }

    , main_bookSchedule: {
        backgroundColor: ' white'
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(BookSchedule);
