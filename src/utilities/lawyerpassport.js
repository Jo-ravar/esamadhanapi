var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
var Lawyer = require('../models/lawyers');  
var config = require('../utilities/config');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('lawyer payload received', jwt_payload);
    Lawyer.findOne({_id: jwt_payload.id}, function(err, lawyer) {
      if (err) {
        return done(err, false);
      }
      if (lawyer) {
        console.log("Lawyer is confirmed");
        done(null, lawyer);
      } else {
        done(null, false);
      }
    });
  }));
};