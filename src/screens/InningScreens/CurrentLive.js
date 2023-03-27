import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ActivityIndicator, FlatList, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment/moment';
import { back, container1, loader, head1 } from "../../globals/style";
import { container, result, teams, teams1, status1, league, league2, match, hr100, hr101, load_text, card, containerb, btn, btn1, teams_yet } from '../../globals/matchStyle'

const LiveScore = ({ navigation }) => {
    const [myData, set_myData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const pullMe = () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false)
        }, 4000)
    }

    const getScore = async () => {
        console.log("Component Did Mount");
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await axios.get(
                `https://prod-public-api.livescore.com/v1/api/app/live/cricket/5.30?MD=1`,
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
        const interval = setInterval(() => {
            getScore();
        }, 20000);
        return () => clearInterval(interval);
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
                                        onPress={getScore}
                                        style={card}>
                                        <Text style={btn1}>LIVE</Text>
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
                                        onPress={() => navigation.navigate('tomorrow')}
                                        style={card}>
                                        <Text style={btn}>Tomorrow</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>

                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={() => {
                                            pullMe();
                                            getScore();
                                        }}
                                    />
                                }
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
                                                        <Text style={teams}>
                                                            {event.Tr1C2 !== undefined && event.Tr1CW2 !== undefined && event.Tr1CO2 !== undefined ? (<Text style={teams}>{event.Tr1C1}-{event.Tr1CW1} ({event.Tr1CO1} Ovs){"\n"}&{"\n"}{event.Tr1C2}-{event.Tr1CW2} ({event.Tr1CO2} Ovs)</Text>) : event.Tr1C1 !== undefined && event.Tr1CW1 !== undefined && event.Tr1CO1 !== undefined ? (<Text>{event.Tr1C1}-{event.Tr1CW1} ({event.Tr1CO1} Ovs)</Text>) : (<Text style={teams_yet}>Yet to bat</Text>)}
                                                        </Text>
                                                        <View style={hr100} />
                                                        <Text style={teams1}>{event.T2[0].Nm} </Text>
                                                        <Text style={teams}>
                                                            {event.Tr2C2 !== undefined && event.Tr2CW2 !== undefined && event.Tr2CO2 !== undefined ? (<Text style={teams}>{event.Tr2C1}-{event.Tr2CW1} ({event.Tr2CO1} Ovs){"\n"}&{"\n"}{event.Tr2C2}-{event.Tr2CW2} ({event.Tr2CO2} Ovs)</Text>) : event.Tr2C1 !== undefined && event.Tr2CW1 !== undefined && event.Tr2CO1 !== undefined ? (<Text>{event.Tr2C1}-{event.Tr2CW1} ({event.Tr2CO1} Ovs)</Text>) : (<Text style={teams_yet}>Yet to bat</Text>)}
                                                        </Text>
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