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


import { images } from '../constants/indexConstants';
import Icon from 'react-native-vector-icons/FontAwesome'


const windownWith = Dimensions.get('window').width
const windownHeight = Dimensions.get('window').height


export default SelectUser = ({ navigation }) => {
    const [getPasswordVisible, setPasswordVisible] = useState(false)

    return (
        <View style={{
            flex: 100
        }}>

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

                {/* +++++++++++++++++++ LOGIN ++++++++++++++++++++ */}
                <View style={{
                    flex: 80,
                    marginTop: 0.2 * windownHeight,

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
                    flex: 10,


                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


                    <View style={{
                        flexDirection: 'row',
                    }}>

                        <TouchableOpacity style={{
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

