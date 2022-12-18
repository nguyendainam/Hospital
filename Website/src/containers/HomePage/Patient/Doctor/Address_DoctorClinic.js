import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../Header/Header'
import './Address_DoctorClinic.scss'
import { getDetailsInforDoctor } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import Footer from '../../Footer/Footer'
class Address_DoctorClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {


        return (
            <>
                <div className='mainsClinic_doctor'>
                    Address_DoctorClinic
                </div>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address_DoctorClinic);
