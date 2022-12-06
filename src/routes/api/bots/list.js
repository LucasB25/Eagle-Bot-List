const { Router } = require("express");
const getList = require('@utils/getList.js')

const route = Router();

route.get("/", async (req, res) => {
    res.json(await getList()) //will return un-verified bots
});

module.exports = route;
