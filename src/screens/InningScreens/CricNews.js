import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { back, container1, loader, head1, load_text } from "../../globals/style";
import { hr101 } from '../../globals/matchStyle';

const CricNews = ({ navigation }) => {
    const [myData, set_myData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getNews = async () => {
        console.log("Component Did Mount");
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await axios.get(
                "https://meme-api.com/gimme/Cricket/50",
                axiosConfig
            );
            set_myData(response.data.memes);
            setIsLoading(false);
            ShowAlertWithDelay();

            console.log("News :", response.status);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNews();

    }, []);


    ShowAlertWithDelay = () => {
        setTimeout(function () {
            ToastAndroid.show("Scroll down for more!!", ToastAndroid.SHORT)
        }, 3000);


    }
    return (<View style={container1}>
        {isLoading ? (<View><TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
            <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
        </TouchableOpacity><ActivityIndicator style={loader} size={'large'} color="#5465FF" />
            <Text style={load_text}>Please wait while we are getting news for you!!</Text>
        </View>)
            : (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
                        <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
                    </TouchableOpacity>
                    <View>
                        <Text style={head1} >Top News</Text>
                        <View>
                            <View style={hr101} />
                            <FlatList
                                contentContainerStyle={{ paddingBottom: '80%' }}
                                data={myData}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.news}>
                                            <View style={styles.newsi}>
                                                <Image resizeMethod='scale' resizeMode='contain' style={styles.news_img} source={{ uri: item.url }} />
                                            </View>
                                            <Text style={styles.head1} ><Foundation name="arrow-up" size={30} color="#EC1C24" />  {item.ups} upvotes in reddit</Text>
                                            <Text style={styles.head} >{item.title}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </>
            )
        }
    </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: 20,
        backgroundColor: '#22223b',
        marginTop: '4%',
        padding: '2%'
    },
    news: {
        backgroundColor: '#22223b',
        marginVertical: '4%',
        borderRadius: 20,
        padding: '2%'
    },
    newsi: {
        backgroundColor: '#16113f',
        marginVertical: '2%',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    container1: {
        backgroundColor: 'black',
        textAlign: 'left',
        marginTop: '1%',
        padding: '2%'
    },
    head: {
        color: 'white',
        textAlign: 'left',
        marginLeft: '2%',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: '4%',
    },
    head1: {
        color: 'white',
        textAlign: 'left',
        marginLeft: '2%',
        marginBottom: '1%',
        fontSize: 20,
        fontWeight: '500'
    },
    news_img: {
        height: deviceWidth - 25,
        width: deviceWidth - 25,
        marginVertical: '2%',
        // borderRadius: 20,
        overflow: 'hidden',
    },
    hr100: {
        width: '100%',
        borderBottomColor: "#E2FDFF",
        borderBottomWidth: 0.5,
        marginTop: 4,
    },
    hr101: {
        width: '100%',
        borderBottomColor: "#E2FDFF",
        borderBottomWidth: 1,
        marginBottom: '4%',
    },

})

export default CricNews