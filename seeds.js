var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name: "camp 1",
    img: "https://cdn.pixabay.com/photo/2017/11/29/16/12/dark-mood-food-2986532__340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices, nulla eget luctus auctor, lectus magna sagittis ex, eu viverra dolor orci id lectus. Proin nec dignissim ipsum. Fusce lacinia dolor ut iaculis pulvinar. Nunc feugiat dui nisl, eu rutrum tortor iaculis vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut erat risus, suscipit vel volutpat vel, pulvinar eu nibh. In non aliquet velit. Etiam dapibus eros varius odio elementum, sed egestas arcu bibendum. Donec sagittis, nulla eget ultricies pretium, diam felis pulvinar sapien, ut accumsan risus magna at nulla. Sed vitae nulla vel magna pretium tempus. Nunc posuere a felis in elementum. Vivamus ac ligula at lacus faucibus dignissim egestas nec mauris. Integer nisl quam, luctus sed velit quis, varius mattis quam. Etiam vel auctor mi. Proin a erat tincidunt, porttitor tellus sit amet, accumsan neque."
  },
  {
    name: "camp 2",
    img: "https://cdn.pixabay.com/photo/2016/06/04/14/09/cat-1435590__340.jpg",
    description: "Aenean aliquam pretium est in tempor. Etiam hendrerit nibh finibus pellentesque consectetur. In eget metus laoreet, hendrerit felis sed, facilisis ante. Maecenas libero odio, dignissim vitae posuere in, sodales sed turpis. Duis suscipit turpis dolor, eget mollis est faucibus sit amet. Morbi pulvinar orci luctus, lobortis ligula sodales, mattis sapien. Integer a varius nisi. Fusce non consectetur massa. Nam eget gravida odio. Fusce porttitor pellentesque diam at tempus. Duis et lacinia sapien. Pellentesque fringilla turpis nisl, sed vulputate massa lobortis vel. Aenean id nisi quis velit rutrum fringilla. Nam ut mollis ex, nec auctor ante. Suspendisse id maximus leo. Praesent fermentum odio quis laoreet venenatis."
  },
  {
    name: "camp 3",
    img: "https://cdn.pixabay.com/photo/2017/12/10/18/36/spurn-point-3010549__340.jpg",
    description: "In dictum lorem lacus, nec consequat lectus tristique in. Donec malesuada consequat tellus, ac pulvinar quam varius eget. Morbi aliquet nibh id elit fermentum, sit amet pretium sapien elementum. Integer ac risus eros. Vestibulum feugiat consequat mi. Praesent ullamcorper ultrices ipsum, eu aliquam nulla dignissim at. Nulla mattis at nisl id rhoncus. Suspendisse potenti. Donec in turpis laoreet, tincidunt velit id, tincidunt enim."
  },
  {
    name: "camp 4",
    img: "https://cdn.pixabay.com/photo/2017/12/19/20/34/swan-3028659__340.jpg",
    description: "Donec leo ligula, dignissim quis tincidunt non, rhoncus convallis lorem. Aliquam erat volutpat. Etiam nec quam nunc. Proin feugiat neque vel neque venenatis maximus. Quisque ac ornare eros. Nam eget ipsum lacus. Duis semper velit ligula, sed vestibulum diam tincidunt id. Mauris fringilla turpis interdum, ultrices augue et, interdum eros. Proin dapibus rutrum arcu, ac rhoncus nisi egestas at. Suspendisse dignissim faucibus nunc, nec cursus nisl finibus non."
  }
];
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
         if(err){
             console.log(err);
         }
          //add a few campgrounds
         data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err)
                 } else {
                     //create a comment
                    //  Comment.remove({}, function(err){
                    //      if (err) {
                    //          console.log(err);
                    //      }
                    //  });
                     Comment.create(
                         {
                             text: "This place is great, but I wish there was internet",
                             author: "Homer"
                         }, function(err, comment){
                             if(err){
                                 console.log(err);
                             } else {
                                 campground.comments.push(comment);
                                 campground.save();;
                             }
                         });
                 }
             });
         });
     }); 
     //add a few comments
 }
 

module.exports = seedDB;