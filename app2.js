'use strict';

/* ==============================
  Initialise App
  =============================== */


// App Globals
var React = require('react-native');
var RootView = require('./app/views/root');

var {
    StyleSheet,
    NavigatorIOS,
} = React;

/**
 *  Main App
 */
var App = React.createClass({
    getInitialState: function() {
        return {
            navigationBarHidden: true
        };
    },

    render: function() {
        return (
        	<NavigatorIOS
        	style={styles.nav}
        	navigationBarHidden={this.state.navigationBarHidden}
        	initialRoute={{title: 'Home', component: RootView}}/>
        );
    }
});

const styles = StyleSheet.create({
    nav: {
        flex: 1
    }
});

/**
 *  Export Module
 */
module.exports = App;
