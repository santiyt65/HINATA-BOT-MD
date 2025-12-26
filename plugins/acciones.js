// Plugin unificado de acciones anime
// Autoría original: Destroy wa.me/584120346669
// Fusionado por GitHub Copilot

import fs from 'fs';
import path from 'path';

const accionesAnime = {
  angry: {
    emoji: '😡',
    frases: (name2, name) => name ? `\`${name2}\` *está enojado/a con* \`${name}\`.` : `\`${name2}\` *está enojado/a.*`,
    videos: [
      'https://files.catbox.moe/2aedd3.mp4',
      'https://files.catbox.moe/fqf4ey.mp4',
      'https://files.catbox.moe/v7ldgq.mp4',
      'https://files.catbox.moe/uedd7l.mp4',
      'https://files.catbox.moe/5stubg.mp4',
      'https://files.catbox.moe/phaft3.mp4',
    ]
  },
  bite: {
    emoji: '😅',
    frases: (name2, name) => name ? `\`${name2}\` *mordió a* \`${name}\`.` : `\`${name2}\` *se mordió a sí mismo*`,
    videos: [
      'https://files.catbox.moe/nssx5g.mp4',
      'https://files.catbox.moe/c23bw3.mp4',
      'https://files.catbox.moe/nxr7vx.mp4',
      'https://files.catbox.moe/j5yobc.mp4',
      'https://files.catbox.moe/o31g5x.mp4',
      'https://files.catbox.moe/c43d18.mp4',
    ]
  },
  hug: {
    emoji: '🫂',
    frases: (name2, name) => name ? `\`${name2}\` *le dio un fuerte abrazo a* \`${name}\`.` : `\`${name2}\` *se abrazó a sí mismo.*`,
    videos: [
      'https://telegra.ph/file/6a3aa01fabb95e3558eec.mp4',
      'https://telegra.ph/file/0e5b24907be34da0cbe84.mp4',
      'https://telegra.ph/file/6bc3cd10684f036e541ed.mp4',
      'https://telegra.ph/file/3e443a3363a90906220d8.mp4',
      'https://telegra.ph/file/56d886660696365f9696b.mp4',
      'https://telegra.ph/file/3eeadd9d69653803b33c6.mp4',
      'https://telegra.ph/file/436624e53c5f041bfd597.mp4',
      'https://telegra.ph/file/5866f0929bf0c8fe6a909.mp4',
    ]
  },
  kiss: {
    emoji: '🫦',
    frases: (name2, name) => name ? `\`${name2}\` *Le dio besos a* \`${name}\` *( ˘ ³˘)♥*.` : `\`${name2}\` *se besó a sí mismo ( ˘ ³˘)♥*`,
    videos: [
      'https://telegra.ph/file/d6ece99b5011aedd359e8.mp4',
      'https://telegra.ph/file/ba841c699e9e039deadb3.mp4',
      'https://telegra.ph/file/6497758a122357bc5bbb7.mp4',
      'https://telegra.ph/file/8c0f70ed2bfd95a125993.mp4',
      'https://telegra.ph/file/826ce3530ab20b15a496d.mp4',
    ]
  },
  pat: {
    emoji: '💆‍♂️',
    frases: (name2, name) => name ? `\`${name2}\` *acarició a* \`${name}\`.` : `\`${name2}\` *se acarició a sí mismo.*`,
    videos: [
      'https://telegra.ph/file/f75aed769492814d68016.mp4',
      'https://telegra.ph/file/4f24bb58fe580a5e97b0a.mp4',
      'https://telegra.ph/file/30206abdcb7b8a4638510.mp4',
      'https://telegra.ph/file/ecd7aeae5b2242c660d41.mp4',
      'https://telegra.ph/file/6d3ba201bcdd1fd2c1408.mp4',
      'https://telegra.ph/file/d5dbdcf845d2739dbe45e.mp4',
      'https://telegra.ph/file/c9a529908d4e0b71d7c5a.mp4',
      'https://telegra.ph/file/b7bc277ddef1af913827c.mp4',
      'https://telegra.ph/file/8b01e180dfb7e98d5a4f8.mp4',
      'https://telegra.ph/file/901f13852aa65f9628d96.mp4',
    ]
  },
  slap: {
    emoji: '👊',
    frases: (name2, name) => name ? `\`${name2}\` *golpeó a* \`${name}\`.` : `\`${name2}\` *se golpeó a sí mismo*.`,
    videos: [
      'https://telegra.ph/file/3ba192c3806b097632d3f.mp4',
      'https://telegra.ph/file/58b33c082a81f761bbee8.mp4',
      'https://telegra.ph/file/da5011a1c504946832c81.mp4',
      'https://telegra.ph/file/20ac5be925e6cd48f549f.mp4',
      'https://telegra.ph/file/a00bc137b0beeec056b04.mp4',
      'https://telegra.ph/file/080f08d0faa15119621fe.mp4',
      'https://telegra.ph/file/eb0b010b2f249dd189d06.mp4',
      'https://telegra.ph/file/734cb1e4416d80a299dac.mp4',
      'https://telegra.ph/file/fc494a26b4e46c9b147d2.mp4',
    ]
  },
};

let handler = async (m, { conn, usedPrefix, command }) => {
  const accion = accionesAnime[command];
  if (!accion) return;

  let who;
  if (m.mentionedJid.length > 0) {
    who = m.mentionedJid[0];
  } else if (m.quoted) {
    who = m.quoted.sender;
  } else {
    who = m.sender;
  }

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);
  m.react(accion.emoji);

  let str;
  if (m.mentionedJid.length > 0 || m.quoted) {
    str = accion.frases(name2, name);
  } else {
    str = accion.frases(name2);
  }

  if (m.isGroup) {
    const video = accion.videos[Math.floor(Math.random() * accion.videos.length)];
    await conn.sendFile(m.chat, video, 'video.mp4', str, m);
  } else {
    await m.reply(str);
  }
};

handler.command = Object.keys(accionesAnime);
handler.tags = ['anime'];
handler.help = Object.keys(accionesAnime).map(cmd => cmd);
handler.register = true;

export default handler;
