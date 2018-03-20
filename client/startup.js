Meteor.startup(function() {
  Meteor.subscribe("allJobs");

  // Because of the server settings, the code below will
  // only work if the client is authenticated.
  // On the server, all of it would run unconditionally.

  // Create a job:
  var job = new Job(
    myJobs,
    "sendEmail", // type of job
    // Job data that you define, including anything the job
    // needs to complete. May contain links to files, etc...
    {
      address: "bozo@clowns.com",
      subject: "Critical rainbow hair shortage",
      message: "LOL; JK, KThxBye."
    }
  );

  // Set some properties of the job and then submit it
  job
    .priority("normal")
    .retry({
      retries: 5,
      wait: 15 * 60 * 1000
    }) // 15 minutes between attempts
    .delay(60 * 60 * 1000) // Wait an hour before first try
    .save(); // Commit it to the server

  // Now that it's saved, this job will appear as a document
  // in the myJobs Collection, and will reactively update as
  // its status changes, etc.

  // Any job document from myJobs can be turned into a Job object
  job = new Job(myJobs, myJobs.findOne({}));

  // Or a job can be fetched from the server by _id
  myJobs.getJob(_id, function(err, job) {
    // If successful, job is a Job object corresponding to _id
    // With a job object, you can remotely control the
    // job's status (subject to server allow/deny rules)
    // Here are some examples:
    job.pause();
    job.cancel();
    job.remove();
    // etc...
  });
});
