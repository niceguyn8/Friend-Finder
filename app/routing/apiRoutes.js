var friends = require("../data/friends.js");

// module.exports = function (app) {
//   app.get("/api/friends", function(req, res) {
//     res.json(friends);
//   });
// }

module.exports = (app) => {

  app.get("/api/friends", (req, res) => {
    res.json(friends);
  });

  app.post("/api/friends", (req, res) => {

    const bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // POST and parse user survey results

    var userData = req.body;
    var userScores = userData.scores;
    // var to store and calculate the diff between current user score and score's of users in db
    var totalDifference;

  // looping through potential friends
  for (var i = 0; i < friends.length; i++) {
    var currentFriend = friends[i];
    totalDifference = 0;

    console.log(currentFriend.name);

    // looping through scores of each friend
    for (var j = 0; j < currentFriend.scores.length; j++) {
      var currentFriendScore = currentFriend.scores[j];
      var currentUserScore = userScores[j];

      totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
    }

    if (totalDifference <= bestMatch.friendDifference) {
      bestMatch.name = currentFriend.name;
      bestMatch.photo = currentFriend.photo;
      bestMatch.friendDifference = totalDifference;
    }
  }

  // save userData to db
  friends.push(userData);
  // return json with user's bestMatch
  res.json(bestMatch);

  });
};
