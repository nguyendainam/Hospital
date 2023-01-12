import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { MapStateToProps } from 'react-redux'

import { HandleLogin } from '../service/UserService'

import SysModal from '../components/SysModal'
import * as action from '../store/actions/index'
import images from '../constants/images'

const baseurl = process.env['REACT_APP_URL']
console.log('localhost dang su dung:  ', baseurl, '/api/login')



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            userLogin: false,
            errMessage: '',
            showPassword: false,
            ShowModal: false
        };
    }


    inputChangedHandle = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    buttonEye = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
        console.log('show password', this.state.showPassword)
    }




    render() {

        // // const { navigation } = this.props;
        LoginInput = async () => {
            const { email, password } = this.state;
            console.log(this.state)

            if (!email || !password) {
                this.setState({
                    errMessage: 'Không được để trống thông tin',
                    ShowModal: true
                })
            }
            await axios({
                url: `${baseurl}/api/patient-login`,
                method: 'POST',
                data: {
                    email: email,
                    password: password,
                },
            }).then(response => {
                const currentUser = response.data.user

                if (response.data.errCode === 0) {
                    this.setState({ userLogin: true })
                    this.props.userLoginSuccess(currentUser)
                    this.props.navigation.navigate('Tab')

                } if (response.data.errCode !== 0) {
                    this.setState({
                        errMessage: response.data.errMessage,
                        ShowModal: true
                    })

                }




            }).catch(e => {
                console.log(e)
            });


        }
        OnHideNotification = () => {
            this.setState({
                ShowModal: false
            })
        }

        return (
            <View style={styles.mainscreen}>
                <SysModal message={this.state.errMessage} visible={this.state.ShowModal} onHide={OnHideNotification} />
                <View style={styles.title_input} >
                    <Text style={styles.title}>Đăng Nhập</Text>

                </View>

                <View style={styles.part_input}>
                    <View style={styles.form_login}>
                        <Text style={styles.text_form} > Email: </Text>

                        <TextInput
                            style={styles.form_input}
                            value={this.state.email}
                            onChangeText={this.inputChangedHandle.bind(this, "email")}
                        ></TextInput>
                    </View>
                    <View style={styles.form_login}>
                        <Text style={styles.text_form}>Password: </Text>

                        <TextInput style={styles.form_input}
                            value={this.state.password}
                            onChangeText={this.inputChangedHandle.bind(this, "password")}
                            secureTextEntry={this.state.showPassword ? false : true}

                        ></TextInput>
                        <TouchableOpacity onPress={() => this.buttonEye()}>
                            <Image source={this.state.showPassword ? images.eye : images.hide}
                                style={styles.eyeicon} />

                        </TouchableOpacity>

                    </View>

                    <View style={styles.part_login}>
                        <TouchableOpacity
                            onPress={LoginInput}
                            style={styles.button_login}>
                            <Text>Đăng nhập</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.link_register}>
                        <View>
                            <Text>Bạn chưa có tài khoản? </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('Register') }}
                            >
                                <Text style={{ color: 'blue' }}>Đăng Ký </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </View>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
    userLoginSuccess: (data) => dispatch(action.userLoginSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({

    link_register: {
        marginTop: 20,
        marginLeft: 150,
        width: '70%',
        height: 30,
        display: 'flex',
        flexDirection: 'row'
    },

    eyeicon: {
        width: 30,
        height: 30,
        marginRight: 20,
        right: 0,
        color: 'white',

    },
    mainscreen:
    {
        flex: 100,
        justifyContent: 'center',



    },

    part_login: {
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 5
    },


    button_login: {
        borderColor: 'White'
        , height: 60
        , width: 150
        , borderRadius: 30
        , marginHorizontal: 10
        , justifyContent: 'center'
        , alignItems: 'center'
        , backgroundColor: '#B9FFF8'
    },

    title_input: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },

    title: {
        fontSize: 30,
    },

    part_input: {

        // flex: 40,
        marginLeft: 10,
        marginRight: 10,
        height: 300,
        borderRadius: 40,
        backgroundColor: '#A7D2CB',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'


    },

    form_login: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text_form: {
        width: '40%',
        fontStyle: "italic",
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',

    },
    form_input: {
        width: '60%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        textAlign: 'center',
    }



})



