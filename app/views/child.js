var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} = React;

var MapView = require('./map');

var ITEM_SPACING = 5;

var RootView = React.createClass({
    render() {
        return (
          <View style={styles.container}>

          </View>
        );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  btnText:{
    marginTop: 6
  }
});


module.exports = RootView;
