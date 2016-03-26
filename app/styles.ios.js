'use strict';

/* ==============================
  Global styles
  =============================== */

// App Globals
const React = require('react-native');

var {
    StyleSheet,
} = React;

const Styles = StyleSheet.create({
	stage:{
		flex: 1
	},
	contentContainer:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'pink',
		paddingTop: 60
	}
});


module.exports = Styles;
