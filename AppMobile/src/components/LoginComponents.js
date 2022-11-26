import React from 'react'
import { View, Text, Modal, TouchableOpacity, LinearGradient } from 'react-native'

function LoginComponents({ message, visible, onHide }) {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={{
                flex: 1,
                backgroundColor: 'rbga(00,00,00,.5)',
                justifyContent: 'center',
                alignItems: 'center'

            }}>
                <View style={{
                    width: '100%',
                    borderRadius: 20,
                    backgroundColor: 'white',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    {/* TITLE */}
                    <View style={{
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: 'black'
                        }}> Modal</Text>
                    </View>
                    {/* CONTENT */}
                    <View>
                        <Text>
                            {message}
                        </Text>
                    </View>
                    {/* BUTTON */}
                    <View style={{
                        paddingTop: 20
                    }}>
                        <TouchableOpacity
                            onPress={onHide}
                            style={{
                                borderColor: 'White'
                                , borderWidth: 1
                                , height: 70
                                , width: 200
                                , borderRadius: 50
                                , marginHorizontal: 10
                                , justifyContent: 'center'
                                , alignItems: 'center'
                                , backgroundColor: '#D23369'
                            }}
                        >

                            <Text >Close</Text>

                        </TouchableOpacity>
                    </View>


                </View>

            </View>

        </Modal>
    )
}

export default LoginComponents