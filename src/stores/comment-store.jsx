var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
   listenables: [Actions],
   getImage: function (id) {
      Api.get('allimages/' + id + '/comments')
         .then(function(json) {
            console.log("aaaaaaaaaaaaaaaaaaaaaa", json)
            this.comment = json.images.data;
            this.triggerChange();
         }.bind(this));
   },
   triggerChange: function () {
      this.trigger('change', this.comment) 
   }

});
