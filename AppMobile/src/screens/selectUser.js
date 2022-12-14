import React, { Component, useState } from 'react';
import {
    Text,
    View,
    Image, ImageBackground,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from 'react-native';

import LoginComponents from '../components/LoginComponents';
import { images } from '../constants/indexConstants';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const baseurl = process.env['REACT_APP_URL']

export default SelectUser = () => {

    const navigation = useNavigation()


    const [getPasswordVisible, setPasswordVisible] = useState(false)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, seterrMessage] = useState("")





    const onChangedEmail = (value) => {
        setemail(value)
    }
    const onChangedPassword = (value) => {
        setpassword(value)
    }

    // HIDE information
    const onHideModal = () => {
        setShowModal(false)
    }


    const onClickLogin = async () => {
        if (!email || !password) {
            seterrMessage("Please input login information")
            setShowModal(true)

            return;
        }
        console.log('Địa chỉ URL đang sử dụng', baseurl)
        await axios({
            url: `${baseurl}/api/login`,
            method: 'POST',
            data: {
                email: email,
                password: password,
            },
        }).then(result => {


            const currentUser = result.data.user
            console.log(result.data)
            seterrMessage("" + result.data.message);

            if (result.data.errCode == 0) {
                AsyncStorage.setItem("email", currentUser.email)
                AsyncStorage.setItem("roleId", currentUser.roleId)
                AsyncStorage.setItem("firstName", currentUser.firstName)
                AsyncStorage.setItem("lastName", currentUser.lastName)
                navigation.navigate('MainScreens')
                // navigation.navigate('MainScreen')
                // AsyncStorage.clear()
                // // ridirect to Home
                


            } else {
                setShowModal(true)
                seterrMessage("" + result.data.message)
            }
        })

            .catch(e => {
                // console.log(data.message)
                seterrMessage(e.response.data.message);
                setShowModal(true)
                // seterrMessage = data.message;
            });

    }


    return (
        <View style={{
            flex: 100
        }}>
            {/* THONG BAO VE DANG NHAP */}
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
                            fontSize: 30

                        }}> YourHeart</Text>

                    </View>



                </View>



                {/* +++++++++++++++++++ iput ++++++++++++++++++++ */}
                <View style={{
                    flex: 70,
                    height: '100%',
                    marginTop: 100
                    // marginTop: 0.2 * windownHeight,

                }}>
                    {/* =====================================  */}
                    <View style={{
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

                                    width: '70%',
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
                    </View>


                </View>
                {/* +++++++++++++++++++ LOGIN ++++++++++++++++++++ */}
                <View style={{
                    flex: 5,

                    paddingTop: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


                    <View style={{
                        flexDirection: 'row',
                    }}>

                        <TouchableOpacity
                            onPress={onClickLogin}
                            style={{
                                borderColor: 'White'
                                , borderWidth: 1
                                , height: 70
                                , width: 300
                                , borderRadius: 50
                                , marginHorizontal: 10
                                , justifyContent: 'center'
                                , alignItems: 'center'
                                , backgroundColor: '#FFACC7'


                            }}>


                            <Icon
                                size={20}
                                name={"user"}
                                style={{

                                    color: 'white',
                                    position: 'absolute',
                                    left: 25


                                }} />
                            <Text style={{
                                color: 'white',
                                fontSize: 22,
                                fontWeight: '600'

                            }}>  Login
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={{
                        paddingTop: 10
                    }}>
                        <TouchableOpacity

                            onPress={() => {
                                navigation.navigate('RegisterUser')
                            }}
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




                </View>
                {/* ++++++++++++++++++++++++++++++++++++++++++ */}
                <View style={{
                    flex: 40,

                }}>

                </View>






            </ImageBackground>






        </View>
    );

}

