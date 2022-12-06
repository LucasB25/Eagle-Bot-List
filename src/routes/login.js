const { Router } = require("express");
const passport = require('passport');
const route = Router();

route.get("/", passport.authenticate('discord', { scope: ['identify', 'guilds'], prompt: "consent" }), function(req, res) {});

module.exports = route;
