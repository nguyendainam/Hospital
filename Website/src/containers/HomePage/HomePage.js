import React, { Component } from 'react';

import { connect } from 'react-redux';
import Header from './Header/Header.js'

class HomePage extends Component {

    render() {

        return (
            <div>
                <Header />
                <div>
                    this is a  HomePage
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
