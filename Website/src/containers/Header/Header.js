import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';


import { FormattedMessage } from 'react-intl'
class Header extends Component {
    handleChangLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (


            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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
