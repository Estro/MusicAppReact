'use strict';

/* ==============================
  Global styles
  =============================== */

// App Globals
const React = require('react-native');

var {
    StyleSheet,
    Dimensions
} = React;

const windowSize = Dimensions.get('window');

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
		backgroundColor: 'white',
		padding: 20,
		paddingTop: 60
	},
	page:{
	  flexDirection: 'column',
      flex: 1,
      alignItems:'center',
      backgroundColor: 'transparent'
	},
	roundIcon: {
		width: 50,
	    height: 50,
	    borderRadius: 50 / 2,
	    backgroundColor: 'red',
	    position: 'absolute',
	    top: -10
	},
	navIconRight:{
		backgroundColor: 'transparent',
		paddingRight: 10,
		paddingTop: 10
	},
	cover: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
	navIconLeft:{
		backgroundColor: 'transparent',
		paddingLeft: 10,
		paddingTop: 10
	},
	centre: {
		flex:1,
	    flexDirection: 'column',
	    alignItems:'center',
	},
	centreAll: {
		flex:1,
	    flexDirection: 'column',
	    alignItems:'center',
	    justifyContent:'center'
	},
	inlineIcon:{
		marginRight: 10
	},
	marginTop: {
		marginTop: 40
	},
	marginTopLarge: {
		marginTop: 80
	},
	h1: {
		fontSize: 28,
		color: '#484848'
	},
	h2: {
		fontSize: 18,
		color: '#484848'
	},
	h4: {
		fontSize: 12,
		color: '#f36',
		marginBottom: 4,
		marginTop: 4
	},
	h5: {
		fontSize: 12,
		color: '#484848',
		margin: 4,

	}
});


module.exports = Styles;
