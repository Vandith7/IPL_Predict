import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from "react-native";
import { btn1, container1, container, back, head1, inputOut, inputOut1, dd, input } from "../../globals/style";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";

const ScorePrediction = ({ navigation }) => {
  const [sbatting_team, setSelectedbat] = React.useState("");
  const [sbowling_team, setSelectedbowl] = React.useState("");
  const [tovers, setSelectedt_overs] = React.useState("");
  const [truns, setSelectedt_runs] = React.useState("");
  const [t_wickets, setSelectedt_wickets] = React.useState("");
  const [t_runs5, setSelectedt_runs5] = React.useState("");
  const [t_wickets5, setSelectedt_wickets5] = React.useState("");


  const overs = parseFloat(tovers);
  const runs = parseInt(truns);
  const wickets = parseInt(t_wickets);
  const runs_in_prev_5 = parseInt(t_runs5);
  const wickets_in_prev_5 = parseInt(t_wickets5);
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
          cancelable: true,
          text: 'Ok',
          style: 'cancel',
        },
      ],
    );

  const Predict_s = () => {
    if (!sbatting_team || !sbowling_team || !tovers || !truns || !t_wickets || !t_runs5 || !t_wickets5) {
      showAlert();
    }
    else {
      navigation.navigate('scoreRes', {
        batting_team: sbatting_team,
        bowling_team: sbowling_team,
        overs: overs,
        runs: runs,
        wickets: wickets,
        runs_in_prev_5: runs_in_prev_5,
        wickets_in_prev_5: wickets_in_prev_5,
      })
    }
  }


  return (
    <View >
      <ScrollView style={container1} keyboardShouldPersistTaps={'always'}>


        <TouchableOpacity
          onPress={() => navigation.navigate("WelcomePage")}
          style={back}
        >
          <Ionicons name="arrow-back-circle-outline" size={40} color="#9BB1FF" />
        </TouchableOpacity>
        <View style={container}>
          <Text style={head1}>Predict Score For First Innings</Text>
          <View style={inputOut1}>
            <SelectList
              style={dd}
              data={data}
              setSelected={setSelectedbat}
              placeholder="Batting Team"
              maxHeight={120}
              inputStyles={{ fontSize: 16 }}
              boxStyles={{ borderColor: "white" }}
              value={sbatting_team}
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
              value={sbowling_team}
            />
          </View>
          <View style={inputOut}>
            <TextInput
              style={input}
              onChangeText={(tovers) => {
                setSelectedt_overs(tovers)
                if (tovers > 20) {
                  ToastAndroid.show("Overs Should Be Less Than 20!!", ToastAndroid.SHORT)
                }
              }
              }
              placeholder="Overs Completed"
              keyboardType="numeric"
              value={overs}
            />

          </View>
          <View style={inputOut}>
            <TextInput
              style={input}
              onChangeText={(truns) => setSelectedt_runs(truns)}
              placeholder="Runs Scored"
              keyboardType="numeric"
              value={runs}
            />
          </View>
          <View style={inputOut}>
            <TextInput
              style={input}
              onChangeText={(t_wickets) => {
                setSelectedt_wickets(t_wickets)
                if (t_wickets > 10) {
                  ToastAndroid.show("Wickets Taken Should Be Less Than 10!!", ToastAndroid.SHORT)
                }
              }
              }
              placeholder="Wickets Taken"
              keyboardType="numeric"
              value={wickets}
            />
          </View>
          <View style={inputOut}>
            <TextInput
              style={input}
              onChangeText={(t_runs5) => setSelectedt_runs5(t_runs5)
              }
              placeholder="Runs In Previous 5 Overs"
              keyboardType="numeric"
              value={runs_in_prev_5}
            />
          </View>
          <View style={inputOut}>
            <TextInput
              style={input}
              onChangeText={(t_wickets5) => {
                setSelectedt_wickets5(t_wickets5)
                if (t_wickets5 > 10) {
                  ToastAndroid.show("Wickets Taken Should Be Less Than 10!!", ToastAndroid.SHORT)
                }
              }
              }
              placeholder="Wickets In Previous 5 Overs"
              keyboardType="numeric"
              value={wickets_in_prev_5}
            />
          </View>
          <TouchableOpacity onPress={Predict_s} style={btn1} >
            <Text style={{ color: '#E2FDFF', fontSize: 20, fontWeight: '400' }}>
              Predict Score
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


export default ScorePrediction;
