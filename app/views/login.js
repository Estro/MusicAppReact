'use strict';

/* ==============================
  Login Screen
  =============================== */

// App Globals
const React = require('react-native');
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');
const MapOfEventsView = require('./root');
const FBSDKLogin = require('react-native-fbsdklogin');
const FBSDKCore = require('react-native-fbsdkcore');

var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  AsyncStorage,
  Image
} = React;

var {
  FBSDKLoginButton,
} = FBSDKLogin;

var {
  FBSDKGraphRequest,
} = FBSDKCore;

var {
  FBSDKAccessToken,
} = FBSDKCore;

var Login = React.createClass({
    getInitialState: function(){
        FBSDKAccessToken.getCurrentAccessToken((token) => {
          if (token.tokenString){
            this.props.navigator.push({
                title: 'Map',
                component: MapOfEventsView
            });
          }
        });

        return null;
    },
    getProfile: function(){
        var _this = this;
        // Create a graph request asking for friends with a callback to handle the response.
        var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
          if (error) {
            alert('Error making request.');
          } else {
            AsyncStorage.setItem("user", JSON.stringify(result)).then(function(){
                _this.props.navigator.push({
                    title: 'Map',
                    component: MapOfEventsView
                });
            }).done();
          }
        }, '/me?fields=name,picture.width(720).height(720)');

        // Start the graph request.
        fetchFriendsRequest.start();
    },
      render: function() {
        return (
            <View style={styles.container}>
                <Image style={styles.bg} source={{uri: 'http://inspirationfeed.com/wp-content/uploads/2011/07/5843271754_4a80461e4b_o1.gif'}} />
                <View style={styles.header}>
                    <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.signin}>
                       <FBSDKLoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  alert('Error logging in.');
                } else {
                  if (result.isCancelled) {
                    alert('Login cancelled.');
                  } else {
                    this.getProfile();
                  }
                }
              }}
              onLogoutFinished={() => alert('Logged out.')}
              readPermissions={['user_events', 'public_profile', 'email']}
              publishPermissions={[]}/>
                    </View>
                </View>
            </View>
        );
      }
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        marginTop: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25,
        padding: 20
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})

module.exports = Login;
