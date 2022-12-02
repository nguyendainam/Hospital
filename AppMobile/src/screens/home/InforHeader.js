import {
    View, Text, Touchable, TouchableOpacity, ScrollView,
    Dimensions, Image,
} from 'react-native'
import React, { useState, useEffect, Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import images from "../../constants/images";
import Icon from 'react-native-vector-icons/FontAwesome5'
InforHeader = () => {

    const [email, setemail] = useState("")
    const [roleId, setroleId] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const navigation = useNavigation()

    useEffect(() => {

        // get email user
        AsyncStorage.getItem("email").then(result => {
            setemail(result)
        })

        AsyncStorage.getItem("roleId").then(result => {
            setroleId(result)
        })

        AsyncStorage.getItem("firstName").then(result => {
            setfirstName(result)
        })

        AsyncStorage.getItem("lastName").then(result => {
            setlastName(result)
        })

    }, []);

    const logout = () => {
        AsyncStorage.clear()
        navigation.replace('SelectUser')
    }
    return (
        <View >

            {/* <Text>{email} {roleId} {firstName} {lastName} </Text> */}

            <TouchableOpacity onPress={logout}>
                <Text>Log out</Text>
            </TouchableOpacity>


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
                    <Text>{firstName} </Text>


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

        </View>
    )
}

export default InforHeader