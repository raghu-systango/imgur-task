var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImages: function(selection_type, sort_type, window_type){
    console.log("selection_type", selection_type)
    console.log("sort_type", sort_type)
    console.log("window_type", window_type)
    Api.get('allimages/' + selection_type + '/' + sort_type + '/' + window_type)
      .then(function(json){
        console.log(json.images.data)
        this.images = _.reject(json.images.data, function(image) {
          return image.is_album
        });

        this.triggerChange();
      }.bind(this));
  },
  deleteImageLink: function(id){
    console.log("dadadsad")
    console.log(id)
    console.log(this.images)
    this.images.map((image, index) => {
      if (image.id === id) {
        console.log('delete link')
        delete this.images.index;
      }
    })
    console.log('11111', this.images)

  },
  getImage: function(id) {
    Api.get('gallery/image/' + id)
      .then(function(json){
        if(this.images){
          this.images.push(json.data);
        } else {
          this.images = [json.data];
        }

        this.triggerChange();
      }.bind(this));
  },
  find: function(id){
    var image = _.find(this.images, {id: id});

    if(image) {
      return image
    } else {
      this.getImage(id);
      return null
    }
  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});
