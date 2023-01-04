import { View, Text, TouchableOpacity, Switch } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

export default SettingsScreen = ({ navigation }) => {




    return (
        <SafeAreaView>
            <View>
                <Switch
                    style={{
                        alignSelf: 'flex-end', margin: 'auto'
                    }}

                />



            </View>


        </SafeAreaView>
    )
}

