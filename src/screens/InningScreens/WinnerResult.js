import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { hr80, back, container1, back1, t1, limits, text, bat_team, loader, load_text } from "../../globals/style";
const WinnerResult = ({ navigation }) => {
    const route = useRoute();
    const [myUserDataWin, setmyUserDataWin] = useState([]);
    const [myUserDataLoss, setmyUserDataLoss] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    var Winnerjson = {
        "batting_team": route.params.batting_team,
        "bowling_team": route.params.bowling_team,
        "total_runs_x": route.params.total_runs_x,
        "score": route.params.score,
        "wickets": route.params.wickets,
        "overs": route.params.overs
    }

    const toSend = Winnerjson;
    const WinnerSubmit = async () => {
        console.log("Component Did Mount");
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await axios.post(
                "https://ipl-prediction.onrender.com/predict",
                toSend,
                axiosConfig
            );
            setmyUserDataWin(response.data.win)
            setmyUserDataLoss(response.data.loss)
            setIsLoading(false);
            console.log("Winner Prediction :", response.status);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        WinnerSubmit();
    }, []);
    return (
        <View style={container1}>
            {isLoading ? (<View><TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
            </TouchableOpacity><ActivityIndicator style={loader} size={'large'} color="#5465FF" />
                <Text style={load_text}>Predicting Winning Chances of {route.params.batting_team}!!</Text>
            </View>)
                : (
                    <View style={styles.container}>
                        <Text style={bat_team}>{route.params.batting_team}</Text>
                        <Text style={text}>Has</Text>
                        <View style={hr80} />
                        <Text style={limits}>{myUserDataWin}%</Text>
                        <View style={hr80} />
                        <Text style={text}>Chance</Text>
                        <Text style={t1}>Of Winning</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('winner')} style={back1}>
                            <Ionicons name="chevron-back-circle" size={60} color="#9BB1FF" />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
})

export default WinnerResult