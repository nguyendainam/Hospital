import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import ProfileDrBooking from './ProfileDrBooking';
import moment from 'moment';
class BookSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataFromParent: '',
            Time: ''


        }
    }

    componentDidMount() {


        let data = this.props.route.params.data
        let timeType = this.props.route.params.Time
        console.log("data...........", data)
        console.log("timeType...............", timeType)

        this.setState({
            dataFromParent: data,
            Time: timeType

        })
    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const { Time } = this.state
        let timeSchedule, date, value = ''
        if (Time && Time.TimeTypeData && Time.date) {
            timeSchedule = Time.TimeTypeData.valueVi
            date = moment(+Time.date).format('dddd DD/MM/YYYY')
        }

        return (
            <>


                <View style={styles.main_bookSchedule}>
                    <ProfileDrBooking
                        id={this.state.dataFromParent}

                        idDoctor={this.props.route.params.data}
                    />


                    <View style={styles.timeSchedule}>
                        <Text style={styles.text}>Thời gian khám:</Text>
                        <Text style={styles.times}>{timeSchedule}</Text>
                    </View>
                    <View style={styles.timeSchedule}>
                        <Text style={styles.text}>Ngày:</Text>
                        <Text style={styles.times}>{date}</Text>
                    </View>
                </View>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

const styles = StyleSheet.create({
    text: {
        color: 'black'
    },
    times: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue',
        paddingLeft: 5
    },

    timeSchedule: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row'
    }

    , main_bookSchedule: {
        backgroundColor: ' white'
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(BookSchedule);
