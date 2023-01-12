import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { Dimensions } from "react-native"
import DoctorClinic from './DoctorClinic';

const baseurl = process.env['REACT_APP_URL']
class MainClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }
    }

    async componentDidMount() {
        this.getAllDoctor()
        // this.getAllcodeSpecialty()
        // // 
    }

    getAllDoctor = async () => {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-address-clinic-by-id?id=${this.props.route.params.idClinic}`

        }).then(result => {

            let data = result.data
            this.setState({
                dataClinic: data
            })
        })
    }











    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const { dataClinic } = this.state




        const windowWidth = Dimensions.get('window').width

        let image, nameClinic, address, inforClinic = ''
        if (dataClinic && dataClinic.data && dataClinic.data.image) {
            image = new Buffer(dataClinic.data.image, 'base64').toString('binary')
            nameClinic = dataClinic.data.nameVi
            address = dataClinic.data.address
            inforClinic = dataClinic.data.descriptionHTML
        }
        const html = inforClinic
        return (
            <>

                <View style={styles.container}>

                    <View style={styles.backgroundClinic}>
                        <ImageBackground style={styles.img_dr} source={{
                            uri: image
                        }}></ImageBackground>
                    </View>

                    <View style={styles.nameClinic}>
                        <Text style={styles.nameText}>{nameClinic}</Text>
                        <Text style={styles.address}>{address}</Text>
                    </View>

                    <View style={styles.informationClinic}>

                        <View style={{ width: '99%', height: '100%' }}>
                            <ScrollView horizontal={false} style={{ marginHorizontal: 10 }} >
                                <RenderHtml
                                    source={{ html }}
                                    contentWidth={windowWidth}
                                    enableExperimentalMarginCollapsing={true}
                                    baseStyle={{ color: 'black', fontSize: 15 }}
                                />
                            </ScrollView>
                        </View>


                    </View>
                    <ScrollView>
                        <View style={styles.DoctorClinic}>

                            <DoctorClinic
                                idClinic={this.props.route.params.idClinic}
                            />

                        </View>
                    </ScrollView>


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


    DoctorClinic: {
        width: '100%',
        height: '100%',
    }

    ,
    nameText: {
        color: 'deeppink',
        fontSize: 18,
        textAlign: 'center'
    },
    address: {
        color: 'black',
        textAlign: "center"
    },


    img_dr: {
        width: '100%',
        height: '100%',

    },

    mixedStyle: {
        whiteSpace: 'normal',
        color: '#aaa'

    },

    informationClinic: {
        width: '100%',
        height: 230,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },

    nameClinic: {
        width: '100%',
        height: 60,
        fontSize: 18
    },

    backgroundClinic: {
        width: '100%',
        height: 250,
    },
    container: {
        width: '100%',
        height: '100%'
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(MainClinic);
