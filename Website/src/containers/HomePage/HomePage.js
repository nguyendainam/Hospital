import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header.js'
import Specialty from './section/Specialty.js';
import MedicalFacility from './section/MedicalFacility.js';
import Handbook from './section/Handbook.js';
import './HomePage.scss'
import Doctor_OutStanding from './section/Doctor_OutStanding.js';
import Footer from './Footer/Footer.js';
import BottomHeader from './Header/BottomHeader.js';
class HomePage extends Component {

    render() {

        return (
            <div>
                <Header />
                <BottomHeader />

                <MedicalFacility />
                <Specialty />
                <Doctor_OutStanding />
                {/* <Handbook /> */}

                <Footer />

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
