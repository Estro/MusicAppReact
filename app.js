'use strict';

/* ==============================
  Initialise App
  =============================== */

// App Globals
const React = require('react-native');
const InitialScreen = require('./app/views/login');

var {
    View,
    Navigator,
} = React;


/**
 *  Main App Navigation
 */
var App = React.createClass({
	renderScene(route, navigator) {
  		return <route.component route={route} navigator={navigator} />;
	},
    render() {

    const initialRoute = {
      component: InitialScreen
    };

    return (
      <View style={{ flex: 1, }}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={this.renderScene}/>
      </View>
    );
	}
});

module.exports = App;
