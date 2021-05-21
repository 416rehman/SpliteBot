const Command = require('../Command.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {fail, load} = require("../../utils/emojis.json")

module.exports = class HateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hate',
      aliases: ['fuck', 'allmyhomies', 'homies'],
      usage: 'hate <text>',
      description: 'Generates an "all my homies hate" image with provided text',
      type: client.types.FUN,
      examples: ['hate Splite is the best bot!']
    });
  }
  async run(message, args) {
    if (message.guild.funInProgress.has(message.author.id)) return message.channel.send(new MessageEmbed().setDescription(`${fail} Please wait, you already have a request pending.`))
    if (!args[0]) return this.sendErrorMessage(message, 0, 'Please provide some text');
    message.guild.funInProgress.set(message.author.id, 'fun');

    message.channel.send(new MessageEmbed().setDescription(`${load} Loading...`)).then(async msg=>{
      try {
        const text = message.mentions.users.size > 0 ? message.mentions.users.first().username : args.join(' ')
        const buffer = await msg.client.utils.generateImgFlipImage(242461078, `${text}`, `${text}`)
        console.log(buffer)
        if (buffer)
        {
          const attachment = new MessageAttachment(buffer, "allmyhomieshate.png");

          await message.channel.send(attachment)
          await msg.delete()
        }
      }
      catch (e) {
        await msg.edit(new MessageEmbed().setDescription(`${fail} ${e}`))
      }
    })
    message.guild.funInProgress.delete(message.author.id)
  }
};
