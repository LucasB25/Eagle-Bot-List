const { Router } = require("express");

const approve = require("@routes/api/admin/approve");
const deny = require("@routes/api/admin/deny");

const route = Router();

route.use("/approve", approve);
route.use("/deny", deny);

module.exports = route;
