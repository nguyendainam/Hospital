import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import SysModal from '../../components/SysModal';
import axios from 'axios'
import images from '../../constants/images';
const baseurl = process.env['REACT_APP_URL']

const Register = ({ navigation }) => {




    const data = [
        { key: 'M', value: 'Nam' },
        { key: 'F', value: 'Nữ' },
        { key: 'O', value: 'Khác' },
    ];
    const [ShowModal, setShowModal] = useState(false)
    const [errMessage, seterrMessage] = useState('')
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [fullname, setfullname] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [address, setaddress] = useState("")
    const [gender, setGender] = useState("")
    const [secureTextEntry, setsecureTextEntry] = useState(true)
    OnHideNotification = () => {
        setShowModal(false)
    }

    const SaveDataUser = async () => {
        if (!email || !password || !fullname) {
            seterrMessage("Vui lòng nhập đầy đủ thông tin ")
            setShowModal(true)
            return;
        }
        await axios({
            url: `${baseurl}/api/create-new-users-patient`,

            method: 'POST',
            data: {
                email: email,
                password: password,
                fullname: fullname,
                phonenumber: phonenumber,
                address: address,
                gender: gender,
            },
        }).then(result => {
            seterrMessage("" + result.data.errMessage);
            if (result.data.errCode == 0) {
                alert("Tao Tai Khoang Thanh Cong")
                navigation.goBack()

            } else {
                seterrMessage = (result.errMessage)
                setShowModal(true)
            }
        }).catch(e => {
            seterrMessage(e.response.data.errMessage);
            setShowModal(true)
        });



    }

    buttonEye = () => {

        setsecureTextEntry(!secureTextEntry)


    }

    return (


        <View style={styles.main_Register}>
            <SysModal message={errMessage} visible={ShowModal} onHide={OnHideNotification} />
            <Text style={styles.title_Register}>TẠO TÀI KHOẢN </Text>
            <View style={styles.from_register}>
                <View style={styles.nofification_1}>
                    <Text style={styles.text_name_1}>Họ và tên</Text>
                    <TextInput style={styles.text_notifi}
                        onChangeText={(value) => setfullname(value)}
                    />

                </View>

                <View style={styles.nofification_1}>
                    <Text style={styles.text_name_1}>Email</Text>
                    <TextInput style={styles.text_notifi}
                        onChangeText={(value) => setemail(value)}
                    ></TextInput>
                </View>
                <View style={styles.nofification_1}>
                    <View style={styles.form_pass}>
                        <Text style={styles.text_name_1}>Mật khẩu</Text>
                        <TextInput style={styles.text_notifi}
                            onChangeText={(value) => setpassword(value)}
                            secureTextEntry={secureTextEntry ? true : false}
                        />
                        <View style={styles.icon}>
                            <TouchableOpacity style={styles.eyeicon} onPress={() => this.buttonEye()}>
                                <Image style={styles.img_eyeicon} source={secureTextEntry ? images.eye : images.hide}
                                />

                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={styles.nofification_2}>
                    <View>
                        <Text style={styles.text_name_1}>Giới tính</Text>

                        <View style={styles.selectedView}>
                            <SelectList data={data} style={styles.selectOpition}
                                setSelected={setGender}
                                search={false}
                                defaultOption={{ key: 'M', value: 'Nam' }}
                                boxStyles={{ backgroundColor: 'white' }}
                                inputStyles={{ fontSize: 18 }}
                                dropdownItemStyles={{ marginHorizontal: 10 }}
                                dropdownTextStyles={{ fontSize: 18, fontWeight: '500', color: 'white' }}


                            />
                        </View>
                    </View>
                    <View style={styles.viewText_phone} >
                        <Text style={{ color: 'white' }}> Số điện thoại</Text>
                        <TextInput style={styles.text_notifi_number}
                            keyboardType='number-pad'

                            onChangeText={(value) => setphonenumber(value)}
                        />


                        <Text style={styles.text_name_1}>Địa Chỉ</Text>
                        <TextInput style={styles.text_notifi_number}
                            onChangeText={(value) => setaddress(value)}

                        ></TextInput>



                    </View>



                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View style={styles.button_register}>
                            <Text style={styles.text_name}>Quay Lại</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={SaveDataUser}
                    >
                        <View style={styles.button_register1}>
                            <Text style={styles.text_name}>Đăng Ký</Text>
                        </View>
                    </TouchableOpacity>



                </View>


            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    icon: {
        marginRight: 50,
        width: 40
    },

    img_eyeicon: {
        fontSize: 10,
        width: 30,
        height: 25
    },

    form_pass: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
    },

    button_register: {
        width: 140,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 50,
        marginLeft: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5F8D4E'
    },
    button_register1: {
        width: 140,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 50,
        marginLeft: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#68B984'
    },

    selectedView: {
        width: 120,
        color: 'white',
        borderRadius: 10,
    }
    ,
    text_notifi_number: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        height: 50,
        color: 'white'
    },
    viewText_phone: {
        marginLeft: 40,
        width: 200,
        height: 200,
    }

    ,
    selectOpition: {
        width: 250,
        height: 50,
        color: 'white',
    },
    nofification_2: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 60
    },

    nofification_1: {
        width: '95%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-between'


    },

    text_notifi: {
        width: 200,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginLeft: 40,

    },

    text_input_name: {
        width: 150,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
    },

    text_name: {
        color: 'white',
        fontWeight: '600',


    },
    text_name_1: {
        color: 'white',
        fontWeight: '600',
        width: 60,
        marginRight: 40
    },
    Name_user: {
        width: '95%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15
    },
    main_Register: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    from_register: {
        width: '100%',
        height: 500,
        backgroundColor: '#A7D2CB',
        paddingTop: 20,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    title_Register: {
        fontSize: 20,
        fontWeight: '500'
    }
})

export default Register;
