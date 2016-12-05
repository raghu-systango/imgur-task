var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var Actions = require('../actions');
var CommentBox = require('./comment-box');


module.exports = React.createClass({
   mixins: [
      Reflux.listenTo(ImageStore, 'onChange'),
      Reflux.listenTo(CommentStore, 'onChange')
   ],
   getInitialState: function () {
      return {
         image:null,
         comment:null
      }
   },
   componentWillMount: function() {
     Actions.getImage(this.props.params.id);
   },
   render: function() {
    console.log(this.state.image)
     return <div>
       {this.state.image ? this.renderContent() : null}
     </div>
   },
   renderContent: function () {
      return <div className="image-detail">
         <div className="panel  panel-default">
            <div className="panel-heading">
               <h4> Title: {this.state.image.title}</h4>
               <h4> UpVotes: {this.state.image.ups}</h4>
               <h4> DownVotes: {this.state.image.downs}</h4>
               <h4> Views: {this.state.image.views}</h4>
               <h4> Score: {this.state.image.score}</h4>
            </div>
            <div className="panel-body">
               {this.renderImage()}
            </div>
            <div className="panel-footer">
              <h5>{this.state.image.description}</h5>
            </div>
          </div>
          <h3>Comments</h3>
          {this.renderComments()}
        </div>
      },
      renderComments: function() {
        if(!this.state.comments){
          return null
        }

        return <CommentBox comments={this.state.comments} />
   },
   renderImage: function () {
      if (this.state.image.animated){
         return <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline>
                 <source src={this.state.image.mp4} type='video/mp4'></source>
               </video>
      } else {
         return <img src={this.state.image.link} />
      }
   },
   onChange: function() {
     this.setState({
       image: ImageStore.find(this.props.params.id),
       comments: CommentStore.comment
     });
   }
 });
