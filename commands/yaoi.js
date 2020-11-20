const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const data = await fetch(`http://www.reddit.com/r/yaoi/top/.json?sort=top&t=all&limit=50`)
    .then(response => response.json())
    .then(body => body.data);
  let isImage = false
  let randomSelection = Math.floor(Math.random() * data.children.length)
  while (!isImage) {
    if (data.children[randomSelection].data.post_hint === "image") {
      isImage = true
    } else {
      randomSelection = Math.floor(Math.random() * data.children.length)
    }
  }
  const imageURL = data.children[randomSelection].data.url
  return message.channel.send(new MessageEmbed().setImage(`${imageURL}`));
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yaoi"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "yaoi",
    category: "NSFW",
    description: "Yaoi.",
    usage: "yaoi"
  };
  