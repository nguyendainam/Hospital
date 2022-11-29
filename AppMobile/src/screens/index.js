import React, { Component } from "react";
import {
    Text, View, Image, ImageBackground, Button, SafeAreaView, StatusBar

} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WellcomeScreen from "./WellcomeScreen";
import SelectUser from "./selectUser";
import MainScreen from "./MainScreen";
import RegisterUser from "./RegisterUser";
import MainScreens from "./home/index"

// require('dotenv').config();

const Stack = createNativeStackNavigator();

export default class RootComponent extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (

            <View style={{
                flex: 100
            }}>

                <NavigationContainer>
                    <Stack.Navigator initialRouteName="WellcomeScreen" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="WellcomeScreen" component={WellcomeScreen} />
                        <Stack.Screen name="SelectUser" component={SelectUser} />
                        <Stack.Screen name="MainScreen" component={MainScreen} />
                        <Stack.Screen name="RegisterUser" component={RegisterUser} />

                        <Stack.Screen name="MainScreens" component={MainScreens} />

                    </Stack.Navigator>
                </NavigationContainer>
            </View>




        );
    }



}
//  RootComponent





