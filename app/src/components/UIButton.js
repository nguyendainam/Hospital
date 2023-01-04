import React from 'react';
import {
    Text,
    View,
    Image, ImageBackground,
    Button,
    TouchableOpacity,


} from 'react-native';


function UIButton(props) {

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                borderColor: 'White'
                , borderWidth: 1
                , height: 70
                , width: 200
                , borderRadius: 50
                , marginHorizontal: 10
                , justifyContent: 'center'
                , alignItems: 'center'
                , backgroundColor: '#2C3333'


            }}>
            <Text style={{
                color: 'white',
                fontSize: 22,
                fontWeight: '600'

            }}>GET STARTED</Text>

        </TouchableOpacity>
    )
}
export default UIButton