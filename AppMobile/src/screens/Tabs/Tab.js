import { View, Text, Image } from 'react-native'
import React from 'react'
import MainScreen from "../MainScreen";
import SettingsScreen from "../SettingsScreen"
import Profile from "../Profile"
import Schedule from "../Schedule"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="MainScreen" component={MainScreen} options={{
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
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("../../picture/setting_icon.png")} style={{ width: 30, height: 30, tintColor: "pink" }} resizeMode="stretch" />
                    )
                }} />
        </Tab.Navigator>
    );
}


