[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## 🎭 Features

- ✅ Certified Bot
- ✅ Top Bot
- ✅ Admin Page
- ✅ Bot Tags
- ✅ And much more!
- ✅ Server count API
- ✅ Support MARKDOWN descriptions
- ✅ Support HTML descriptions

## 📎 Requirements

- [Nodejs](https://nodejs.org/download/release/v16.18.1/) v16 and more
- [Discord.js](https://github.com/discordjs/discord.js/) v13

### 🌐 Main

- Discord bot's
  token `You should know why you need this or you won't go to this repo` [Get or create bot here](https://discord.com/developers/applications)
- Mongodb
  URI `for custom prefix` [MongoDB](https://account.mongodb.com/account/login)
- Your ID `for eval command. It's dangerous if eval accessible to everyone`
- Configure your Recaptcha [Recaptcha](https://www.google.com/recaptcha/admin/create)

## 🚀 Installation from source

```bash
git clone https://github.com/LucasB25/Eagle-Bot-List.git
```

After cloning, run

```bash
npm install
```

- Start the bot with `node src/index.js`

to snag all of the dependencies. Of course, you need [node](https://nodejs.org/download/release/v16.18.1/) installed. I also strongly recommend [nodemon](https://www.npmjs.com/package/nodemon) as it makes testing _much_ easier.

## Intents

<p align="center">
  <a href="https://github.com/LucasB25/Eagle-Bot-List">
    <img src="https://media.discordapp.net/attachments/848492641585725450/894114853382410260/unknown.png">

  </a>
</p>
When you are running the Code you must have gotten this Error. To fix this head over to your Bot's Discord Application and go to the Bot Settings and find this:

<p align="center">
  <a href="https://github.com/LucasB25/Eagle-Bot-List">
    <img src="https://user-images.githubusercontent.com/50886682/196232974-d9cfc18c-92c5-43bd-b1bc-ff1cae3df701.png">

  </a>
</p>
Then turn on both of those Settings and click "Save Changes". Then you are done and it should be fixed!
<!-- CONFIGURATION -->

## ⚙️ Configurations

- edit in `config.json`

```js
      "discord_client": {
    "id": "BOT_ID_HERE",
    "token": "TOKEN_HERE",
    "secret": "SECRET_HERE",
    "prefix": "PREFIX"
  },
  "web": {
    "domain_with_protocol": "http://localhost",
    "port": 80,
    "ratelimit": 100,
    "recaptcha_v2": {
      "site_key": "SITE_KEY_HERE",
      "secret_key": "SECRET_KEY_HERE"
    }
  },
  "mongo_url": "MONGO_URL",
  "server": {
    "id": "SERVER_ID_HERE",
    "invite": "https://discord.gg/fbJFAs43vD",
    "like_log": "VOTE__CHANNEL_ID_HERE",
    "botOwners": "OWNER_ID_HERE",
    "mod_log_id": "MOD__CHANNEL_ID_HERE",
    "website_logs": "WEBSITE__CHANNEL_ID_HERE",
    "admin_user_ids": ["ADMIN_ID_HERE"],
    "role_ids": {
      "bot": "BOT_ROLE_ID_HERE",
      "bot_verifier": "BOT_VERIFIER_ROLE_ID_HERE",
      "bot_developer": "BOT_DEVELOPPER_ROLE_ID_HERE",
      "cert_user": "CERTIF_USER_ROLE_ID_HERE",
      "cert_bot": "CERTIF_BOT_ROLE_ID_HERE"
    },
    "botreviewer": ["REVIEWER_ID_HERE"]
  },
```

<!-- ABOUT THE PROJECT -->

## 💌 Support Server

[![DiscordBanner](https://invidget.switchblade.xyz/fbJFAs43vD)](https://discord.gg/fbJFAs43vD)<br />

## 🤝 Contributing

1. [Fork the repository](https://github.com/LucasB25/Eagle-Bot-List/fork)
2. Clone your fork: `git clone https://github.com/your-username/Eagle-Bot-List.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Stage changes `git add .`
5. Commit your changes: `cz` OR `npm run commit` do not use `git commit`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request

<!-- LICENSE -->

## 🔐 License

- Distributed under the Apache-2.0 license License. See [`LICENSE`](https://github.com/LucasB25/Eagle-Bot-List/blob/main/LICENSE) for more information.
- You must leave the mention of Panais development, in the footer.

[contributors-shield]: https://img.shields.io/github/contributors/LucasB25/Eagle-Bot-List.svg?style=for-the-badge
[contributors-url]: https://github.com/LucasB25/Eagle-Bot-List/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LucasB25/Eagle-Bot-List.svg?style=for-the-badge
[forks-url]: https://github.com/LucasB25/Eagle-Bot-List/network/members
[stars-shield]: https://img.shields.io/github/stars/LucasB25/Eagle-Bot-List.svg?style=for-the-badge
[stars-url]: https://github.com/LucasB25/Eagle-Bot-List/stargazers
[issues-shield]: https://img.shields.io/github/issues/LucasB25/Eagle-Bot-List.svg?style=for-the-badge
[issues-url]: https://github.com/LucasB25/Eagle-Bot-List/issues
[license-shield]: https://img.shields.io/github/license/LucasB25/Eagle-Bot-List.svg?style=for-the-badge
[license-url]: https://github.com/LucasB25/Eagle-Bot-List/blob/main/LICENSE

