var React = require('react-native');
var {
  AppRegistry,
  } = React;

var App = require('./app');

var MapsExplorer = React.createClass({
  render() {
    return <App />
  },
});

AppRegistry.registerComponent('AwesomeProject1', () => MapsExplorer);


