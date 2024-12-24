//ERROR? hub wa.me/639300771484

require("./config");

const fs = require("fs");
const util = require("util");
const axios = require("axios");
const { exec } = require("child_process");
const chalk = require("chalk");
const path = require("path");
const moment = require("moment-timezone");

const cheerio = require("cheerio");

module.exports = async (adam, m) => {
  try {
    const body =
      (m.mtype === "conversation" && m.message.conversation) ||
      (m.mtype === "imageMessage" && m.message.imageMessage.caption) ||
      (m.mtype === "documentMessage" && m.message.documentMessage.caption) ||
      (m.mtype === "videoMessage" && m.message.videoMessage.caption) ||
      (m.mtype === "extendedTextMessage" &&
        m.message.extendedTextMessage.text) ||
      (m.mtype === "buttonsResponseMessage" &&
        m.message.buttonsResponseMessage.selectedButtonId) ||
      (m.mtype === "templateButtonReplyMessage" &&
        m.message.templateButtonReplyMessage.selectedId) ||
      "";

    const budy = typeof m.text === "string" ? m.text : "";
    const prefixRegex = /^[°zZ#$@*+,.?=''():%^&><`~|/\\]/;
    const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ".";
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const sender = m.key.fromMe
      ? adam.user.id.split(":")[0] + "@s.whatsapp.net" || adam.user.id
      : m.key.participant || m.key.remoteJid;
    const botNumber = await adam.decodeJid(adam.user.id);
    const senderNumber = sender.split("@")[0];
    const isCreator =
      (m &&
        m.sender &&
        [botNumber, ...global.owner]
          .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
          .includes(m.sender)) ||
      false;
    const pushname = m.pushName || `${senderNumber}`;
    const isBot = botNumber.includes(senderNumber);
    const color = chalk;

    let quoted = m.quoted ? m.quoted : m;

    if (isCmd) {
      console.log("FROM", `${pushname}`, "Text :", `${body}`);
    }

    const isMedia = (message) => {
      const mediaTypes = [
        "imageMessage",
        "videoMessage",
        "audioMessage",
        "documentMessage",
        "stickerMessage",
      ];
      return mediaTypes.some((type) => message.message[type]);
    };

    //>>REGISTER FUNCTION<<

    const registerFilePath = path.join(__dirname, "./database/register.json");

    const loadRegisterData = () => {
      if (!fs.existsSync(registerFilePath)) {
        fs.writeFileSync(registerFilePath, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(registerFilePath));
    };

    const saveRegisterData = (data) => {
      fs.writeFileSync(registerFilePath, JSON.stringify(data, null, 2));
    };

    let registerData = loadRegisterData();

    //>>TIME FUNCTION<<

    function isRegistered(sender) {
      return registerData.some((user) => user.id === sender);
    }

    function getFormattedDate() {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
    }

    let d = new Date(new Date() + 3600000);
    let locale = "id";
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const hariini = d.toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return hours + " jam " + minutes + " menit " + seconds + " detik";
    }

    function msToDate(ms) {
      temp = ms;
      days = Math.floor(ms / (24 * 60 * 60 * 1000));
      daysms = ms % (24 * 60 * 60 * 1000);
      hours = Math.floor(daysms / (60 * 60 * 1000));
      hoursms = ms % (60 * 60 * 1000);
      minutes = Math.floor(hoursms / (60 * 1000));
      minutesms = ms % (60 * 1000);
      sec = Math.floor(minutesms / 1000);
      return days + " Hari " + hours + " Jam " + minutes + " Menit";
    }

    const timee = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (timee < "23:59:00") {
      var waktuucapan = "Selamat Malam";
    }
    if (timee < "19:00:00") {
      var waktuucapan = "Selamat Petang";
    }
    if (timee < "18:00:00") {
      var waktuucapan = "Selamat Sore";
    }
    if (timee < "15:00:00") {
      var waktuucapan = "Selamat Siang";
    }
    if (timee < "10:00:00") {
      var waktuucapan = "Selamat Pagi";
    }
    if (timee < "05:00:00") {
      var waktuucapan = "Selamat Subuh";
    }
    if (timee < "03:00:00") {
      var waktuucapan = "Tengah Malam";
    }

    switch (command) {
      case "menu":
      case "allmenu": {
        if (!isRegistered(sender)) {
          return m.reply(global.mess.register);
        }

        await adam.sendMessage(m.chat, {
          react: {
            text: "🕐", 
            key: m.key,
          },
        });

        setTimeout(async () => {
          await adam.sendMessage(m.chat, {
            react: {
              text: "✅", 
              key: m.key,
            },
          });
        }, 200); 

        const menuText = `Hallo ${pushname} ${waktuucapan}👋🏻
    `;

        const fVerif = {
          key: {
            participant: "0@s.whatsapp.net",

            remoteJid: "status@broadcast",
          },

          message: { conversation: `_*${hariini}*_` },
        };

        await adam.sendMessage(
          m.chat,
          {
            text: menuText,

            contextInfo: {
              quotedMessage: fVerif.message,

              quotedStanzaID: fVerif.key.id,

              quotedParticipant: fVerif.key.participant,

              externalAdReply: {
                title: `Milicent BlueNnight`,

                body: "https://github.com/adamdev20",

                mediaType: 1,

                thumbnail: fs.readFileSync(
                  path.join(__dirname, "./media/menu.png")
                ),

                ai: true,

                renderLargerThumbnail: false,

                showAdAttribution: true,
              },
            },
          },
          { quoted: fVerif }
        );

        break;
      }

      case "register": {
        const userExists = registerData.find((user) => user.id === sender);

        if (userExists) {
          await adam.sendMessage(m.chat, {
            text: "Anda sudah terdaftar sebelumnya!",
          });
        } else {
          const newUser = {
            id: sender,
            name: pushname,
            registeredAt: hariini,
          };

          registerData.push(newUser);
          saveRegisterData(registerData);

          await adam.sendMessage(m.chat, {
            text: `Registrasi berhasil! Selamat datang, ${pushname}! \n\nID: ${newUser.id}\nNama: ${newUser.name}\nWaktu Registrasi: ${hariini}`,
          });
        }
        break;
      }

      case "checkuser": {
        if (!isCreator) return m.reply(global.mess.owner);

        const userList = registerData
          .map(
            (user) =>
              `ID: ${user.id}\nNama: ${user.name}\nWaktu: ${user.registeredAt}`
          )
          .join("\n\n");

        const response = userList || "Belum ada pengguna yang terdaftar.";

        await adam.sendMessage(m.chat, {
          text: `*Pengguna Terdaftar:*\n\n${response}`,
        });
        break;
      }

      case "h":
      case "hidetag":
        if (!isRegistered(sender)) {
          return m.reply(global.mess.register);
        }

        if (!text) return m.reply("");

        const participants = await adam
          .groupMetadata(m.chat)
          .then((res) => res.participants);

        await adam.sendMessage(
          m.chat,
          {
            text: text ? text : "",

            mentions: participants.map((a) => a.id),
          },
          { quoted: m }
        );

        break;

      default:
        if (budy.startsWith("=>")) {
          if (!isCreator) return;
          try {
            m.reply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            m.reply(String(e));
          }
        }

        if (budy.startsWith(">")) {
          if (!isCreator) return;
          try {
            const result = await eval(
              `(async () => { ${
                budy.startsWith(">>") ? "return" : ""
              } ${q} })()`
            );
            m.reply(util.format(result));
          } catch (e) {
            m.reply(String(e));
          }
        }

        if (budy.startsWith("$")) {
          if (!isCreator) return;
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(String(err));
            if (stdout) return m.reply(stdout);
          });
        }
    }
  } catch (err) {
    console.log(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  delete require.cache[file];
  require(file);
});
