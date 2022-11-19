import React from "react";
import {
    Text, View, Image, ImageBackground, Button, SafeAreaView, StatusBar

} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WellcomeScreen from "./WellcomeScreen";
import SelectUser from "./selectUser";
import MainScreen from "./MainScreen";
import RegisterUser from "./RegisterUser";


const Stack = createNativeStackNavigator();

export default RootComponent = function () {
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
                </Stack.Navigator>
            </NavigationContainer>
        </View>




    )
}