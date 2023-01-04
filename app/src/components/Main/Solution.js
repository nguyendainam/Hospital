import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import images from "../../constants/images";
import React from 'react'

const Solution = () => {
    return (
        <View>

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

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',

                                borderRadius: 20,
                                margin: 10,
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}
                        >
                            <Image source={images.iconDoctor}
                                style={{
                                    // backfaceVisibility: 'hidden',
                                    width: '70%',
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }} >Khám Chuyên Khoa </Text>
                        </TouchableOpacity>
                    </View>
                    {/* BUTTON HOSPITAL */}
                    <View>
                        <TouchableOpacity
                            style={{

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',

                                borderRadius: 20,
                                margin: 10,
                                alignItems: 'center'
                                , justifyContent: 'center'
                            }}
                        >
                            <Image source={images.iconHospital}
                                style={{
                                    width: '70%',
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }}>Khám Từ Xa</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Booking HOSPITAL */}
                    <View >
                        <TouchableOpacity
                            style={{

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',

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
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }}>Khám Tổng Quát</Text>
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

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',
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
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }}>Xét Nghiệm</Text>
                        </TouchableOpacity>
                    </View>
                    {/* BUTTON Consultation */}
                    <View >
                        <TouchableOpacity
                            style={{

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',

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
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }}>Sức Khỏe Tinh Thần</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Button Pharmacy */}
                    <View >
                        <TouchableOpacity
                            style={{

                                width: 100,
                                height: 120,
                                backgroundColor: 'white',

                                borderRadius: 20,
                                margin: 10,
                                alignItems: 'center'
                                , justifyContent: 'center'
                            }}
                        >
                            <Image source={images.pharmace}
                                style={{
                                    backfaceVisibility: 'hidden',
                                    width: 70,
                                    height: "70%",

                                }} />
                            <Text style={{
                                width: '100%',
                                height: '30%',
                                textAlign: 'center',
                                fontWeight: '700'

                            }}>Nha Khoa</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default Solution