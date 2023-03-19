import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Disclaimer = ({ navigation }) => {
  const fireAPI = async () => {
    try {
      const response = await fetch("https://ipl-prediction.onrender.com");
      console.log("Prediction :", response.status);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fireAPI();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>IPL Ethos</Text>
      <ScrollView persistentScrollbar={true} style={styles.text}>
        <Text style={styles.title}>This app was made as a project for my final year and is totally for Entertainment Purpose!!</Text>
        <Text style={styles.title}>In the prediction part app uses Machine Learning model to predict Final Score for First Innings and Win Probability for Second Innings!!</Text>
        <Text style={styles.title}>The Machine Learning model is based on the datasets of model until year 2021 therefore you won't find new teams in the team selection list. </Text>
        <Text style={styles.title}>The accuracy of model is 82%</Text>
        <Text style={styles.title}>However, Cricket is an unpredictable sports and is full of surprises and twists, predicting the outcome with 100% Accuracy is Impossible</Text>
        <Text style={styles.title}>This app should only be used as medium for Entertainment and not for other purposes like betting or gambling!!</Text>
        <Text style={styles.title}>Please Enjoy your time on this app and press the button below to Continue!!</Text>
        <Text style={styles.title}>   </Text>

      </ScrollView>
      <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomePage')}>
          <Text style={styles.btn} >CONTINUE  <AntDesign name="rightcircle" size={24} color="black" /></Text>


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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  text: {
    backgroundColor: '#22223b',
    marginHorizontal: '4%',
    borderRadius: 20,
    maxHeight: '65%',
    padding: 10,
  },
  container1: {
    width: "100%",
    height: "100%",
    backgroundColor: 'black'
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    color: 'white',
    marginVertical: 6,
  },
  title1: {
    fontSize: 50,
    color: "#BFD7FF",
    textAlign: "left",
    marginVertical: '6%',
    fontWeight: '400',
    marginHorizontal: '4%',
    width: "92%",
  },
  btnout: {
    flexDirection: 'column',
    width: '50%',
  },
  btn: {
    fontSize: 20,
    color: '#E2FDFF',
    textAlign: 'center',
    marginVertical: '15%',
    fontWeight: '400',
    backgroundColor: '#5465FF',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    elevation: 15
  }
})

export default Disclaimer