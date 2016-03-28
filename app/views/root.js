'use strict';

/* ==============================
 Root Homepage View
  =============================== */

// View Globals
const React = require('react-native');
const MapOfEventsView = require('./map');
const LoginView = require('./login');
const Icon = require('react-native-vector-icons/Ionicons');
const NavigationBar = require('react-native-navbar');
const GlobalStyles = require('../styles.ios.js');
const FBSDKLogin = require('react-native-fbsdklogin');
const FBSDKCore = require('react-native-fbsdkcore');
var {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    Dimensions,
    PanResponder,
    Animated
} = React;

var {
  FBSDKLoginButton,
} = FBSDKLogin;

const screen = Dimensions.get('window');

const NUM_BOBBLES = 3;
const RAD_EACH = Math.PI / 2 / (NUM_BOBBLES);
const RADIUS = 120;

var PRESSED = false;
var BOBBLES = [{
    id: 'centre',
    x: 0,
    y: 0
},{
    id: 'list',
    x: 30,
    y: 120
},{
    id: 'map',
    x: 125,
    y: 40,
}];


/**
 *  Main View
 */
var ScreenView = React.createClass({
    getInitialState: function(){
    var bobbles = BOBBLES.map((_, i) => {
      return new Animated.ValueXY();
     });

    var bobbleResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if(!PRESSED){
        BOBBLES.forEach((spot, idx) => {
          Animated.spring(this.state.bobbles[idx], {
            toValue: spot,                // spring each bobble to its spot
            friction: 3,                  // less friction => bouncier
          }).start();
        });
        PRESSED = true;
        } else {
        this.state.bobbles.forEach((bobble, i) => {
            Animated.spring(bobble, {
              toValue: {x: 0, y: 0}           // all bobbles return to zero
            }).start();
            PRESSED = false;
      });
        }
      }
    });

        return {
            user: [],
            count: 19,
            pulse: new Animated.ValueXY(),
            bobbles: bobbles,
            bobbleResponder: bobbleResponder

        };
    },
    getStyle: function() {
    return [
              styles.pulse,
              {
                transform: this.state.pulse.getTranslateTransform()
              }
            ];
  },
    componentDidMount(){
        var _this = this;
        var i = 0;
        var eventCount = setInterval(function(){
                _this.setState({count: i});
                i++;

                if(i > 19){
                    clearInterval(eventCount);
                }
        }, 70);
    },
    logout() {
         this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[0]);
    },
    goToMap(){
        this.props.navigator.push({
            component: MapOfEventsView,
        });
    },
    render() {
        var rightButtonConfig = {
            title: 'Next',
            handler: () => this.props.navigator.push({
                component: MapOfEventsView,
            }),
        };

        var titleConfig = {
            title: '',
        };

        return (
        <View style={GlobalStyles.stage}>
            <View style={GlobalStyles.contentContainer}>
                <View style={GlobalStyles.page}>
                    <View style={GlobalStyles.centre}>
                        <Text style={[GlobalStyles.h1, GlobalStyles.marginTopLarge]}>Good Morning!</Text>
                        <View style={styles.bobbleContainer}>
                            {this.state.bobbles.map((_, i) => {
                              var j = this.state.bobbles.length - i - 1; // reverse so lead on top
                              var handlers = j > 0 ? {} : this.state.bobbleResponder.panHandlers;
                              var stying = j > 0 ? styles.circleShape : styles.core;
                              var color = j === 0 ? '#4FD2C2' : '#f36';
                              return ( j === 0 ?
                                <Animated.View
                                  {...handlers}
                                  key={i}
                                  style={[stying, {
                                    backgroundColor: color,                             // re-renders are obvious
                                    transform: this.state.bobbles[j].getTranslateTransform(), // simple conversion
                                  }, GlobalStyles.centreAll]}
                                >
                                <Text key={1000} style={styles.count}>{this.state.count}</Text>
                                <Text key={2000} style={styles.subTitle}>Events around you</Text>
                                </Animated.View>
                                :
                                <TouchableHighlight key={i + 'Touchs'} onPress={() => this.goToMap()}>
                                 <Animated.View
                                  {...handlers}
                                  key={i}
                                  style={[stying, {
                                    backgroundColor: color,                             // re-renders are obvious
                                    transform: this.state.bobbles[j].getTranslateTransform(), // simple conversion
                                  }]}
                                >
                                <Icon name="map" size={30} style={styles.iconCircle}></Icon>
                                </Animated.View>
                                </TouchableHighlight>
                              );
                            })}
                          </View>
                    </View>

                </View>
            </View>
        <NavigationBar
        title={titleConfig}
        rightButton={<Icon name="ios-gear" size={28} color="#f36" style={GlobalStyles.navIconRight}/>} tintColor='transparent' />
        </View>
        );
    }
});

const styles = StyleSheet.create({
    stage:{
        backgroundColor: 'white'
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
    iconCircle: {
        backgroundColor: 'transparent',
        color: '#FFF',
        paddingLeft: 16,
        paddingTop: 15

    },
    button: {
        height: 30,
        backgroundColor: 'red',
    },
    btnText: {
        marginTop: 6
    },
    pulse: {
        width: 160,
        height:160,
        borderRadius:160 / 2,
        backgroundColor: 'blue',
        marginTop: 40
    },
    count:{
        backgroundColor: "transparent",
        fontSize: 60,
        color: '#FFF'
    },
    subHeading:{
        fontSize: 11,
        color: '#FFF'
    },
    core: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    backgroundColor: '#4FD2C2',
    marginTop: 40
  },
  circle: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 50/2
  },
  circleShape:{
    position: 'absolute',
    width: 60,
    height:60,
    borderRadius:60 / 2,
    backgroundColor: '#4FD2C2',
    top: 85,
    left: 45
},
  bobbleContainer: {

  },
  count: {
    fontSize: 50,
    color: '#FFF'
  },
  subTitle:{
    marginTop: -5,
    color: '#FFF',
    fontSize: 10
  }
});


module.exports = ScreenView;
