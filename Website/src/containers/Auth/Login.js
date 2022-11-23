import React, { Component, DetailedHTMLFactory, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    // 
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                // neu dang nhap thanh cong goi lam LOGIN_USER_SUCCESS
                this.props.userLoginSuccess(data.user)
                console.log('success')

            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }

    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group text-form'>
                            <text>UserName:</text>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your usename'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className='col-12 form-group text-form '>
                            <text>Password:</text>
                            <input type='password'
                                className='form-control'
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                            />
                        </div>
                        <div className='col-12 text-center' style={{ color: 'red', }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 btn-login'>
                            <button className=' button-login' onClick={() => {
                                this.handleLogin()
                            }} >Login</button>
                        </div>
                        <div className='col-12 mt-3 '>
                            <span className='forgot-pass ' > Forgot the password</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-login_other'>Or Login With</span>
                        </div>
                        <div className='col-12 text-center icon mt-3'>
                            <i className="fab fa-google google" ></i>
                            <i className="fab fa-facebook facebook" />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
