module.exports = (client, newUser, oldUser) => {
        if (oldUser.bot && oldUser.username !== newUser.username && newUser.username) 
            Bots.updateOne({ botid: newUser.id }, {$set: {username: newUser.username}});
    }