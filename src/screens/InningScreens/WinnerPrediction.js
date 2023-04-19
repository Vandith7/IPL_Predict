import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native'
import { btn1, container1, container, back, head1, inputOut, inputOut1, dd, input } from "../../globals/style";
import { SelectList } from 'react-native-dropdown-select-list';
import { Ionicons } from '@expo/vector-icons';

const WinnerPrediction = ({ navigation }) => {

  const [wbatting_team, setSelectedbat] = React.useState("");
  const [wbowling_team, setSelectedbowl] = React.useState("");
  const [ttotal_runs, setSelectedt_runs] = React.useState("");
  const [tscore, setSelectedt_score] = React.useState("");
  const [twickets, setSelectedt_wickets] = React.useState("");
  const [tovers, setSelectedt_overs] = React.useState("");
  const total_runs_x = parseInt(ttotal_runs);
  const score = parseInt(tscore);
  const wickets = parseInt(twickets);
  const overs = parseFloat(tovers);
  const data = [
    { key: 'Chennai Super Kings', value: 'Chennai Super Kings' },
    { key: 'Delhi Capitals', value: 'Delhi Capitals' },
    { key: 'Kings XI Punjab', value: 'Kings XI Punjab' },
    { key: 'Kolkata Knight Riders', value: 'Kolkata Knight Riders' },
    { key: 'Mumbai Indians', value: 'Mumbai Indians' },
    { key: 'Rajasthan Royals', value: 'Rajasthan Royals' },
    { key: 'Royal Challengers Bangalore', value: 'Royal Challengers Bangalore' },
    { key: 'Sunrisers Hyderabad', value: 'Sunrisers Hyderabad' },
  ];

  const showAlert = () =>
    Alert.alert(
      'Oops',
      'Please make sure you have entered all the details!!',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
    );

  const Predict_w = () => {
    if (!wbatting_team || !wbowling_team || !ttotal_runs || !tscore || !twickets || !tovers || twickets > 10 || tovers > 20) {
      showAlert();
    }
    else {
      navigation.navigate('winnerRes', {
        batting_team: wbatting_team,
        bowling_team: wbowling_team,
        total_runs_x: total_runs_x,
        score: score,
        wickets: wickets,
        overs: overs,
      })
    }
  }


  return (
    <ScrollView style={container1} keyboardShouldPersistTaps={'always'}>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')} style={back}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
      </TouchableOpacity>
      <View style={container}>
        <Text style={head1}>Predict The Match Winner In Second Innings</Text>
        <View style={inputOut1}>
          <SelectList
            style={dd}
            data={data}
            setSelected={setSelectedbat}
            placeholder="Batting Team"
            maxHeight={120}
            inputStyles={{ fontSize: 16 }}
            boxStyles={{ borderColor: "white" }}
            value={wbatting_team}
          />
        </View>
        <View style={inputOut1}>
          <SelectList
            style={dd}
            data={data}
            setSelected={setSelectedbowl}
            placeholder="Bowling Team"
            maxHeight={120}
            inputStyles={{ fontSize: 16 }}
            boxStyles={{ borderColor: "white" }}
            value={wbowling_team}
          />
        </View>
        <View style={inputOut}>
          <TextInput value={total_runs_x} style={input} onChangeText={(ttotal_runs) => setSelectedt_runs(ttotal_runs)} placeholder="Target Score" keyboardType='numeric' />
        </View>
        <View style={inputOut}>
          <TextInput value={score} style={input} onChangeText={(tscore) => setSelectedt_score(tscore)} placeholder="Current Score" keyboardType='numeric' />
        </View>
        <View style={inputOut}>
          <TextInput value={wickets} style={input} onChangeText={(twickets) => {
            setSelectedt_wickets(twickets)
            if (twickets > 10) {
              ToastAndroid.show("Wickets Taken Should Be Less Than 10!!", ToastAndroid.SHORT,)
            }
          }
          } placeholder="Wickets Taken" keyboardType='numeric' />
        </View>
        <View style={inputOut}>
          <TextInput value={overs} style={input} onChangeText={(tovers) => {
            setSelectedt_overs(tovers)
            if (tovers > 20) {
              ToastAndroid.show("Overs Should Be Less Than 20!!", ToastAndroid.SHORT)
            }
          }} placeholder="Overs Completed" keyboardType='numeric' />
        </View>
        <TouchableOpacity onPress={Predict_w} style={btn1}>
          <Text style={{ color: '#E2FDFF', fontSize: 20, fontWeight: '400' }}>Predict Winner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}


export default WinnerPrediction