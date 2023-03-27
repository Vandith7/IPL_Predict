import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ActivityIndicator, FlatList, ScrollView, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment/moment';
import { back, container1, loader, head1 } from "../../globals/style";
import { container, result, teams, teams1, status1, league, league2, match, hr100, hr101, load_text, card, containerb, btn, btn1 } from '../../globals/matchStyle'

const LiveScore = ({ navigation }) => {
    var date = (new Date().getDate()) + 1;
    var month = (new Date().getMonth() + 1).toString();
    if (month.toString().length < 2)
        month = "0" + month;
    var year = (new Date().getFullYear()).toString();
    // console.log(currentDate)
    var currentDate = year + month + date


    const [myData, set_myData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getScore = async () => {
        console.log("Component Did Mount");
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await axios.get(
                `https://prod-public-api.livescore.com/v1/api/app/date/cricket/${currentDate}/5.30?MD=1`,
                axiosConfig
            );
            setIsLoading(false);
            set_myData(response.data.Stages);
            if (response.data.Stages[0] != undefined) {
                console.log("Live Score :", response.status);
            } else {
                ToastAndroid.show('No matches available', ToastAndroid.LONG)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getScore();
    }, []);

    return (
        <View style={container1}>
            {isLoading ? (<View><TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
            </TouchableOpacity><ActivityIndicator style={loader} size={'large'} color="#5465FF" />
                <Text style={load_text}>Please wait while we are getting scores for you!!</Text>
            </View>)
                : (
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
                            <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
                        </TouchableOpacity>
                        <View style={container} >
                            <Text style={head1} >Live Scores Of Top Events</Text>
                            <View style={containerb}>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('C_live')}
                                        style={card}>
                                        <Text style={btn}>LIVE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('live')}
                                        style={card}>
                                        <Text style={btn}>Today</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('yesterday')}
                                        style={card}>
                                        <Text style={btn}>Yesterday</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={getScore}
                                        style={card}>
                                        <Text style={btn1}>Tomorrow</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>

                            <FlatList
                                keyExtractor={(index) => {
                                    return index.Sid
                                }}
                                data={myData}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <View style={hr101} />
                                            <Text style={league}>{item.Snm}</Text>
                                            <Text style={league2}>{item.Cnm}</Text>
                                            <View>
                                                {item.Events.map((event) => (
                                                    <View style={match}>
                                                        <Text style={league2}>{event.EtTx}-{event.ErnInf}</Text>
                                                        <Text style={league2}>{moment(event.Esd, "YYYYMMDDhmss a").format("LLLL")}</Text>
                                                        <Text style={status1}>{event.EpsL}</Text>
                                                        <View style={hr100} />
                                                        <Text style={teams1}>{event.T1[0].Nm} </Text>

                                                        <View style={hr100} />
                                                        <Text style={teams1}>{event.T2[0].Nm} </Text>

                                                        <View style={hr100} />
                                                        <Text style={result}>{event.ECo}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </>
                )
            }
        </View>
    )
}

export default LiveScore