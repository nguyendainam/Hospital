import React, { Component, useState } from 'react';
import {
    Text,
    View,
    Image, ImageBackground,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { images } from '../constants/indexConstants';
import Icon from 'react-native-vector-icons/FontAwesome'

import LoginComponents from '../components/LoginComponents';
import axios from 'axios';
const baseurl = process.env['REACT_APP_URL']
export default RegisterUser = ({ navigation }) => {




    const sex = [{ label: 'Male', value: 'M' },

    { label: 'FeMale', value: 'F' },
    { label: 'Other', value: 'O' },
    ]
    const [getPasswordVisible, setPasswordVisible] = useState(false)
    const [errorMessage, seterrMessage] = useState("")
    const [showModal, setShowModal] = useState(false)


    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [address, setaddress] = useState("")

    const onChangedEmail = (value) => {
        setemail(value)
    }

    const onChangedPassword = (value) => {
        setpassword(value)
    }
    const onChangefirstName = (value) => {
        setfirstName(value)
    }
    const onChangelastName = (value) => {
        setlastName(value)
    }

    const onChangePhonenumber = (value) => {
        setphonenumber(value)
    }
    const onChangeAddress = (value) => {
        setaddress(value)
    }



    const onHideModal = () => {
        setShowModal(false)
    }

    const RegisterUser = () => {
        if (!email || !password || !firstName || !lastName) {
            seterrMessage("Please enter full information ")
            setShowModal(true)

            return;
        }
        axios({

            url: `${baseurl}/api/create-new-users`,
            method: 'POST',
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phonenumber: phonenumber,
                address: address,
                roleId: 'R3'
            },


        }).then(result => {

            console.log(result.data.errMessage);
            seterrMessage("" + result.data.errMessage);

            if (result.data.errCode == 0) {
                alert("Tao Tai Khoang Thanh Cong")
                navigation.navigate('SelectUser')

            }
            else {
                setShowModal(true)
            }
        })

            .catch(e => {
                // console.log(data.message)
                seterrMessage(e.response.data.errMessage);
                setShowModal(true)
                // seterrMessage = data.message;
            });

    }













    // HIDE information


    return (

        <View style={{
            flex: 100
        }}>
            <LoginComponents visible={showModal} message={errorMessage} onHide={onHideModal} />
            <ImageBackground
                source={images.backgroundApp}
                resizeMode='cover'
                style={{
                    flex: 100,
                    justifyContent: 'center'
                }}
            >


                <View style={{
                    flex: 10,

                }}>
                    <View style={{
                        flexDirection: 'row',
                        height: 60,
                        paddingLeft: 25,
                        paddingTop: 25,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        <Image source={images.logoApp}
                            style={{
                                marginHorizontal: 5,
                                width: 50,
                                height: 50,
                            }}
                        />

                        <Text style={{
                            color: 'white',
                            fontSize: 20

                        }}> YourHeart</Text>

                    </View>



                </View>

                <View style={{
                    flex: 80,
                    marginTop: 20

                }}>
                    {/* =====================================  */}
                    <View style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center'
                    }}>


                        {/* Email */}
                        <View style={{
                            width: '80%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                width: '20%',
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',

                            }}> Email: </Text>
                            <TextInput

                                value={email}
                                onChangeText={onChangedEmail}
                                autoCapitalize='none'
                                style={{

                                    width: '60%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',


                                }}></TextInput>






                        </View>
                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                                width: '30%',

                            }}> Password: </Text>


                            <TextInput

                                value={password}
                                onChangeText={onChangedPassword}
                                secureTextEntry={getPasswordVisible ? false : true}
                                autoCapitalize='none'
                                style={{

                                    width: '70%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',

                                }}>

                            </TextInput>
                            <TouchableOpacity
                                onPress={() => {
                                    setPasswordVisible(!getPasswordVisible)
                                }}
                                style={{
                                    right: 20
                                }}>

                                {getPasswordVisible ?

                                    <Icon
                                        color={'white'}
                                        size={25}
                                        name='eye-slash'
                                    /> :
                                    <Icon
                                        color={'white'}
                                        size={25}
                                        name='eye'
                                    />

                                }
                            </TouchableOpacity>




                        </View>

                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                                width: '40%',

                            }}> FirstName: </Text>


                            <TextInput
                                value={firstName}
                                onChangeText={onChangefirstName}
                                autoCapitalize='none'
                                style={{

                                    width: '60%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',

                                }}>

                            </TextInput>
                        </View>
                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                                width: '40%',

                            }}> LastName: </Text>


                            <TextInput
                                value={lastName}
                                onChangeText={onChangelastName}
                                autoCapitalize='none'
                                style={{

                                    width: '60%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',

                                }}>

                            </TextInput>
                        </View>

                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                                width: '30%',

                            }}> Phone Number: </Text>


                            <TextInput
                                value={phonenumber}
                                onChangeText={onChangePhonenumber}

                                autoCapitalize='none'
                                style={{

                                    width: '70%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',

                                }}>

                            </TextInput>
                        </View>

                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: 'white',
                                width: '30%',

                            }}> Address: </Text>


                            <TextInput
                                value={address}
                                onChangeText={onChangeAddress}
                                autoCapitalize='none'
                                style={{

                                    width: '70%',
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    color: 'white',
                                    textAlign: 'center',

                                }}>

                            </TextInput>
                        </View>

                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <TouchableOpacity
                                onPress={RegisterUser}
                                style={{
                                    borderColor: 'White'
                                    , borderWidth: 1
                                    , height: 70
                                    , width: 300
                                    , borderRadius: 50
                                    , marginHorizontal: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                    , backgroundColor: '#FFB9B9'


                                }}>


                                <Icon
                                    size={20}
                                    name={"user-plus"}
                                    style={{

                                        color: 'white',
                                        position: 'absolute',
                                        left: 25


                                    }} />
                                <Text style={{
                                    color: 'white',
                                    fontSize: 22,
                                    fontWeight: '600'

                                }}>  Register
                                </Text>

                            </TouchableOpacity>
                        </View>

                        <View style={{
                            width: '80%',
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'

                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                style={{
                                    borderColor: 'White'
                                    , borderWidth: 1
                                    , height: 40
                                    , width: 130
                                    , borderRadius: 50
                                    , marginHorizontal: 10
                                    , justifyContent: 'center'
                                    , alignItems: 'center'
                                    , backgroundColor: '#B9E0FF'


                                }}>


                                <Icon
                                    size={20}
                                    name={"backward"}
                                    style={{

                                        color: '#3E6D9C',
                                        position: 'absolute',
                                        left: 25


                                    }} />
                                <Text style={{
                                    color: '#3E6D9C',
                                    fontSize: 15,
                                    fontWeight: '400'

                                }}>  Return
                                </Text>

                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </ImageBackground>

        </View>

    )
}


