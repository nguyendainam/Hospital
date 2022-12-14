import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'

import { LANGUAGES } from '../../untils/constant'



class ScreenSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'vi',

        };
    }




    handleChangLanguage = (language) => {
        this.props.changLanguageApp(language)
    }

    render() {

        const { language } = this.props
        console.log('language', language)


        return (
            <View style={styles.main_setting}>
                <Text>{I18n.t(`st`)}</Text>
                <View style={styles.main_content_setting}>
                    <View style={styles.setting_1}>
                        <Text style={styles.setting_title_1}> Language</Text>

                        <TouchableOpacity

                            style={styles.button_language}
                            onPress={() => this.handleChangLanguage(LANGUAGES.VI)}
                        >
                            <Text>VI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity

                            style={styles.button_language}
                            onPress={() => this.handleChangLanguage(LANGUAGES.EN)} >
                            <Text>EN</Text>
                        </TouchableOpacity>
                    </View>


                </View>


            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    language: state.appReduser.language
})

const mapDispatchToProps = dispatch => {
    return {
        changLanguageApp: (language) => dispatch(action.changLanguageApp(language))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSetting)

const styles = StyleSheet.create({

    button_language: {
        width: 30

    },

    main_setting: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    main_content_setting: {
        width: 500,
        height: 700,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    setting_1: {
        marginTop: 20,
        width: 350,
        height: 70,
        backgroundColor: 'blue',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setting_title_1: {
        paddingRight: 100,
        fontSize: 25
    }
})



