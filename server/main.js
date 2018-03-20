import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
  var myJobs = JobCollection("myJobQueue");
  myJobs.allow({
    // Grant full permission to any authenticated user
    admin: function(userId, method, params) {
      return userId ? true : false;
    }
  });

  Meteor.startup(function() {
    // Normal Meteor publish call, the server always
    // controls what each client can see
    Meteor.publish("allJobs", function() {
      return myJobs.find({});
    });

    // Start the myJobs queue running
    return myJobs.startJobServer();
  });
}
