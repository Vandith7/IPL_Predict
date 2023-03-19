import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ANavigation from './screens/InningScreens/ANavigation';
import AppStatusBar from './globals/AppStatusBar';
const THEME_COLOR = 'black'
const RootNavigation = () => {
  return (
    <>
      <AppStatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
      <NavigationContainer>
        <ANavigation />
      </NavigationContainer>
    </>
  )
}

export default RootNavigation