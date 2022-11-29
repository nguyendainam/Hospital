import React from "react"
import {
    View, Text, Touchable, TouchableOpacity, ScrollView,
    Dimensions, Image,
} from 'react-native'

import HomeScreens from './InforHeader'

function MainScreens() {

    return (
        <View style={{
            flex: 100,
            marginLeft: 10,
            marginRight: 10,
        }}>
            <ScrollView >



                <View>
                    <HomeScreens />
                </View>




            </ScrollView>
        </View >



    )
}



export default MainScreens