'use strict';

/* ==============================
 Root Homepage View
  =============================== */

// View Globals
const React = require('react-native');
const MapOfEventsView = require('./map');
const LoginView = require('./login');
const NavigationBar = require('react-native-navbar');
const GlobalStyles = require('../styles.ios.js');
const FBSDKLogin = require('react-native-fbsdklogin');
const FBSDKCore = require('react-native-fbsdkcore');

var {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
} = React;

var {
  FBSDKLoginButton,
} = FBSDKLogin;


/**
 *  Main View
 */
var ScreenView = React.createClass({
    getInitialState: function(){
        return {
            user: []
        };
    },
    logout() {
         this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[0]);
    },
    render() {
        var rightButtonConfig = {
            title: 'Next',
            handler: () => this.props.navigator.push({
                component: MapOfEventsView,
            }),
        };

        var titleConfig = {
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
                 <FBSDKLoginButton
              onLoginFinished={(error, result) => {}}
              onLogoutFinished={() => this.logout() }/>
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
