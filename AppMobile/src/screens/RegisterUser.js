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


const windownWith = Dimensions.get('window').width
const windownHeight = Dimensions.get('window').height
const sex = ["Male", "FeMale"]
function RegisterUser(props) {

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

                            }}> FirstName: </Text>


                            <TextInput

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

                            }}> LastName: </Text>


                            <TextInput

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

                            }}> Sex: </Text>

                            <View>

                                <SelectDropdown
                                    data={sex}
                                    onSelect={(selectedItem, index) => {
                                        console.log(index)   // tra ve 0 hoac 1 
                                    }}


                                >

                                </SelectDropdown>
                            </View>
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

export default RegisterUser

