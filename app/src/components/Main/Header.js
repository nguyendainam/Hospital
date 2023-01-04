import { View, Text, ImageBackground, Image, } from 'react-native'
import React from 'react'
import images from '../../constants/images'


const Header = () => {

    return (
        <View style={{
            width: '100%',
            height: 300,
            backgroundColor: "pink",
        }}>
            <ImageBackground
                style={{
                    width: "100%",
                    height: '100%',
                }}
                source={images.bg_main}
                resizeMode="cover"
            >
                <View style={{
                    paddingTop: 10,
                    paddingLeft: 10,

                }}>
                    <Image
                        source={images.in4}
                        style={{
                            marginHorizontal: 5,
                            width: 70,
                            height: 70,
                            borderRadius: 50,

                        }}></Image>


                </View>

                <View style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingBottom: 10

                }}>
                    <Text style={{
                        fontSize: 30, fontWeight: 'bold', color: 'black', fontFamily: "lucida grande",


                    }}  >WELLCOME! </Text>
                    <Text style={{
                        fontSize: 20, fontWeight: 'bold', color: 'black', fontFamily: "lucida grande",


                    }}>To Heart Hospital </Text>
                    <Text>Have a nice day!!    </Text>

                </View>



            </ImageBackground>



        </View>
    )
}

export default Header