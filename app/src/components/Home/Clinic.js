import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'

const baseurl = process.env['REACT_APP_URL']
class Clinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],

        }
    }

    async componentDidMount() {

        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-all-clinic`
        }).then(result => {
            this.setState({
                dataClinic: result.data.data
            })
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleClinic = (item) => {
        console.log("item....", item.id)
        this.props.navigation.push('MainClinic', {
            idClinic: item.id
        })
    }


    render() {
        const { dataClinic } = this.state
        return (
            <>

                <View style={styles.container}>

                    <View>
                        <Text> Địa chỉ khám bệnh</Text>
                    </View>
                    <ScrollView horizontal={true}>

                        <View style={styles.mainClinic}>

                            {dataClinic && dataClinic.length ?

                                dataClinic.map((item, index) => {

                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return (

                                        <TouchableOpacity key={index} onPress={() => this.handleClinic(item)}>
                                            <View style={styles.formClinic} >
                                                <View style={styles.form_image}>
                                                    <Image style={styles.img_dr} source={{
                                                        uri: imageBase64
                                                    }}></Image>
                                                </View>
                                                <View>
                                                    <Text style={styles.nameClinic}>{item.nameVi}</Text>
                                                    <Text style={styles.addressClinic}>{item.address}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })

                                : ''
                            }


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


    addressClinic: {
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'black'
    },

    nameClinic: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },


    img_dr: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    form_image: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    formClinic: {
        width: 300,
        height: 280,
        borderWidth: 2,
        borderColor: '#F7F5F2',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        textAlign: 'center'
    },

    mainClinic: {
        width: '100%',
        height: 350,
        borderWidth: 2,
        borderColor: '#F7F5F2',
        justifyContent: 'center',
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        backgroundColor: 'white',
    }
    , container: {
        width: 'auto',
        height: 'auto',
        marginTop: 10,
        backgroundColor: 'white',
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
