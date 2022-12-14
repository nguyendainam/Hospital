import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Home/headerHome';
import TopDoctor from '../../components/Home/TopDoctor';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {

        return (
            <View>
                <Header />
                <TopDoctor navigation={this.props.navigation} />

            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default Home;
