import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
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

            console.log("News :", response.status);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNews();
        ShowAlertWithDelay();
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
                        <Text style={head1} >Top News In Cricket from Reddit</Text>
                        <View>
                            <View style={hr101} />
                            <FlatList
                                contentContainerStyle={{ paddingBottom: '80%' }}
                                data={myData}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <View>
                                                <Image resizeMode='contain' style={styles.news_img} source={{ uri: item.url }} />
                                            </View>
                                            <Text style={styles.head} >{item.title}</Text>
                                            <View style={styles.hr100} />
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
    head: {
        color: 'white',
        textAlign: 'center',
        marginVertical: '4%',
        fontSize: 20,
        fontWeight: '400'
    },
    news_img: {
        height: deviceWidth,
        width: deviceWidth,
        marginVertical: '2%',
    },
    hr100: {
        width: '100%',
        borderBottomColor: "#E2FDFF",
        borderBottomWidth: 0.5,
        // marginVertical: 4,
    },

})

export default CricNews