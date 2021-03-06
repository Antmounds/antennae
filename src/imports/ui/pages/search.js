import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

// import { Images } from '../../api/images/images.js';
import './search.html';
//import { Searches } from '../../api/searches/searches.js';


Template.search.created = function(){
	console.log(`${this.view.name} created`);
	$('.tooltipped').tooltip({enterDelay: 10, inDuration: 0});
  this.isSearching = new ReactiveVar( false );
  Session.set('search', false);
	//self.curSearches = new ReactiveDict(null);

	// self.autorun(() => {
	// 	self.subscribe("searches.get");
	// 	console.log(`Search is ${self.subscriptionsReady() ? 'ready' : 'not ready'}`);
	// });
};

Template.search.rendered = function(){
	console.log(`${this.view.name} rendered`);
	//$('.modal').modal();
};

Template.search.helpers({

  isSearching(){
    return Template.instance().isSearching.get();
  },

  search() {
    let s = Session.get('search');//Template.instance().search.get();
    // console.log(s);
    return s;
  },
});

Template.search.events({
  'change #newPost'(event, instance) {
  	event.preventDefault();
  	if(event.target.files && event.target.files[0]){
      if(event.target.files[0].size > 20000000){
        alert("image too large! Max size: 20MB");
        // console.log(event.target.files);
        return false;
      };

      Session.set('search', true);
      instance.isSearching.set(true);

  		let reader = new FileReader();

  		reader.onload = function(e) {
        //$("#postImg").attr('src', e.target.result);
        //Session.set("pic", e.target.result);
        let data = {};
        data.img = e.target.result;
        // data.img = event.target.files[0];
        // let imageId = Images.insert({
        //   file: data.img,
          // onUploaded(error, fileObj) {
          //   if (error) {
          //     alert('Error during upload: ' + error);
          //   } else {
          //     alert('File "' + fileObj.name + '" successfully uploaded');
          //   }
          //   template.currentFile.set(false);
          // },
          // streams: 'dynamic',
          // chunkSize: 'dynamic'
          // isBase64: true, // <— Mandatory
          // fileName: 'pic1.jpg'
          // streams: 'dynamic',
          // chunkSize: 'dynamic'
        // });
        // console.log(imageId);
        // return;
        data.matchThreshold = Session.get('matchThreshold');
        data.stationName = Session.get('stationName');
        //console.log(data);
        Meteor.call('search.face', data, (error, result) => {
          if(error){
            let e = JSON.stringify(error, null, 4);
            console.log(e);
            alert(error.message);
          }else{
            console.log(result);
            let search = {
              img: data.img,
              tags: result ? result.labels : false,
              faceDetails: result && result.faceDetails[0] ? `${result.faceDetails[0].AgeRange.Low}-${result.faceDetails[0].AgeRange.High} yr old ${(result.faceDetails[0].Beard.Value ? 'bearded ' : '')}${result.faceDetails[0].Gender.Value} ${(result.faceDetails[0].Mustache.Value ? 'with mustache ' : '')}who appears ${result.faceDetails[0].Emotions[0].Type}${(result.celebrity[0] ? ` and looks like ${result.celebrity[0].Name} (${(Math.round(result.celebrity[0].MatchConfidence * 10) / 10)}%)` : '')}. They are ${(result.faceDetails[0].Eyeglasses.Value||result.faceDetails[0].Eyeglasses.Value ? '' : 'not ')}wearing ${(result.faceDetails[0].Eyeglasses.Value||result.faceDetails[0].Eyeglasses.Value ? (result.faceDetails[0].Eyeglasses.Value ? 'eye' : 'sun') : '')}glasses and are ${(result.faceDetails[0].Smile.Value ? '' : 'not ')}smiling with their mouth ${(result.faceDetails[0].MouthOpen.Value ? 'open' : 'closed')} and eyes ${(result.faceDetails[0].EyesOpen.Value ? 'open' : 'closed')}.` : false,
              persons: result.persons,
              celebrity: result && result.celebrity ? result.celebrity : false,
              displayName: result.persons[0] && result.persons[0].image_id ? `${result.persons[0].image_id}` : false
            };
            console.log(search);
            //let m = instance.search.get();
            //m.unshift(moment);
            //sessionStorage.setItem('moment', JSON.stringify(m));
            //instance.search.set(search);
            Session.set('search', search);
            instance.isSearching.set(false);
            //localTimeline.insert(moment);
          }
        });
      };

      reader.readAsDataURL(event.target.files[0]);
  	}
  },
});