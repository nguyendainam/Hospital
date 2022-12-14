import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, DoctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { ROLE_USER } from '../../utils';

import { FormattedMessage } from 'react-intl'
import _ from 'lodash';
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    handleChangLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }

    componentDidMount = () => {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === ROLE_USER.ADMIN) {
                menu = adminMenu
            }

            if (role === ROLE_USER.DOCTOR) {
                menu = DoctorMenu
            }

        }
        this.setState({
            menuApp: menu
        })

        console.log('role', this.props.userInfo)

    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (


            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>


                {/* nút logout */}

                <div className='languages'>
                    <span >< FormattedMessage id={"home-header.Wellcome"} />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi  active ' : 'language-vi'}><span onClick={() => this.handleChangLanguage(LANGUAGES.VI)} >VN</span></span>
                    <span className={language === LANGUAGES.EN ? 'language-en  active ' : 'language-en'}><span onClick={() => this.handleChangLanguage(LANGUAGES.EN)} >EN</span></span>

                    <div className="btn btn-logout" onClick={processLogout} title='log out' >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>


                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
