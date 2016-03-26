'use strict';

/* ==============================
 Root Homepage View
  =============================== */

// View Globals
const React = require('react-native');
const MapOfEventsView = require('./map');
const NavigationBar = require('react-native-navbar');
const GlobalStyles = require('../styles.ios.js');

var {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
} = React;


/**
 *  Main View
 */
var ScreenView = React.createClass({
    getInitialState: function(){
        return {
            user: this.props.route.passProps.user
        };
    },
    render() {
        const rightButtonConfig = {
            title: 'Next',
            handler: () => this.props.navigator.push({
                component: MapOfEventsView,
            }),
        };

        const titleConfig = {
            title: 'Hello, world',
        };

        return (
        <View style={GlobalStyles.stage}>
            <View style={GlobalStyles.contentContainer}>
            <TouchableHighlight
                underlayColor="#f4f4f4"
                style={styles.button}
                onPress={() => rightButtonConfig.handler()}>
                    <Text style={styles.btnText}>
                     View Map
                    </Text>
                </TouchableHighlight>
                 <Text>{this.state.user.name}</Text>
            </View>
        <NavigationBar
        title={titleConfig}
        rightButton={rightButtonConfig} tintColor='transparent' />
          </View>
        );
    }
});

const styles = StyleSheet.create({
    stage:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'pink',
        paddingTop: 60
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        height: 30,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    btnText: {
        marginTop: 6
    },
});


module.exports = ScreenView;
