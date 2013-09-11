// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require subreddit

// for more details see: http://emberjs.com/guides/application/
Subreddit = Ember.Application.create();

Subreddit.IndexRoute = Ember.Route.extend({
	model: function() {
		return Subreddit.RedditLink.findAll('aww');
	}
});

Subreddit.IndexController = Ember.ObjectController.extend({
	subredditHeader: "aww",
	loadList:function(){	
		// Grab the value from the input
		var value = this.get('subreddit');

		if (value){
			this.set('subredditHeader', value);
			this.set('model', Subreddit.RedditLink.findAll(value));
			// Clear the input
			this.set('subreddit', '');
		}
	}
});

Subreddit.RedditLink = Ember.Object.extend({

	thumbnailUrl:function(){
		var thumbnail = this.get('thumbnail');
		return (thumbnail === 'default')? null:thumbnail;
	}.property('thumbnail')

});

Subreddit.RedditLink.reopenClass({

	findAll:function(subreddit){
		var	links = [];
		
		$.getJSON("http://www.reddit.com/r/" + subreddit + "/.json?jsonp=?").then(function(response){
			response.data.children.forEach(function(child){
				links.pushObject(Subreddit.RedditLink.create(child.data));
			});
		});

		return links;
	}

});

$(function(){ $(document).foundation(); });
