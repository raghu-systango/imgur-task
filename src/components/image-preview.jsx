var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');

// {this.state.ignore ? this.ignore() : null}
module.exports = React.createClass({
  mixins: [
      Reflux.listenTo(ImageStore, 'onChange')
   ],
  getInitialState: function() {
    return {
      hovering: false,
      ignore:false
    }
  },
  render: function() {
    return <Link
      to={"images/" + this.props.id}
      className="image-preview"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
      {this.props.animated && this.state.hovering ? this.video() : this.image()}
      {this.props.animated && !this.state.hovering ? this.icon() : null}
      {this.state.hovering? this.ignore(event) : null}
    </Link>
  },
  onChange: function(event,images) {
      this.setState({images:images})
  },
  ignore: function (event) {
    return <div className="inset">
      <button type="button" onClick={() => this.ignoreImage(this.props.id)}>ignore this!</button>
    </div>
  },
  ignoreImage: function (image_id) {
    console.log("image_id", image_id)
    Actions.deleteImageLink(image_id)
      },
  inset: function () {
    return <div className="inset">
      Ignore this
    </div>;
  },
  image: function() {
    var link = 'http://i.imgur.com/' + this.props.id + 'h.jpg';

    return <img src={link} />
  },
  video: function() {
    return <div>
      <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline>
        <source src={this.props.mp4} type='video/mp4'></source>
      </video>
    </div>
  },
  icon: function () {
    return <div>
      <span className="glyphicon glyphicon-play"></span>
    </div>;
  },
  handleMouseEnter: function() {
    this.setState({hovering: true, ignore:true});
  },
  handleMouseLeave: function() {
    this.setState({hovering: false, ignore:false});
  }
});
