'use strict';

/* ==============================
 MAP View
  =============================== */

// View Globals

const React = require('react-native');
const MapView = require('react-native-maps');
const Icon = require('react-native-vector-icons/Ionicons');
const PanController = require('../modules/pan');
const NavigationBar = require('react-native-navbar');
const GlobalStyles = require('../styles.ios.js');
const PriceMarker = require('../modules/event-marker');
const BREAKPOINT2 = 350;

var {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} = React;

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 51.5034070;
const LONGITUDE = -0.1275920;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ITEM_SPACING = 5;
const ITEM_PREVIEW = 1;
const ITEM_WIDTH = screen.width;
const SNAP_WIDTH = ITEM_WIDTH;
const ITEM_PREVIEW_HEIGHT = 35;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;

var ScreenView = React.createClass({
  getInitialState() {
    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scale = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [1, 1.6],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });

    const ONE = new Animated.Value(1);

    const markers = [
      {
        id: 0,
        amount: 99,
        name: 'Easter Sunday Party at Tiger London',
        venue: 'Tiger Tiger',
        time: 'Starts at 13:30',
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
      },
      {
        id: 1,
        amount: 199,
       	name: 'NTS Presents: Voice Of The Eagle at the ICA',
       	venue: 'Bobs Bar',
       	time: 'Starts at 18:00',
        coordinate: {
          latitude: LATITUDE + 0.004,
          longitude: LONGITUDE - 0.004,
        },
      },
       {
        id: 2,
        amount: 99,
        name: 'Easter Sunday Party at Tiger London',
        venue: 'Tiger Tiger',
        time: 'Starts at 13:30',
        coordinate: {
          latitude: LATITUDE + 0.006,
          longitude: LONGITUDE - 0.006,
        },
      }
    ];

    const animations = markers.map((m, i)  => {
      const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH/2;
      const xRight = -SNAP_WIDTH * i - SNAP_WIDTH/2;
      const xPos = -SNAP_WIDTH * i;

      const isIndex = panX.interpolate({
        inputRange: [xRight - 1, xRight, xLeft, xLeft+1],
        outputRange: [0, 1, 1, 0],
        extrapolate: 'clamp',
      });

      const isNotIndex = panX.interpolate({
        inputRange: [xRight - 1, xRight, xLeft, xLeft+1],
        outputRange: [1, 0, 0, 1],
        extrapolate: 'clamp',
      });

      const center = panX.interpolate({
        inputRange: [xPos - 10, xPos, xPos + 10],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      });

      const selected = panX.interpolate({
        inputRange: [xRight, xPos, xLeft],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      });

      const translateY = Animated.multiply(0.5, panY);

      const translateX = panX;

      const anim = Animated.multiply(isIndex, scrollY.interpolate({
        inputRange: [0, BREAKPOINT1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }));

      const scale = Animated.add(ONE, Animated.multiply(isIndex, scrollY.interpolate({
        inputRange: [BREAKPOINT1, BREAKPOINT2],
        outputRange: [0, SCALE_END-1],
        extrapolate: 'clamp',
      })));

      // [0 => 1]
      var opacity = scrollY.interpolate({
        inputRange: [BREAKPOINT1, BREAKPOINT2],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });

      // if i === index: [0 => 0]
      // if i !== index: [0 => 1]
      opacity = Animated.multiply(isNotIndex, opacity);


      // if i === index: [1 => 1]
      // if i !== index: [1 => 0]
      opacity = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      });

      var markerOpacity = scrollY.interpolate({
        inputRange: [0, BREAKPOINT1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });

      markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      });

      var markerScale = selected.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
      });

      return {
        translateY,
        translateX,
        scale,
        opacity,
        anim,
        center,
        selected,
        markerOpacity,
        markerScale,
      };
    });

    return {
      panX,
      panY,
      animations,
      index: 0,
      canMoveHorizontal: true,
      canMoveVert: true,
      scrollY,
      scrollX,
      scale,
      translateY,
      markers,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      region: new Animated.Region({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
  },
  componentWillUnmount(){
  	panX.removeAllListeners();
  	panY.removeAllListeners();
  },

  componentDidMount() {
    var { region, panX, panY, scrollX, markers } = this.state;

    this.setState({navigationBarHidden: false});


    //  navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     this.setState({initialPosition});
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });

    panX.addListener(this.onPanXChange);
    panY.addListener(this.onPanYChange);

    region.stopAnimation();

    region.timing({
      latitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.latitude),
      }),
      longitude: scrollX.interpolate({
        inputRange: markers.map((m, i) => i * SNAP_WIDTH),
        outputRange: markers.map(m => m.coordinate.longitude),
      }),
      duration: 0,
    }).start();
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  onPanXChange({ value }) {
    var { index, region, panX, markers } = this.state;
    var newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);

    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  },

  onPanYChange({ value }) {
    var { canMoveHorizontal, region, scrollY, scrollX, markers, index } = this.state;

    var shouldBeMovable = Math.abs(value) < 2;

    if (shouldBeMovable !== canMoveHorizontal) {
      this.setState({ canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        var { coordinate } = markers[index];
        region.stopAnimation();

        region.timing({
          latitude: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [coordinate.latitude, coordinate.latitude - LATITUDE_DELTA / 3 * 0.375],
            extrapolate: 'clamp',
          }),
          latitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LATITUDE_DELTA, LATITUDE_DELTA / 3],
            extrapolate: 'clamp',
          }),
          longitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA / 3],
            extrapolate: 'clamp',
          }),
          duration: 0,
        }).start();
      } else {
        region.stopAnimation();
        region.timing({
          latitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.latitude),
          }),
          longitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.longitude),
          }),
          duration: 0,
        }).start();
      }
    }
  },

  render() {
    const {
      panX,
      panY,
      animations,
      canMoveHorizontal,
      canMoveVert,
      markers,
      region,
    } = this.state;

var rightButtonConfig = {
        title: 'Next',
        handler: () => this.props.navigator.push({
            component: MapOfEventsView,
        }),
    };

    var titleConfig = {
        title: 'Around You',
    };

    return (
      <View style={styles.container}>
        <PanController
          style={styles.container}
          vertical={canMoveVert}
          horizontal={canMoveHorizontal}
          xMode="snap"
          snapSpacingX={SNAP_WIDTH}
          yBounds={[-1 * screen.height, 0]}
          xBounds={[-screen.width * (markers.length-1), 0]}
          panY={panY}
          panX={panX}
        >
          <MapView.Animated
            style={styles.map}
            region={region}
            onRegionChange={this.onRegionChange}
          >
            {markers.map((marker, i) => {
              const {
                selected,
                markerOpacity,
                markerScale,
              } = animations[i];

              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                >
                  <PriceMarker
                    style={{
                      opacity: markerOpacity,
                      transform: [
                        { scale: markerScale },
                      ],
                    }}
                    amount={marker.amount}
                    selected={selected}
                  />
                </MapView.Marker>
              );
            })}
          </MapView.Animated>
          <View style={styles.itemContainer}>
            {markers.map((marker, i) => {
              const {
                translateY,
                translateX,
                scale,
                opacity,
              } = animations[i];

              return (
                <Animated.View
                  key={marker.id}
                  style={[styles.item, {
                    opacity,
                    transform: [
                      { translateY },
                      { translateX },
                      { scale },
                    ],
                  }]}
                >
                <View style={styles.detailsContainer}>
                    <Text style={GlobalStyles.h5}>
                    <Icon name="ios-location" size={12} color="#4FD2C2" style={GlobalStyles.inlineIcon}/>  {marker.venue}  <Icon name="ios-clock" size={12} color="#4FD2C2" style={GlobalStyles.inlineIcon}/>  {marker.time}</Text>
                	<Text style={GlobalStyles.h2}>{marker.name}</Text>
				</View>


                <View style={styles.itemIcon}>
                	<Icon name="ios-more-outline" size={35} color="#FFF" style={styles.icon}/>
				</View>
                </Animated.View>
              );
            })}
          </View>
        </PanController>
        <NavigationBar
        title={titleConfig}
        rightButton={<Icon name="ios-settings-strong" size={25} color="#f36" style={GlobalStyles.navIconRight}/>}
        leftButton={<Icon name="ios-arrow-back" size={25} color="#f36" style={GlobalStyles.navIconLeft} onPress={() => this.props.navigator.pop()} />}
        tintColor='white' />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64
  },
  map: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  item: {
    width: ITEM_WIDTH,
    height: screen.height + 2 * ITEM_PREVIEW_HEIGHT,
    backgroundColor: '#FFF',
  },
  itemIcon: {
	width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#f36',
    position: 'absolute',
    top: -22,
    right: 15,
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
	},
	icon:{
		backgroundColor: 'transparent'
	},
	detailsContainer:{
		padding: 15,
	}
});

module.exports = ScreenView;
