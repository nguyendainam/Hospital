import React, { Component } from 'react';
import './style_Footer.scss'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

class Footer extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='main-footer'>
                    <p>&copy; 2015 DoAnChuyenNghanh1_HoaHong_DaiNam.com</p>

                </div>

            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changLanguageAppRedux: (language) => dispatch(changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
