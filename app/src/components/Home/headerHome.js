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


        return (
            <View style={styles.mainHeader}>
                <ImageBackground source={image.img_bg} style={styles.img_bg}>
                    <View style={styles.title_header}>
                        <Text style={styles.title_text}>WELLCOME!!!👋</Text>

                        <Text style={styles.title_text_1}>
                            {dataUser && dataUser.userInfor ?
                                dataUser.userInfor.firstName
                                :
                                ''}
                        </Text>
                    </View>

                    <View style={styles.title_header_2}>
                        <Text style={{ fontStyle: 'italic' }}>Have a nice day !!! </Text>
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
        marginRight: 190,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_text_1: {
        fontSize: 25
        , fontWeight: 'bold',
        color: 'black'
    },
    img_bg: {
        width: '100%',
        height: '100%'
    },
    title_header: {
        marginTop: 50,
        width: 200,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'FontFamily'
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