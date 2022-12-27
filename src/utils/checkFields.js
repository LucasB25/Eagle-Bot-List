const recaptcha2 = require('recaptcha2')
//const is = require('is-html'); //todo désactivé soucis version

const { server: { id }, bot_options: {
  max_owners_count,
  max_bot_tags,
  bot_tags,
  max_summary_length,
  min_description_length,
  max_description_length
}, web: { recaptcha_v2: { site_key, secret_key } } } = require("@root/config.json");

const recaptcha = new recaptcha2({
  siteKey: site_key,
  secretKey: secret_key
})

function isValidUrl(string) {
  try { new URL(string); }
  catch (_) { return false; }
  return true;
}

const allowed = 'https://imgur.com/'
const isValidUrlimgur = (string) => string.substr(0, allowed.length) === allowed

const allowed1 = 'https://donatebot.io/checkout/'
const isValidUrldonation = (string) => string.substr(0, allowed1.length) === allowed1

module.exports = async (req, b = null) => {
  let data = req.body;

  // User hasn't submitted a captcha
  if (!data.recaptcha_token)
    return { success: false, message: "Invalid Captcha" }

  // Validate captcha
  try {
    await recaptcha.validate(data.recaptcha_token)
  } catch (e) {
    return { success: false, message: "Invalid Captcha" }
  }

  if(isNaN(data.botid)) return { success: false, message: "The Client ID is invalid" }

  // Check that all the fields are filled in
  if (!data.long.length || !data.description.length || !data.prefix.length)
    return { success: false, message: "Invalid submission. Check you filled all the fields." }

  // Max length for summary and note
  if (data.description.length > max_summary_length) return { success: false, message: "Your short description is too long." };
  if (String(data.note).length > max_summary_length) return { success: false, message: "Your note is too long." };

  // Check if summary or note has HTML.
  const pattern = (/<(?!\/p)(?!p)(?!\/strong)(?!strong)(?!\/em)(?!em)(?!\/u)(?!u)(?!\/s)(?!s)(?!\/a)(?!a)(\"[^\"]*\"|'[^']*'|[^'\">])*>/gmi);
  if (pattern.test(data.description))
    return { success: false, message: "HTML is not supported in your bot summary" };
  if (pattern.test(data.note))
    return { success: false, message: "HTML is not supported in your note" };
  if (pattern.test(data.long))
    return { success: false, message: "HTML is not supported in your long description" };

  // Check that the bot's HTML description isn't too long
  let stripped = data.long.replace("/<[^>]*>/g")
  if (stripped.length < min_description_length)
    return { success: false, message: "Your detailed description is too short" }
  if (stripped.length > max_description_length)
    return { success: false, message: "Your detailed description is too long" }

  // Check that all the links are valid
  if (data.invite && !isValidUrl(data.invite))
    return { success: false, message: "Invalid Invite Link" }
  if (data.support && !isValidUrl(data.support))
    return { success: false, message: "Invalid Support server" }
  if (data.website && !isValidUrl(data.website))
    return { success: false, message: "Invalid Website" }
  if (data.github && !isValidUrl(data.github))
    return { success: false, message: "Invalid Github repository" }
  if (data.banner && !isValidUrlimgur(data.banner))
    return { success: false, message: "Invalid banner" }
  if (data.donation && !isValidUrldonation(data.donation))
    return { success: false, message: "Invalid Donation URL" }
  if (data.webhook && !isValidUrl(data.webhook))
    return { success: false, message: "Invalid Webhook URL" }

  // Check bot tags are valid
  if (data.tags) {
    if (!Array.isArray(data.tags))
      return { success: false, message: "Invalid bot tags" }
    if (data.tags.length > max_bot_tags)
      return { success: false, message: `Select up to ${max_bot_tags} tags max` }
    if (!data.tags.every(val => bot_tags.includes(val)))
      return { success: false, message: `Invalid tag(s)` }
  }

  // Check the user is in the main server.
  try {
    await req.app.get('client').guilds.cache.get(id).members.fetch(req.user.id);
  } catch (e) {
    return { success: false, message: "You aren't in the server", button: { text: "Join", url: "/join" } }

  }
  // Search for a user with discord
  let bot;
  try {
    bot = await req.app.get('client').users.fetch(req.params.id)
    if (!bot.bot)
      return { success: false, message: "Invalid ID. User is not a bot" }
  } catch (e) {
    // Invalid bot ID
    if (e.message.endsWith("is not snowflake.") || e.message == "Unknown User")
      return { success: false, message: "Invalid bot ID" }
    else
      return { success: false, message: "Could not find user" }
  }


  /* 
      Check that the user signed is either:
      - The primary owner
      - An additional owner
      - A server admin
  */
  if (
    b &&
    b.owners.primary !== req.user.id &&
    !b.owners.additional.includes(req.user.id) &&
    !req.user.staff
  )
    return { success: false, message: "Invalid request. Please sign in again.", button: { text: "Logout", url: "/logout" } }

  // If the additional owners have been changed, check that the primary owner is editing it
  if (
    b &&
    data.owners.replace(',', '').split(' ').remove('').join() !== b.owners.additional.join() &&
    b.owners.primary !== req.user.id
  )
    return { success: false, message: "Only the primary owner can edit additional owners" };

  let users = []
  if (data.owners)
    users = data.owners.replace(',', '').split(' ').remove('').filter(id => /[0-9]{16,20}/g.test(id))

  try {
    /* 
        Filter owners:
        - Is in the server
        - Is not a bot user
        - Is not duplicate
    */
    users = await req.app.get('client').guilds.cache.get(id).members.fetch({ user: users });
    users = [...new Set(users.map(x => { return x.user }).filter(user => !user.bot).map(u => u.id))];

    // Check if additional owners exceed max
    if (users.length > max_owners_count)
      return { success: false, message: `You can only add up to ${max_owners_count} additional owners` };

    return { success: true, bot, users }
  } catch (e) {
    return { success: false, message: "Invalid Owner IDs" };
  }
}
