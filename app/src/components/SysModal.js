import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';

const SysModal = ({ message, visible, onHide }) => {

    return (
        <Modal visible={visible} transparent={true} >
            <View style={styles.main}>

                <View style={styles.infor_sys}>
                    <Text style={styles.title}>THÔNG BÁO</Text>
                    <View style={styles.noidung}>
                        <Text style={styles.text_infor}>{message}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={onHide}
                    >
                        <View style={styles.button_infor}>

                            <Text>Đóng</Text>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    button_infor: {
        marginTop: 10,
        width: 120,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(8, 186, 158, 0.37)'

    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
    },
    main: {
        flex: 1,
        backgroundColor: 'rgba(141, 230, 201, 0.37)',
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    infor_sys: {
        marginBottom: 23,
        marginLeft: 10,
        marginRight: 10,
        height: 200,
        width: 350,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
    , noidung: {
        width: '100%',
        height: 100,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,


    },
    text_infor: {
        color: 'red'
    }



})

export default SysModal;
