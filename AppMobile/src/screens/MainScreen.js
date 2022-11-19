import React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import images from "../constants/images";
import Icon from 'react-native-vector-icons/FontAwesome5'


let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
function MainScreen(props) {

    return (
        <View style={{
            flex: 100,
            marginLeft: 10,
            marginRight: 10,
        }}>

            <ScrollView >

                {/* =========== Hello  ============  */}
                <View style={{
                    flex: 20,

                    flexDirection: 'row',
                    paddingTop: 5,
                }}>
                    <View
                        style={{
                            width: '50%',

                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <View style={{
                        }}>

                            <Image
                                source={images.userImage}
                                style={{
                                    marginHorizontal: 5,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,

                                }}></Image>
                        </View>
                        <Text>Hello, Name gì gì đó </Text>


                    </View>

                    <View style={{
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'flex-end',

                    }}>
                        <View>
                            <TouchableOpacity >
                                <Icon name="search"
                                    color={'#FF97C1'}
                                    size={25}
                                    style={{

                                    }}> </Icon>
                            </TouchableOpacity>

                        </View>


                    </View>

                </View>

                {/* ===========  ============  */}
                <View style={{
                    flex: 20,

                }}>

                    <Text style={{
                        fontSize: 30,
                        width: '100%',
                        paddingLeft: 20,
                        fontWeight: 'bold',
                        color: '#5CB8E4'
                    }}>Find Your</Text>
                    <Text style={{
                        fontSize: 30,
                        paddingLeft: 20,
                        fontWeight: '500',
                        color: '#5CB8E4'
                    }}>Media solution!</Text>

                </View>
                {/* ===========  ============  */}
                <View style={{
                    flex: 30,

                    alignItems: 'center'
                }}>
                    <View
                        style=
                        {{
                            flexDirection: 'row'
                        }}>
                        {/* BUTTON DOCTOR */}
                        <View >
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.iconDoctor}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 50,
                                        height: 60,

                                    }} />
                                <Text>Doctor</Text>
                            </TouchableOpacity>
                        </View>
                        {/* BUTTON HOSPITAL */}
                        <View>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.iconHospital}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 60,
                                        height: 60,

                                    }} />
                                <Text>Hospital</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Booking HOSPITAL */}
                        <View >
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.schedule}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 60,
                                        height: 60,

                                    }} />
                                <Text>Schedule</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style=
                        {{

                            flexDirection: 'row'
                        }}>
                        {/* BUTTON Ambulance */}
                        <View >
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.ambulance}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 60,
                                        height: 60,

                                    }} />
                                <Text>Ambulance</Text>
                            </TouchableOpacity>
                        </View>
                        {/* BUTTON Consultation */}
                        <View >
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.consultation}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 60,
                                        height: 60,

                                    }} />
                                <Text>Consultation</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Button Pharmacy */}
                        <View >
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'
                                    , justifyContent: 'center'
                                }}
                            >
                                <Image source={images.pharmace}
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        width: 60,
                                        height: 60,

                                    }} />
                                <Text>Pharmacy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {/* ===========  ============  */}
                <View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '800',
                        color: '#2146C7'
                    }}> Specialties</Text>
                    <View style={{
                        flex: 20,
                        backgroundColor: '#B9E0FF',
                        marginTop: 20
                        // flexDirection: 'row'
                    }}>

                        {/* ======================================================================================================= */}
                        <ScrollView horizontal={true}>


                            <View>
                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#E8F9FD',

                                        borderRadius: 20,
                                        margin: 10,
                                        alignItems: 'center'
                                        , justifyContent: 'center'
                                    }}
                                >
                                    <Image source={images.iconDoctor}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            width: 50,
                                            height: 60,

                                        }} />
                                    <Text>Doctor</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#E8F9FD',

                                        borderRadius: 20,
                                        margin: 10,
                                        alignItems: 'center'
                                        , justifyContent: 'center'
                                    }}
                                >
                                    <Image source={images.iconDoctor}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            width: 50,
                                            height: 60,

                                        }} />
                                    <Text>Doctor</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#E8F9FD',

                                        borderRadius: 20,
                                        margin: 10,
                                        alignItems: 'center'
                                        , justifyContent: 'center'
                                    }}
                                >
                                    <Image source={images.iconDoctor}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            width: 50,
                                            height: 60,

                                        }} />
                                    <Text>Doctor</Text>
                                </TouchableOpacity>
                            </View>
                            {/* BUTTON HOSPITAL */}
                            <View>
                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#E8F9FD',

                                        borderRadius: 20,
                                        margin: 10,
                                        alignItems: 'center'
                                        , justifyContent: 'center'
                                    }}
                                >
                                    <Image source={images.iconHospital}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            width: 60,
                                            height: 60,

                                        }} />
                                    <Text>Hospital</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Booking HOSPITAL */}
                            <View >
                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black',
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#E8F9FD',

                                        borderRadius: 20,
                                        margin: 10,
                                        alignItems: 'center'
                                        , justifyContent: 'center'
                                    }}
                                >
                                    <Image source={images.schedule}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            width: 60,
                                            height: 60,

                                        }} />
                                    <Text>Schedule</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>


                    </View >
                </View>
                {/* ===========  LISTTT DOCTOR============  */}
                <View View style={{
                    flex: 30,

                }
                }>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '800',
                        color: '#2146C7'
                    }}> Top Doctors</Text>
                    <ScrollView horizontal={true}>


                        <View>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    width: 200,
                                    height: 300,
                                    backgroundColor: '#E8F9FD',

                                    borderRadius: 20,
                                    margin: 10,
                                    alignItems: 'center'

                                }}
                            >
                                <Image source={images.doctorimage}
                                    style={{
                                        marginTop: 20,
                                        width: '80%',
                                        height: '60%',

                                    }} />
                                <Text>Doctor Name: ABC </Text>
                                <Text>Chuyên Khoa: gì gì đó</Text>
                                <Text>Doctor</Text>
                            </TouchableOpacity>
                        </View>





                    </ScrollView>
                </View >


            </ScrollView>
        </View >
    )
}

export default MainScreen