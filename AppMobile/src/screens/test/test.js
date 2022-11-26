import React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";

function TestScreen(props) {

    return (
        <View style={{
            flex: 100,
            marginLeft: 10,
            marginRight: 10,
        }}>

            <Text> WELLCOM TEST</Text>
            <TouchableOpacity>
                <Text>GET DATA</Text>
            </TouchableOpacity>

        </View >
    )
}

export default TestScreen