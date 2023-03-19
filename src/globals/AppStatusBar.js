import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

const AppStatusBar = ({ backgroundColor, ...props }) => {
    return (

        <StatusBar backgroundColor={backgroundColor} />

    );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {

    },
});

export default AppStatusBar;