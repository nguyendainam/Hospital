import { Text, StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import MainProfile from '../../components/Profile/mainProfile'



class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }


    render() {
        const { loaddingUser, dataUser, logout_user } = this.props
        console.log(loaddingUser)


        Login = () => {
            this.props.navigation.navigate('Login')
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title_profile}>Profile</Text>
                {loaddingUser ?
                    <View style={styles.content_infor}>


                        <View style={styles.image_user}>

                        </View>
                        <View style={styles.userInfor_content}>
                            <View>
                                <Text>{dataUser.userInfor.email}</Text>
                            </View>
                            <View>
                                <Text>{dataUser.userInfor.firstName}{dataUser.userInfor.lastName}</Text>
                            </View>
                        </View>

                        <View style={styles.form_logout}>
                            <TouchableOpacity onPress={logout_user}>
                                <Text>Log out</Text>
                            </TouchableOpacity>
                        </View>




                    </View>
                    :
                    <View style={styles.content_infor}>
                        <Text>Bạn chưa đăng nhập ? </Text>
                        <TouchableOpacity onPress={Login}>
                            <Text>Đăng Nhập</Text>

                        </TouchableOpacity>

                    </View>
                }

                <MainProfile
                    navigation={this.props.navigation}
                />


            </View>
        )
    }
}




const styles = StyleSheet.create({

    container: {
        width: '100%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 10,

    },

    form_logout: {
        paddingLeft: 70
    },
    content_infor: {
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 2,
        marginTop: 10,
        backgroundColor: '#CDF0EA',
        borderColor: 'pink'


    },

    userInfor_content: {
        display: 'flex',
        // flexDirection: 'column-reverse',
        paddingLeft: 20,

    },

    title_profile: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },

    image_user: {
        width: 50,
        height: 50,
        backgroundColor: '#EEEFEE',
        marginLeft: 10,
        borderRadius: 50,
    },

    form_inforUser: {
        width: '100%',
        height: 170,

    }
})



const mapStateToProps = (state) => {
    return {
        loaddingUser: state.authReducer.isloading,
        dataUser: state.authReducer

    }
}

const mapDispatchToProps = dispatch => ({
    logout_user: () => dispatch(action.Logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
