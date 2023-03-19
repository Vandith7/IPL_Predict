import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { hr80, back, container1, back1, t1, limits, text, bat_team, loader, load_text } from "../../globals/style";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const ScoreResult = ({ navigation }) => {
  const route = useRoute();

  const [myUserDataup, setmyUserDataUp] = useState([]);
  const [myUserDatalow, setmyUserDataLow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var Scorejson = {
    "batting_team": route.params.batting_team,
    "bowling_team": route.params.bowling_team,
    "overs": route.params.overs,
    "runs": route.params.runs,
    "wickets": route.params.wickets,
    "runs_in_prev_5": route.params.runs_in_prev_5,
    "wickets_in_prev_5": route.params.wickets_in_prev_5,
  };
  const toSend = Scorejson;
  const ScoreSubmit = async () => {
    console.log("Component Did Mount");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    try {
      const response = await axios.post(
        "https://ipl-prediction.onrender.com/predict_score",
        toSend,
        axiosConfig
      );
      setmyUserDataUp(response.data.upper_limit);
      setmyUserDataLow(response.data.lower_limit);
      setIsLoading(false);
      console.log("Score Prediction :", response.status);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    ScoreSubmit();
  }, []);


  return (
    <View style={container1}>
      {isLoading ? (<View><TouchableOpacity onPress={() => navigation.navigate('score')} style={back}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
      </TouchableOpacity><ActivityIndicator style={loader} size={'large'} color="#5465FF" />
        <Text style={load_text}>Predicting Scores for {route.params.batting_team}!!</Text>
      </View>)
        : (
          <View style={styles.container}>
            <Text style={bat_team}>{route.params.batting_team}</Text>
            <Text style={text}>Will Have Scored</Text>
            <View style={hr80} />
            <Text style={limits}>{myUserDatalow} to {myUserDataup}</Text>
            <View style={hr80} />
            <Text style={text}>runs</Text>
            <Text style={t1}>At The End Of 20th Over</Text>
            <TouchableOpacity onPress={() => navigation.navigate('score')} style={back1}>
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
export default ScoreResult