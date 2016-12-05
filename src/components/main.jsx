var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header');
var TopicList = require('./topics-list');
var Topic = require('./topic');

console.log('main');

module.exports = React.createClass({
  render: function() {
    return <div>
      <Header />
      {this.content()}
    </div>
  },
  content: function() {
    if(this.props.children) {
      return this.props.children
    } else {
      return <Topic />
    }
  }
});
