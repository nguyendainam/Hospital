import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Home/headerHome';
import TopDoctor from '../../components/Home/TopDoctor';
import Specialties from '../../components/Home/Specialties';
import Clinic from '../../components/Home/Clinic';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {

        return (
            <>

                <ScrollView >
                    <View>
                        <Header />
                        <Clinic navigation={this.props.navigation} />
                        <TopDoctor navigation={this.props.navigation} />
                        <Specialties navigation={this.props.navigation} />


                    </View>
                </ScrollView>

            </>
        );
    }
}

const styles = StyleSheet.create({})

export default Home;
