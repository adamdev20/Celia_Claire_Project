


global.owner = ["6289502378666"] //change to your number
global.name = ["Adam Dev"] //change to your name

global.mess = {
    owner: "Owner-specific Features",
    wait: "Please wait a moment!"
    }

let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
