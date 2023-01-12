import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import image from '../../constants/images'
import ScreenSetting from './ScreenSetting'
import { useNavigation } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux'
class mainProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }


    render() {
        const { loaddingUser, dataUser, logout_user } = this.props
        console.log(loaddingUser)

        console.log(".......main Profile...", loaddingUser)

        return (
            <View style={styles.main_Profile}>
                <View style={styles.title_profile}>
                    <Text style={styles.text_tittle}>General </Text>
                </View>
                {loaddingUser === false ?
                    <View style={styles.form_all_button}>
                        <TouchableOpacity style={styles.form_button}>
                            <View style={styles.image_user}>
                                <Image source={image.icon_cus} style={styles.icon_mainProfile} />
                            </View>
                            <View style={styles.userInfor_content}>
                                <Text style={styles.title_profile_1}>Theo Dõi lịch khám</Text>
                                <Text>Đăng nhập để theo dõi lịch khám</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    : <View style={styles.form_all_button}>
                        <TouchableOpacity style={styles.form_button}
                            onPress={() => this.props.navigation.push('PatientSchedule')}
                        >
                            <View style={styles.image_user}>
                                <Image source={image.icon_cus} style={styles.icon_mainProfile} />
                            </View>
                            <View style={styles.userInfor_content}>
                                <Text style={styles.title_profile_1}>Theo Dõi lịch khám</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                }


            </View>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        loaddingUser: state.authReducer.isloading,
        dataUser: state.authReducer

    }
}

const mapDispatchToProps = dispatch => ({
    logout_user: () => dispatch(action.Logout())
})
const styles = StyleSheet.create({
    main_Profile: {
        marginTop: 20,
        paddingTop: 20,
        width: '100%',
        height: 500,

    },

    title_profile: {
        width: '100%',
        paddingLeft: 20,
        height: 50,

    },

    icon_mainProfile: {
        width: '80%',
        height: '80%',
        margin: 'auto'
    },
    form_all_button: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_tittle: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: '700',
        color: 'black'

    }
    , form_button: {
        width: '95%'
        , height: 80,
        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
    },
    image_user: {
        width: 50,
        height: 50,
        backgroundColor: '#EFEFEF',
        marginLeft: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    userInfor_content: {
        display: 'flex',
        // flexDirection: 'column-reverse',
        paddingLeft: 20,

    }, title_profile_1: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: 'black'
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(mainProfile)