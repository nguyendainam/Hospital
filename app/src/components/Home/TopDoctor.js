import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { Component, router } from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import axios from 'axios';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import Infor from '../Doctor/informationDoctor'



const baseurl = process.env['REACT_APP_URL']
console.log("url top doctor", baseurl)




class TopDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: {},
        };
    }

    async componentDidMount() {
        await axios.get(`${baseurl}/api/top-doctor-home`)
            // .then(response => response.json())
            .then(response => {
                this.setState({
                    arrDoctor: response.data
                })
                this.props.load_topDoctorarr(this.state.arrDoctor)
            })

    }


    LetInforDoctor = (id) => {
        console.log('id user', id)
        this.props.navigation.push('Infor', {
            id: id
        })

    }


    render() {
        const arr_DOCTOR = this.state.arrDoctor
        return (
            <View style={styles.mainTopdr}>
                <Text style={styles.title_main}>TopDoctor</Text>
                <ScrollView horizontal={true}>
                    {arr_DOCTOR.data && arr_DOCTOR.data.length > 0 && arr_DOCTOR.data.map((item, index) => {
                        let imageBase64 = ''
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                        }
                        return (
                            <TouchableOpacity

                                // key={index}
                                onPress={(id) => { this.LetInforDoctor(item.id) }}
                            >


                                <View style={styles.formDoctor}>
                                    <View style={styles.Image_Doctor}>
                                        <Image style={styles.img_dr} source={{
                                            uri: imageBase64
                                        }}></Image>
                                    </View>
                                    <View style={styles.NameDoctor}>
                                        <Text style={styles.text_Name}>{item.positionData.valueVi}: </Text>
                                        <Text style={styles.text_Name}>{item.lastName}<Text> </Text>{item.firstName}</Text></View>
                                    <View style={styles.NameDoctor}>
                                        <Text style={styles.text_Name}>Khoa</Text></View>
                                </View>


                            </TouchableOpacity>

                        )


                    })}


                </ScrollView>



            </View>

        )
    }
}

const mapStateToProps = (state) => ({
    // topDoctorarr: state.homeReduser.arrDoctors
})

const mapDispatchToProps = dispatch => {
    return {
        load_topDoctorarr: (arrDoctor) => dispatch(action.fetchTopDoctor(arrDoctor))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopDoctor)

const styles = StyleSheet.create({



    text_Name: {
        fontSize: 18
    },

    NameDoctor: {
        display: 'flex',
        flexDirection: 'row'
    },
    img_dr: {
        width: '100%',
        height: '100%',

    },
    mainTopdr: {
        width: '100%',
        height: 300,
        backgroundColor: '#CEE8EF',
        borderWidth: 1,
        borderColor: '#CEE8EF'

    },
    formDoctor: {
        width: 300,
        height: 250,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#B8E8FC'
    },

    Image_Doctor: {
        width: 190,
        height: 170,
        backgroundColor: '#BCCEF8',
        borderRadius: 10
    }
    ,

    title_main: {
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        fontSize: 18,
        color: '#EE6983',
        fontWeight: 'bold'

    }

})