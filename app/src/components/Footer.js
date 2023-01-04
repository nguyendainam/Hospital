import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Footer extends Component {
    render() {
        return (
            <View style={styles.main}>
                <Text>@DACN1_HOAHONG_DAINAM</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default Footer;
