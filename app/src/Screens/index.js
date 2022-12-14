import React, { Component } from "react";
import {
    Text, View, Image, ImageBackground, Button, SafeAreaView, StatusBar

} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectUser from "./selectUser";
import Login from "./Login";
import Home from "./home/Home";

import { Provider } from "react-redux";
import store from "../store/store";
import authReducer from "../store/reducers/authReduser";
import { combineReducers, createStore } from "redux";
import Tab from '../screens/Tabs/Tab'
import WellcomeScreen from "./WellcomeScreen";
import Infor from "../components/Doctor/informationDoctor";
import Register from "./home/Register";
const Stack = createNativeStackNavigator();

const rootReducer = combineReducers({
    userInfor: authReducer
})

export default class RootComponent extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="WellcomeScreen" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="WellcomeScreen" component={WellcomeScreen} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SelectUser" component={SelectUser} />
                        <Stack.Screen name="Tab" component={Tab} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Infor" component={Infor} />
                        <Stack.Screen name="Register" component={Register} />



                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>

        );
    }



}
//  RootComponent





