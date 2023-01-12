import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import image from '../../constants/images'
import { connect } from 'react-redux'



class headerHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }
    render() {
        const { loaddingUser, dataUser } = this.props
        const isLoading = loaddingUser
        console.log('isloading', isLoading)

        console.log('isloading', dataUser)

        return (
            <View style={styles.mainHeader}>
                <ImageBackground source={image.img_bg} style={styles.img_bg}>
                    <View style={styles.title_header}>
                        <Text style={styles.title_text}>HeartHospital</Text>

                        <Text style={styles.title_text_1}>
                            {dataUser && dataUser.userInfor ?
                                dataUser.userInfor.fullname
                                :
                                ''}
                        </Text>
                    </View>

                    <View style={styles.title_header_2}>
                        <Text style={{ fontStyle: 'italic', fontSize: 18, color: '#EE6983', fontWeight: '700' }}>Have a nice day</Text><Text style={{ fontSize: 20 }}> 😊 </Text>
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainHeader: {
        width: '100%',
        height: 280,

    },
    title_header_2: {
        fontStyle: 'italic',
        marginLeft: 25,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 200


    },
    title_text_1: {

        fontSize: 25
        , fontWeight: 'bold',
        color: '#EE6983',
        paddingRight: 300
    },
    img_bg: {
        width: '100%',
        height: '100%'
    },
    title_header: {
        marginTop: 70,
        width: 500,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title_text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#E97777',
        fontFamily: 'FontFamily',
        width: 480,
        paddingLeft: 0,
        paddingBottom: 50

    }

})


const mapStateToProps = (state) => {
    return {
        loaddingUser: state.authReducer.isloading,
        dataUser: state.authReducer

    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(headerHome)