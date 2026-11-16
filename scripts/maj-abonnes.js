// Mise à jour mensuelle des abonnés affichés sur le site (lancée par GitHub chaque mois).
// Mêmes sources que l'appli Bloom : YouTube (clé API), TikTok et Instagram (Apify), Twitch (interface publique).
// Sécurités : un chiffre introuvable ou anormal (÷2 ou ×3 d'un coup) n'est jamais publié, l'ancien est gardé.
'use strict';
const fs = require('fs');
const path = require('path');

const FICHIER = path.join(__dirname, '..', 'js', 'data.js');
const YT = 'https://www.googleapis.com/youtube/v3/channels';
const APIFY = 'https://api.apify.com/v2';
const BAISSE_MAX = 0.5;   // en dessous de 50 % de l'ancien chiffre : suspect
const HAUSSE_MAX = 3;     // au-dessus de 3 fois l'ancien chiffre : suspect

async function json(r, quoi) {
  if (!r.ok) throw new Error(quoi + ' répond ' + r.status);
  return r.json();
}

async function youtube(lien, f, cle) {
  if (!cle) throw new Error('clé YouTube absente');
  const m = lien.match(/\/@([^\/?#]+)/) || lien.match(/\/channel\/(UC[\w-]{22})/);
  if (!m) throw new Error('lien YouTube non reconnu');
  const p = new URLSearchParams({ part: 'statistics', key: cle });
  if (m[1].startsWith('UC') && m[1].length === 24) p.set('id', m[1]); else p.set('forHandle', '@' + decodeURIComponent(m[1]));
  const d = await json(await f(YT + '?' + p), 'YouTube');
  const st = d.items && d.items[0] && d.items[0].statistics;
  if (!st || st.hiddenSubscriberCount) throw new Error('chaîne introuvable ou abonnés masqués');
  return Number(st.subscriberCount);
}

async function apify(f, token, acteur, input) {
  if (!token) throw new Error('clé Apify absente');
  const h = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
  const url = APIFY + '/acts/' + acteur + '/run-sync-get-dataset-items?timeout=240&clean=true';
  return json(await f(url, { method: 'POST', headers: h, body: JSON.stringify(input) }), 'Apify');
}

async function tiktok(lien, f, cles) {
  const m = lien.match(/tiktok\.com\/@([\w.\-]+)/i);
  if (!m) throw new Error('lien TikTok non reconnu');
  const items = await apify(f, cles.apify, 'clockworks~tiktok-scraper', {
    profiles: [m[1]], resultsPerPage: 1, profileScrapeSections: ['videos'], profileSorting: 'latest',
    shouldDownloadVideos: false, shouldDownloadCovers: false, shouldDownloadSlideshowImages: false,
    shouldDownloadAvatars: false, shouldDownloadMusicCovers: false,
  });
  const it = (items || []).find(x => x && x.authorMeta && typeof x.authorMeta.fans === 'number');
  if (!it) throw new Error('abonnés TikTok introuvables');
  return it.authorMeta.fans;
}

async function instagram(lien, f, cles) {
  const m = lien.match(/instagram\.com\/([\w.]+)/i);
  if (!m) throw new Error('lien Instagram non reconnu');
  const items = await apify(f, cles.apify, 'apify~instagram-profile-scraper', { usernames: [m[1]] });
  const p = (items || [])[0];
  if (!p || typeof p.followersCount !== 'number') throw new Error('abonnés Instagram introuvables');
  return p.followersCount;
}

async function twitch(lien, f) {
  const m = lien.match(/twitch\.tv\/([A-Za-z0-9_]{2,25})/);
  if (!m) throw new Error('lien Twitch non reconnu');
  const d = await json(await f('https://gql.twitch.tv/gql', {
    method: 'POST',
    headers: { 'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'query{user(login:"' + m[1].toLowerCase() + '"){followers{totalCount}}}' }),
  }), 'Twitch');
  const n = d && d.data && d.data.user && d.data.user.followers && d.data.user.followers.totalCount;
  if (typeof n !== 'number') throw new Error('chaîne Twitch introuvable');
  return n;
}

const SOURCES = { YouTube: youtube, TikTok: tiktok, Instagram: instagram, Twitch: twitch };

async function mettreAJour({ f = fetch, cles = { youtube: process.env.YOUTUBE_KEY, apify: process.env.APIFY_TOKEN }, fichier = FICHIER } = {}) {
  const lignes = fs.readFileSync(fichier, 'utf8').split('\n');
  let createur = '?';
  const rapport = { maj: [], gardes: [], alertes: [] };
  for (let i = 0; i < lignes.length; i++) {
    const ln = lignes[i];
    const nomTalent = ln.match(/^\s{6}nom: "([^"]+)",\s*$/);
    if (nomTalent) createur = nomTalent[1];
    const m = ln.match(/\{ nom: "(\w+)", compte: "[^"]*", abonnes: (\d+), lien: "([^"]+)" \}/);
    if (!m || !SOURCES[m[1]]) continue;
    const [, plateforme, ancienTxt, lien] = m;
    const ancien = Number(ancienTxt);
    const qui = createur + ' (' + plateforme + ')';
    let nouveau;
    try {
      nouveau = await SOURCES[plateforme](lien, f, cles);
    } catch (e) {
      rapport.alertes.push(qui + ' : ' + e.message + ', chiffre gardé (' + ancien + ')');
      continue;
    }
    if (!Number.isFinite(nouveau) || nouveau <= 0) { rapport.alertes.push(qui + ' : chiffre invalide, gardé'); continue; }
    if (ancien > 0 && (nouveau < ancien * BAISSE_MAX || nouveau > ancien * HAUSSE_MAX)) {
      rapport.alertes.push(qui + ' : ' + ancien + ' → ' + nouveau + ' semble anormal, pas publié');
      continue;
    }
    if (nouveau === ancien) { rapport.gardes.push(qui); continue; }
    lignes[i] = ln.replace('abonnes: ' + ancienTxt + ',', 'abonnes: ' + nouveau + ',');
    rapport.maj.push(qui + ' : ' + ancien + ' → ' + nouveau);
  }
  fs.writeFileSync(fichier, lignes.join('\n'));
  return rapport;
}

if (require.main === module) {
  mettreAJour().then(r => {
    console.log('Mis à jour :\n  ' + (r.maj.join('\n  ') || 'aucun'));
    if (r.alertes.length) {
      console.log('\nÀ vérifier :\n  ' + r.alertes.join('\n  '));
      fs.writeFileSync(path.join(__dirname, '..', 'alertes.txt'), r.alertes.join('\n'));
    }
  }).catch(e => { console.error(e); process.exit(1); });
}

module.exports = { mettreAJour };
