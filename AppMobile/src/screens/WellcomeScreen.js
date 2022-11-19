import React from 'react';
import {
    Text,
    View,
    Image, ImageBackground,
    Button,
    TouchableOpacity,


} from 'react-native';

import { UIButton } from '../components/index'
import { images } from '../constants/indexConstants'

function WellcomeScreen({ props, navigation }) {
    return <View style={{
        backgroundColor: 'blue',
        flex: 100,

    }}>
        <ImageBackground
            source={images.backgroundApp}
            resizeMode='cover'
            style={{
                flex: 100,
                justifyContent: 'center'
            }}
        >


            <View style={{
                flex: 10,

            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 60,
                    paddingLeft: 25,
                    paddingTop: 25,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Image source={images.logoApp}
                        style={{
                            marginHorizontal: 5,
                            width: 50,
                            height: 50,
                        }}
                    />

                    <Text style={{
                        color: 'white',
                        fontSize: 30

                    }}> YourHeart</Text>

                </View>

            </View>
            <View style={{
                flex: 20,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 40, color: 'white', fontStyle: 'italic', fontWeight: '900' }}> Striving  to  improve</Text>
                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}> community health </Text>
                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}> care and practices </Text>

            </View>
            <View style={{
                flex: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* ++++++++++++++++++++++++++++++++++++++++++ */}


                <UIButton
                    onPress={() => { navigation.navigate('SelectUser') }}
                />



            </View>
            {/* ++++++++++++++++++++++++++++++++++++++++++ */}
            <View style={{
                flex: 40,

            }}>

            </View>






        </ImageBackground>






    </View>
}

export default WellcomeScreen