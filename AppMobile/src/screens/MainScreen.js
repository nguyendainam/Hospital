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
import Header from '../components/Main/Header'
import Solution from '../components/Main/Solution'
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
function MainScreen(props) {

    return (
        <View style={{
            flex: 100,
            backgroundColor: 'white'
        }}>

            <ScrollView >
                {/* ===========  ============  */}
                <Header />
                {/* ===========  ============  */}



                <View style={{
                    flex: 20,

                }}>

                    <Text style={{
                        fontSize: 30,
                        width: '100%',
                        paddingLeft: 20,
                        fontWeight: 'bold',
                        color: 'pink'
                    }}>Find Your</Text>
                    <Text style={{
                        fontSize: 30,
                        paddingLeft: 20,
                        fontWeight: '500',
                        color: 'pink',
                        borderColor: 'white'
                    }}>Media solution!</Text>

                </View>


                {/* ===========  ============  */}
                <Solution />
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