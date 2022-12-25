import React, { Component } from 'react';
import { connect } from "react-redux";
import './Specialties.scss'
import { FormattedMessage } from 'react-intl'
import Header from '../../Header/Header';


class Specialties extends Component {


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
                <div>specialties</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
