Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		// ensure user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments");

		if(!commentAttributes.body)
			throw new Meteor.Error(422, "Please write some comment");

		if(!commentAttributes.postId)
			throw new Meteor.Error(422, "You must comment on a psot");

		comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		return Comments.insert(comment);
	}
});