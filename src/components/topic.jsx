var React = require('react');
// var ReactDOM = require('react-dom');
var ImageStore = require('../stores/image-store');
var Actions = require('../actions');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview')
// var Header = require('./header');

module.exports = React.createClass({
   mixins: [
      Reflux.listenTo(ImageStore, 'onChange')
   ],
   getInitialState: function() {
      return {
         images:[]
      }
   },
   componentWillMount: function() {
      // console.log('Topic is about to render and fetch data');
      Actions.getImages('hot','viral','day')
   },
   render: function() {
   //     componentWillReceiveProps: function (nextProps) {
   //  console.log("nextProps", nextProps)
   //  if(this.props != nextProps)
   //    Actions.getImages(res, res1, res2)
   // },
   //   // const{...props}=this.props
      // console.log('Topic rendering with ID ' + this.props.params.id);
      // console.log('I have this many images ' + this.state.images.length);
      return <div className="topic">
         Selection-
         <select id = "dropdown" ref = "menu" onChange={this.ChangeSection} className="selectpicker">
           <option>Hot</option>
           <option>User</option>
           <option>Top</option>
         </select><br /><br />

         Sort -
         <select id = "dropdown1" ref = "menu1" onChange={this.ChangeSection} className="selectpicker">
           <option>Viral</option>
           <option>Top</option>
           <option>Time</option>
         </select><br /><br />

          Window -
         <select id = "dropdown2" ref = "menu2" onChange={this.ChangeSection} className="selectpicker">
           <option>Day</option>
           <option>Week</option>
           <option>Month</option>
           <option>Year</option>
           <option>All</option>
         </select><br /><br />


         <div></div>
         {this.renderImages()}
      </div>
   },
   renderImages:function () {
      return this.state.images.map(function (image) {
         return <ImagePreview key={image.id} {...image} />;
      });
   },
   onChange: function(event,images) {
      this.setState({images:images})
   },
   ChangeSection: function(event){
      let res = this.refs.menu.value
      let res1 = this.refs.menu1.value
      let res2 = this.refs.menu2.value
      console.log("res",res)
      console.log("res1",res1)
      console.log("res2",res2)
     Actions.getImages(res.toLowerCase(), res1.toLowerCase(), res2.toLowerCase())
   }
});
