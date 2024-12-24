


global.owner = ["6289502378666"] //ganti dengan nomor anda
global.name = ["Adam Dev"] //ganti dengan nama anda 

global.mess = {
    owner: "Fitur Khusus Owner",
    wait: "Tolong Tunggu Sebentar!",
    register: "Sepertinya Anda Belum Terdaftar,Silahkan Ketik .register"
    }

let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
