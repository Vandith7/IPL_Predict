import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import ScorePrediction from './ScorePrediction';
import WinnerPrediction from './WinnerPrediction';
import Disclaimer from '../Disclaimer';
import ScoreResult from './ScoreResult';
import WinnerResult from './WinnerResult';
import LiveScore from './LiveScore';
import CricNews from './CricNews';
import Yesterday from './Yesterday';
import Tomorrow from './Tomorrow'
import CurrentLive from './CurrentLive'

const Stack = createNativeStackNavigator();

const ANavigation = () => {
  return (
    <Stack.Navigator initialRouteName='dis'>
      <Stack.Screen name='WelcomePage' component={WelcomeScreen}
        options={{ headerShown: false }} />
      <Stack.Screen name='score' component={ScorePrediction}
        options={{ headerShown: false }} />
      <Stack.Screen name='scoreRes' component={ScoreResult}
        options={{ headerShown: false }} />
      <Stack.Screen name='winner' component={WinnerPrediction}
        options={{ headerShown: false }} />
      <Stack.Screen name='winnerRes' component={WinnerResult}
        options={{ headerShown: false }} />
      <Stack.Screen name='dis' component={Disclaimer}
        options={{ headerShown: false }} />
      <Stack.Screen name='live' component={LiveScore}
        options={{ headerShown: false }} />
      <Stack.Screen name='news' component={CricNews}
        options={{ headerShown: false }} />
      <Stack.Screen name='yesterday' component={Yesterday}
        options={{ headerShown: false }} />
      <Stack.Screen name='tomorrow' component={Tomorrow}
        options={{ headerShown: false }} />
      <Stack.Screen name='C_live' component={CurrentLive}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ANavigation