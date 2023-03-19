import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Cricket_logo from '../../../assets/Cricket.gif';
const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome To</Text>
            <Text style={styles.title1}>IPL Ethos</Text>
            <View style={styles.logoout}>
                <Image source={Cricket_logo} resizeMode='contain' style={styles.Cricket_logo} />
            </View>
            <View style={styles.btnout}>

                <TouchableOpacity onPress={() => navigation.navigate('score')}>
                    <Text style={styles.btn}>Predict First Innings</Text>
                </TouchableOpacity>
                <View style={styles.hr100} />
                <TouchableOpacity onPress={() => navigation.navigate('winner')}>
                    <Text style={styles.btn}>Predict Second Innings</Text>
                </TouchableOpacity>
                <View style={styles.hr100} />
                <TouchableOpacity onPress={() => navigation.navigate('live')}>
                    <Text style={styles.btn}>Scores</Text>
                </TouchableOpacity>
                <View style={styles.hr100} />
                <TouchableOpacity onPress={() => navigation.navigate('news')}>
                    <Text style={styles.btn}>Recent News</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },

    hr100: {
        width: '100%',
        borderBottomColor: "#4a4e69",
        borderBottomWidth: 1,
        marginVertical: 4,
    },
    title: {
        fontSize: 48,
        textAlign: 'center',
        marginVertical: 2,
        fontWeight: '200',
        color: 'white'
    },
    title1: {
        fontSize: 50,
        fontWeight: '400',
        color: '#BFD7FF'
    },
    logoout: {
        width: "80%",
        height: "35%",
        alignItems: 'center',

    },
    Cricket_logo: {
        width: '100%',
        height: '100%',
    },

    btnout: {
        flexDirection: 'column',
        width: '80%'
    },
    btn: {
        fontSize: 20,
        color: '#E2FDFF',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '400',
        backgroundColor: '#22223b',
        borderRadius: 50,
        padding: 12,
        elevation: 15
    }
})
export default WelcomeScreen