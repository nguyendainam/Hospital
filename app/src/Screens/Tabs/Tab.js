

import { View, Text, Image } from 'react-native'
import React from 'react'
import Home from "../home/Home";
import Profile from "../home/Profile"
import Schedule from '../home/Schedule'
import informationDoctor from '../../components/Doctor/informationDoctor';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="MainScreen" component={Home} options={{
                tabBarIcon: () => (
                    <Image source={require("../../picture/home_icon.png")} style={{ width: 30, height: 30, tintColor: "pink" }} resizeMode="stretch" />
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: () => (
                    <Image source={require("../../picture/user_icon.png")} style={{ width: 30, height: 30, tintColor: "pink" }} resizeMode="stretch" />
                )
            }} />
            <Tab.Screen name="Schedule" component={Schedule}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../../picture/alarm_icon.png")} style={{ width: 30, height: 30, tintColor: "pink" }} resizeMode="stretch" />
                    )
                }} />

        </Tab.Navigator>
    );
}


