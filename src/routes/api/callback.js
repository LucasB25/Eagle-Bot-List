const { Router } = require("express");
const passport = require('passport');
const { server } = require("@root/config.json");
const perms1 = require("@root/config.json");
const { web: { domain_with_protocol } } = require("@root/config.json");
const route = Router();

route.get("/", passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
  if(!server.website_logs){
        res.redirect("/me");
    }else{
        res.redirect("/me");
  }
});

module.exports = route;
