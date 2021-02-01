const Discord = require("discord.js");
const fs = require("fs");
const cache = JSON.parse(fs.readFileSync("./caches.json", "utf8"))
const config = JSON.parse(fs.readFileSync("./tokens.json", "utf8"))
const token = config.tokens;
const figlet = require('figlet');
const print = console.green;

token.forEach(acc => {
    const client = new Discord.Client();
    client.on("ready", () => {
    if(cache.dm == "off") {
    setInterval(() => {
        figlet(cache.msg, function(err, dataed) {
            if (err) {
                print(`\`\`\`apache\nErr; ${err}\`\`\``);
                }
let ch = client.guilds.get(cache.serverid).channels.get(cache.channelid)
ch.send(`\`\`\`fix\n${dataed}\`\`\``)
print("Sended One Message")
            })
}, cache.delay);
    }
    
    if(cache.dm == "on") {
        setInterval(() => {
            figlet(cache.msg, function(err, dataed) {
                if (err) {
                    print(`\`\`\`apache\nErr; ${err}\`\`\``);
                    }
            let ch = client.users.get(cache.serverid).send(`\`\`\`fix\n${dataed}\`\`\``)
            print("Sended One Message")
                })
            }, cache.delay)
        }})
    client.login(acc)
    });
