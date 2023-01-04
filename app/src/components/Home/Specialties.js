import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import MainSpecialty from '../Specialty/MainSpecialty';

const baseurl = process.env['REACT_APP_URL']
class Specialties extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrSpecialties: []
        }
    }

    async componentDidMount() {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-all-speciaties`
        }).then(result => {
            this.setState({
                arrSpecialties: result.data.data.data
            })
        })
    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    onChangeSpecialty = (item) => {

        // console.log('....', item.id)
        this.props.navigation.navigate('MainSpecialty', {
            id: item.id,
            dataSpecialty: item
        })

    }

    render() {

        const { arrSpecialties } = this.state
        return (
            <View style={styles.mainSpecialties}>
                <View>
                    <Text style={styles.title_main}>Chuyên Khoa Nổi Bật</Text>
                </View>

                <ScrollView horizontal={true}>


                    {arrSpecialties && arrSpecialties.length ? arrSpecialties.map((item, index) => {

                        let imageBase64 = ''
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                        }
                        return (

                            <TouchableOpacity
                                onPress={() => this.onChangeSpecialty(item)}
                            >
                                <View style={styles.list_Specialty}
                                >

                                    <View style={styles.form_specialty} key={index}>
                                        <View style={styles.Image_Spe}>
                                            <Image style={styles.img_dr} source={{
                                                uri: imageBase64
                                            }}></Image>

                                        </View>
                                        <Text style={styles.name_Special}>{item.nameVi}</Text>
                                    </View>


                                </View>
                            </TouchableOpacity>


                        )


                    })
                        : ''
                    }


                </ScrollView>


            </View>
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

    name_Special: {
        color: 'black',
        fontSize: 17,
        textAlign: 'center'
    },

    img_dr: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    Image_Spe: {
        width: '100%',
        height: 220
    },

    list_Specialty: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'

    },

    form_specialty: {
        width: 300,
        height: 250,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        marginLeft: 20,
        backgroundColor: 'white'

    },


    title_main: {
        fontSize: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        fontSize: 18,
        color: '#579BB1',
        fontWeight: 'bold'

    }
    ,
    mainSpecialties: {
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10,
        backgroundColor: '#F7DBE2',


    }

})


export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
