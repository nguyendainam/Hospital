import axios from 'axios';
import React, { route, Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import images from '../../constants/images';
import base64 from 'react-native-base64'
import { Buffer } from 'buffer'

import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import ScheduleDoctor from './ScheduleDoctor';
import Footer from '../Footer';

const baseurl = process.env['REACT_APP_URL']

function Infor({ route, navigation }) {
    const [dataDoctor, setdataDoctor] = useState('')
    const [image, setImage] = useState()
    const [content_HTML, setcontent_HTML] = useState('')
    const { id } = route.params

    useEffect(() => {
        getInformationDoctor()

    }, []);

    getInformationDoctor = async () => {

        await axios({
            url: `${baseurl}/api/get-detail-doctor-byid?id=${id}`,
            method: 'GET',
        }).then(result => {
            imageBase64 = new Buffer(result.data.data.image, 'base64').toString('binary')
            setcontent_HTML(result.data.data.Markdown)
            setImage(imageBase64)
            setdataDoctor(result.data)





        })

    }

    const { width } = useWindowDimensions();

    const html = content_HTML.contentHTML
    return (

        <>
            <ScrollView horizontal='false'>

                <View style={{ backgroundColor: 'white' }}>
                    <View style={styles.container_InforDr}>
                        <View style={styles.buttonBack}>
                            <TouchableOpacity
                                onPress={() => { navigation.goBack() }}
                                style={styles.back_sreen}>
                                <Image style={styles.img_return} source={images.undo} />
                            </TouchableOpacity>
                        </View>




                        <View style={styles.Drom_infor_doctor}>
                            <View style={styles.Img_Doctor_from}>


                                <Image style={styles.img_doctor} source={{ uri: image }}>
                                </Image>
                            </View>




                            <View style={styles.Desc_Doctor_form}>
                                <Text style={styles.form_name_dr}>
                                    {dataDoctor.data && dataDoctor.data.positionData.valueEn ? dataDoctor.data.positionData.valueVi + ': ' : ''}
                                    {dataDoctor.data && dataDoctor.data.lastName ? dataDoctor.data.lastName : ''}
                                    {dataDoctor.data && dataDoctor.data.firstName ? dataDoctor.data.firstName : ''}



                                </Text>
                                <View>
                                    <ScrollView horizontal={false}>

                                        <Text style={styles.form_descr_dr}>
                                            {dataDoctor.data && dataDoctor.data.Markdown.description ? dataDoctor.data.Markdown.description : ''}
                                        </Text>


                                    </ScrollView>

                                </View>


                            </View>
                        </View>

                        <View  >
                            <ScheduleDoctor
                                idDoctor={dataDoctor}
                                navigation={navigation}
                                idDr={id}
                            />
                        </View>





                        <View style={styles.content_doctor}>
                            <Text style={styles.TitleIN4}> THÔNG TIN VỀ BÁC SĨ</Text>






                            <View >
                                <ScrollView horizontal={false} style={{ marginHorizontal: 10, flex: 1 }}>

                                    <RenderHTML
                                        contentWidth={width}
                                        source={{ html }}
                                        enableExperimentalMarginCollapsing={true}
                                        baseStyle={{ color: 'black', fontSize: 17 }}

                                    />


                                </ScrollView>

                            </View>








                        </View>







                    </View >



                </View>
                <Footer />
            </ScrollView>
        </>
    )
}








const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}


const styles = StyleSheet.create({
    TitleIN4: {
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF597B',
        height: 40,
        paddingTop: 10,
        fontSize: 18

    }
    ,

    document: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black'
    },

    content_doctor: {
        marginTop: 5,
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        paddingLeft: 5,
        paddingRight: 10,
        color: 'black',


    },

    img_doctor: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    form_name_dr: {
        width: '100%',
        height: 35,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',


    },
    form_descr_dr: {
        width: '100%',
        height: 150,
        fontSize: 15,
        color: 'black'

    },


    img_return: {
        width: '100%',
        height: '100%',
    },

    buttonBack: {
        marginLeft: 20,
        marginTop: 20,
        width: 30,
        height: 30,
    },
    back_sreen: {
        width: '100%',
        height: '100%',
    },

    Drom_infor_doctor: {
        width: '100%',
        height: 180,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'



    },
    Img_Doctor_from: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        borderRadius: 50,

    },
    Desc_Doctor_form: {
        marginLeft: 10,
        width: 270,
        height: '100%',
        paddingTop: 20,
        paddingLeft: 5

    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Infor)

