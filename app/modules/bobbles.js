'use strict';

var React = require('react-native');
const GlobalStyles = require('../styles.ios.js');

var {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} = React;

var PRESSED = false;
var NUM_BOBBLES = 3;
var RAD_EACH = Math.PI / 2 / (NUM_BOBBLES);
var RADIUS = 120;


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


class AnimationExampleBobbles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.bobbles = BOBBLES.map((_, i) => {
      return new Animated.ValueXY();
    });

    this.state.bobbleResponder = PanResponder.create({
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
  }

  	goToMap() {
		// this.props.navigator.push({
	 //        component: MapOfEventsView,
	 //    });
	 alert('Hellp');
	}

  render() {
    return (
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
            <Text style={styles.count}>19</Text>
            <Text style={styles.subTitle}>Events around you</Text>
            </Animated.View>
            :
            <TouchableHighlight onPress={() => this.goToMap()}>
             <Animated.View
              {...handlers}
              key={i}
              style={[stying, {
                backgroundColor: color,                             // re-renders are obvious
                transform: this.state.bobbles[j].getTranslateTransform(), // simple conversion
              }]}
            >
            </Animated.View>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
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


module.exports = AnimationExampleBobbles;
