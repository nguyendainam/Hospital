import React, { Component } from 'react';
import { connect } from "react-redux";
import './Clinic.scss'
import { FormattedMessage } from 'react-intl'
import Header from '../../Header/Header';


class Clinic extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        return (
            <>

                <Header />
                <div>Clinic</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
