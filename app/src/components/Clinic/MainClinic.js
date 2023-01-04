import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';



const baseurl = process.env['REACT_APP_URL']
class MainClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        await axios({
            method: 'GET',
            url: `${baseurl}/api/get-address-clinic-by-id?id=${this.props.route.params.idClinic}`

        }).then(result => {

            let data = result.data
            this.setState({
                dataClinic: data
            })
        })



        // 
    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const { dataClinic } = this.state
        let image, nameClinic, address, inforClinic = ''
        if (dataClinic && dataClinic.data && dataClinic.data.image) {
            image = new Buffer(dataClinic.data.image, 'base64').toString('binary')
            nameClinic = dataClinic.data.nameVi
            address = dataClinic.data.address
            inforClinic = dataClinic.data.descriptionHTML
        }
        console.log("..........", inforClinic)
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
                        <ScrollView horizontal={false} style={{ marginHorizontal: 10, flex: 1 }}>

                            <RenderHTML
                                contentWidth={{ width: 200 }}
                                source={{ inforClinic }}
                                enableExperimentalMarginCollapsing={true}
                                baseStyle={{ color: 'black', fontSize: 17 }}

                            />



                        </ScrollView>
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


    informationClinic: {
        width: '100%',
        height: 500
    },

    nameClinic: {
        width: '100%',
        height: 60,
        borderWidth: 1,
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
