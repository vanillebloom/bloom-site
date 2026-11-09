/* =========================================================
   CONTENU DU SITE BLOOM
   C'est le seul fichier à modifier pour mettre à jour
   les marques, les talents et les campagnes.
   Une image vide ("") affiche un emplacement en attendant.
   ========================================================= */

window.BLOOM = {

  /* ---------- MARQUES (bandeau qui défile sur l'accueil) ----------
     logo : chemin vers l'image, ex. "images/marques/nom-marque.png"
     fond : couleur de fond de la pastille quand le logo a son propre fond
            (ex. logo blanc sur rouge), pour garder les couleurs de la marque
     remplir : true si l'image remplit toute la pastille (logo sur fond travaillé)
     contour : true pour garder le contour bleu (logos sur fond blanc ou très clair)
     rond    : logo au format carré, affiché dans un rond sur la page Campagnes (vue « Par marque »)  */
  marques: [
    { nom: "HyperX", logo: "images/marques/hyperx.webp", fond: "#E31838", rond: "images/marques/rond/hyperx.jpg" },
    { nom: "MaxEsport", logo: "images/marques/maxesport.webp", remplir: true, contour: true, rond: "images/marques/rond/maxesport.jpg" },
    { nom: "Filmora", logo: "images/marques/filmora.webp", remplir: true, rond: "images/marques/rond/filmora.jpg" },
    { nom: "War Thunder", logo: "images/marques/war-thunder.webp", remplir: true, rond: "images/marques/rond/war-thunder.jpg" },
    { nom: "FragPunk", logo: "images/marques/fragpunk.webp", remplir: true, rond: "images/marques/rond/fragpunk.jpg" },
    { nom: "AutoFull", logo: "images/marques/autofull.webp", remplir: true, contour: true, rond: "images/marques/rond/autofull.jpg" },
    { nom: "Logitech G", logo: "images/marques/logitech.webp", remplir: true, rond: "images/marques/rond/logitech-g.jpg" },
    { nom: "SIHOO", logo: "images/marques/sihoo.webp", remplir: true, rond: "images/marques/rond/sihoo.jpg" },
    { nom: "Coupert", logo: "images/marques/coupert.webp", remplir: true, rond: "images/marques/rond/coupert.jpg" },
    { nom: "REDMAGIC", logo: "images/marques/redmagic.webp", remplir: true, rond: "images/marques/rond/redmagic.jpg" },
    { nom: "FlexiSpot", logo: "images/marques/flexispot.webp", remplir: true, rond: "images/marques/rond/flexispot.jpg" },
    { nom: "Air Up", logo: "images/marques/airup.webp", remplir: true, rond: "images/marques/rond/air-up.jpg" },
    { nom: "Surfshark", logo: "images/marques/surfshark.webp", remplir: true, rond: "images/marques/rond/surfshark.jpg" },
    { nom: "Holy", logo: "images/marques/holy.webp", remplir: true, rond: "images/marques/rond/holy.jpg" },
    { nom: "GearUp", logo: "images/marques/gearup.webp", remplir: true, rond: "images/marques/rond/gearup.jpg" },
    { nom: "Raid Shadow", logo: "images/marques/raid.webp", remplir: true, contour: true, rond: "images/marques/rond/raid-shadow-legends.jpg" },
    { nom: "IQUNIX", logo: "images/marques/iqunix.webp", remplir: true, rond: "images/marques/rond/iqunix.jpg" },
    { nom: "SteelSeries", logo: "images/marques/steelseries.webp", remplir: true, rond: "images/marques/rond/steelseries.jpg" },
    // Marques sans logo sur l'accueil : seulement le rond de la page Campagnes
    { nom: "OperaGX", rond: "images/marques/rond/operagx.jpg" },
    { nom: "MyLOOT", rond: "images/marques/rond/myloot.jpg" },
    { nom: "MYPC", rond: "images/marques/rond/mypc.jpg", contour: true },
    { nom: "Eneba", logo: "images/marques/eneba.webp", remplir: true, rond: "images/marques/rond/eneba.jpg" }
  ],

  /* ---------- BULLES DU HAUT DE L'ACCUEIL ----------
     5 noms, dans cet ordre : grande bulle en haut à gauche, petite en bas à gauche,
     en haut à droite, grande en bas à droite, petite au milieu à droite.
     Les noms doivent être écrits exactement comme dans la liste des talents.  */
  bulles: ["Rojin & Fuziah", "Darick", "Clinko", "Falka", "Nasse"],

  /* ---------- TALENTS (accueil + page Talents, dans cet ordre) ----------
     categories  : pastilles orange (accueil + page Talents)
     photo       : ex. "images/talents/darick.jpg" (idéalement carrée)
     plateformes : une ligne par réseau (YouTube, TikTok, Twitch, Instagram, Spotify, X, Kick)
                   compte  : nom de la chaîne ou du compte affiché dans la fiche (ex. "@clinko_")
                   abonnes : nombre d'abonnés, ex. 125000 (le total cumulé se calcule tout seul)
                   Chiffres repris du kit média (novembre 2026).
                   lien    : lien vers la chaîne ou le profil                                */
  talents: [
    {
      nom: "Rojin & Fuziah",
      categories: ["Valorant", "React", "Multigaming"],
      plateformes: [
        { nom: "YouTube", compte: "Rojin & Fuziah - Valorant", abonnes: 127000, lien: "https://www.youtube.com/@RojinFuziahVLR" },
        { nom: "TikTok", compte: "@rojin_x_fuziahvlr", abonnes: 84000, lien: "https://www.tiktok.com/@rojin_x_fuziahvlr" },
        { nom: "Twitch", compte: "RojinEtFuziah", abonnes: 31000, lien: "https://www.twitch.tv/rojinetfuziah" },
        { nom: "YouTube", compte: "Rojin & Fuziah - Gaming", abonnes: 26000, lien: "https://www.youtube.com/@RojinetFuziah" },
        { nom: "YouTube", compte: "Rojin & Fuziah - React", abonnes: 19000, lien: "https://www.youtube.com/@RojinFuziahReact" },
        { nom: "Instagram", compte: "@rojinfuziah", abonnes: 9000, lien: "https://www.instagram.com/rojinfuziah/" }
      ],
      photo: "images/talents/rojin-fuziah.jpg"
    },
    {
      nom: "Clinko",
      categories: ["IRL", "Multigaming", "React"],
      plateformes: [
        { nom: "YouTube", compte: "Clinko", abonnes: 427000, lien: "https://www.youtube.com/@Clinkoo" },
        { nom: "TikTok", compte: "@clinko_", abonnes: 193000, lien: "https://www.tiktok.com/@clinko_" },
        { nom: "YouTube", compte: "Clinko TV", abonnes: 170000, lien: "https://www.youtube.com/@ClinkoTV" },
        { nom: "Twitch", compte: "Clinko", abonnes: 54000, lien: "https://www.twitch.tv/clinko" },
        { nom: "Instagram", compte: "@clinkoo", abonnes: 19000, lien: "https://www.instagram.com/clinkoo/" },
        { nom: "YouTube", compte: "Clinko React", abonnes: 19000, lien: "https://www.youtube.com/@ClinkoReact" }
      ],
      photo: "images/talents/clinko.jpg"
    },
    {
      nom: "Darick",
      categories: ["Valorant", "Multigaming"],
      plateformes: [
        { nom: "YouTube", compte: "DARICK", abonnes: 52000, lien: "https://www.youtube.com/@darick9" },
        { nom: "TikTok", compte: "@cdarick", abonnes: 49000, lien: "https://www.tiktok.com/@cdarick" },
        { nom: "Twitch", compte: "Darick", abonnes: 24000, lien: "https://www.twitch.tv/darick" },
        { nom: "YouTube", compte: "DARICK Gaming", abonnes: 24000, lien: "https://www.youtube.com/@darick_gaming" },
        { nom: "Instagram", compte: "@moidarick", abonnes: 4000, lien: "https://www.instagram.com/moidarick/" }
      ],
      photo: "images/talents/darick.jpg"
    },
    {
      nom: "Falka",
      categories: ["Valorant"],
      plateformes: [
        { nom: "TikTok", compte: "@falkalive", abonnes: 344000, lien: "https://www.tiktok.com/@falkalive" },
        { nom: "Twitch", compte: "FalkaLive", abonnes: 139000, lien: "https://www.twitch.tv/falkalive" },
        { nom: "YouTube", compte: "Falka", abonnes: 117000, lien: "https://www.youtube.com/@FalkaLive" },
        { nom: "Instagram", compte: "@falkalive7", abonnes: 36000, lien: "https://www.instagram.com/falkalive7/" }
      ],
      photo: "images/talents/falka.jpg"
    },
    {
      nom: "Nasse",
      categories: ["Valorant"],
      plateformes: [
        { nom: "TikTok", compte: "@nasse.721", abonnes: 60000, lien: "https://www.tiktok.com/@nasse.721" },
        { nom: "Twitch", compte: "Nasse721", abonnes: 33000, lien: "https://www.twitch.tv/nasse721" },
        { nom: "YouTube", compte: "Nasse", abonnes: 29000, lien: "https://www.youtube.com/@Nasse721" },
        { nom: "Instagram", compte: "@nasse_721", abonnes: 12000, lien: "https://www.instagram.com/nasse_721/" }
      ],
      photo: "images/talents/nasse.jpg"
    },
    {
      nom: "M2zoo",
      categories: ["Valorant"],
      plateformes: [
        { nom: "TikTok", compte: "@m2zoo_", abonnes: 51000, lien: "https://www.tiktok.com/@m2zoo_" },
        { nom: "Twitch", compte: "M2zoo", abonnes: 18000, lien: "https://www.twitch.tv/m2zoo" },
        { nom: "YouTube", compte: "M2zoo", abonnes: 7000, lien: "https://www.youtube.com/@m2zoo" },
        { nom: "Instagram", compte: "@m2zoo_", abonnes: 7000, lien: "https://www.instagram.com/m2zoo_/" }
      ],
      photo: "images/talents/m2zoo.jpg"
    },
    {
      nom: "Ilazt",
      categories: ["Valorant"],
      plateformes: [
        { nom: "YouTube", compte: "ILAZT", abonnes: 21000, lien: "https://www.youtube.com/@ILAZTT" },
        { nom: "Twitch", compte: "ilazt", abonnes: 3000, lien: "https://www.twitch.tv/ilazt" },
        { nom: "TikTok", compte: "@ilaztt", abonnes: 2000, lien: "https://www.tiktok.com/@ilaztt" }
      ],
      photo: "images/talents/ilazt.jpg"
    },
    {
      nom: "Brams",
      categories: ["Valorant"],
      plateformes: [
        { nom: "TikTok", compte: "@bramsbewz", abonnes: 39000, lien: "https://www.tiktok.com/@bramsbewz" },
        { nom: "Twitch", compte: "BramsBewz", abonnes: 32000, lien: "https://www.twitch.tv/bramsbewz" },
        { nom: "YouTube", compte: "BramsBewz", abonnes: 12000, lien: "https://www.youtube.com/@BramsBewz" },
        { nom: "Instagram", compte: "@bramsbewz", abonnes: 1000, lien: "https://www.instagram.com/bramsbewz/" }
      ],
      photo: "images/talents/brams.jpg"
    }
  ],

  /* ---------- CAMPAGNES (l'ordre n'a pas d'importance) ----------
     Page Campagnes : triées automatiquement de la plus récente à la plus ancienne.
     Accueil : les 3 campagnes avec phare: true (« Mes campagnes phares »).
     date     : mois et année en toutes lettres, ex. "Février 2026"
     marque   : écrit comme dans la liste des marques ci-dessus (son logo s'affiche tout seul)
     createur : écrit exactement comme le nom du talent (sa photo s'affiche toute seule)
     miniature : ex. "images/campagnes/marque-darick.webp" (format 16:9)
     lien : lien vers la vidéo                                          */
  campagnes: [
    { phare: true, marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Février 2026", miniature: "images/campagnes/maxesport-rojin-fuziah.webp", lien: "https://youtu.be/FciGnqLbsUU" },
    { phare: true, marque: "OperaGX", createur: "Darick", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/operagx-darick.webp", lien: "https://www.youtube.com/watch?v=TZ6NV3WA5IY" },
    { phare: true, marque: "AutoFull", createur: "Nasse", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/autofull-nasse.webp", lien: "https://www.youtube.com/watch?v=10ohcLa-NXo" },
    { marque: "FlexiSpot", createur: "Nasse", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/flexispot-nasse.webp", lien: "https://www.youtube.com/watch?v=h4thrL73txg" },
    { marque: "AutoFull", createur: "M2zoo", format: "Vidéo courte", date: "Septembre 2026", miniature: "images/campagnes/autofull-m2zoo-short.webp", lien: "https://www.tiktok.com/@m2zoo_/video/7683568123726843168" },
    { marque: "AutoFull", createur: "Nasse", format: "Vidéo courte", date: "Septembre 2026", miniature: "images/campagnes/autofull-nasse-short.webp", lien: "https://www.tiktok.com/@nasse.721/video/7686534804942130454" },
    { marque: "MyLOOT", createur: "M2zoo", format: "Vidéo courte", date: "Octobre 2026", miniature: "images/campagnes/myloot-m2zoo.webp", lien: "https://www.tiktok.com/@m2zoo_/video/7700543996212350240" },
    { marque: "MYPC", createur: "Darick", format: "Intégration", date: "Novembre 2026", miniature: "images/campagnes/mypc-darick.webp", lien: "https://www.youtube.com/watch?v=5fjEYWBQJf8" },
    { marque: "MaxEsport", createur: "M2zoo", format: "Vidéo courte", date: "Juillet 2026", miniature: "images/campagnes/maxesport-m2zoo-1.webp", lien: "https://www.tiktok.com/@m2zoo_/video/7667213050872630561" },
    { marque: "MaxEsport", createur: "M2zoo", format: "Vidéo courte", date: "Octobre 2026", miniature: "images/campagnes/maxesport-m2zoo-2.webp", lien: "https://www.tiktok.com/@m2zoo_/video/7695090615306013984" },
    { marque: "Air Up", createur: "M2zoo", format: "Vidéo courte", date: "Juillet 2026", miniature: "images/campagnes/airup-m2zoo.webp", lien: "https://www.tiktok.com/@m2zoo_/video/7665408910974635296" },
    { marque: "Filmora", createur: "Darick", format: "Intégration", date: "Janvier 2026", miniature: "images/campagnes/filmora-darick-1.webp", lien: "https://www.youtube.com/watch?v=fjxK5TsYPdA" },
    { marque: "MaxEsport", createur: "Darick", format: "Intégration", date: "Janvier 2026", miniature: "images/campagnes/maxesport-darick.webp", lien: "https://www.youtube.com/watch?v=RG7w5hPZFCE" },
    { marque: "GearUp", createur: "Darick", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/gearup-darick-1.webp", lien: "https://www.youtube.com/watch?v=8qofKUQ8QzU" },
    { marque: "GearUp", createur: "Darick", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/gearup-darick-2.webp", lien: "https://www.youtube.com/watch?v=dwMGdRhgDbY" },
    { marque: "GearUp", createur: "Darick", format: "Intégration", date: "Mai 2026", miniature: "images/campagnes/gearup-darick-3.webp", lien: "https://www.youtube.com/watch?v=hV_pCWkvatE" },
    { marque: "Filmora", createur: "Darick", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/filmora-darick-2.webp", lien: "https://www.youtube.com/watch?v=Mf4NpDpy5Po" },
    { marque: "AutoFull", createur: "Darick", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/autofull-darick.webp", lien: "https://www.youtube.com/watch?v=xc-8Bhqg42M" },
    { marque: "AutoFull", createur: "Clinko", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/autofull-clinko-1.webp", lien: "https://www.youtube.com/watch?v=Pahr_Wfcdp4" },
    { marque: "Raid Shadow", createur: "Clinko", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/raid-clinko-1.webp", lien: "https://www.youtube.com/watch?v=yYLZ9sCg_wA" },
    { marque: "Eneba", createur: "Clinko", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/eneba-clinko-1.webp", lien: "https://www.youtube.com/watch?v=DDT49q4NjkY" },
    { marque: "Eneba", createur: "Clinko", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/eneba-clinko-2.webp", lien: "https://www.youtube.com/watch?v=45637OjKhUg" },
    { marque: "Eneba", createur: "Clinko", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/eneba-clinko-3.webp", lien: "https://www.youtube.com/watch?v=xj16jQMQBmg" },
    { marque: "Eneba", createur: "Clinko", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/eneba-clinko-4.webp", lien: "https://www.youtube.com/watch?v=JETc_JKPvVM" },
    { marque: "Raid Shadow", createur: "Ilazt", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/raid-ilazt-1.webp", lien: "https://www.youtube.com/watch?v=qnuHQb2_kYk" },
    { marque: "AutoFull", createur: "Ilazt", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/autofull-ilazt-1.webp", lien: "https://www.youtube.com/watch?v=PAi8PjUBpv8" },
    { marque: "Filmora", createur: "Falka", format: "Intégration", date: "Janvier 2026", miniature: "images/campagnes/filmora-falka-1.webp", lien: "https://youtu.be/sAF1AuSVOqg" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Février 2026", miniature: "images/campagnes/gearup-falka-1.webp", lien: "https://youtu.be/HSBwT9KYjjQ" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Février 2026", miniature: "images/campagnes/gearup-falka-2.webp", lien: "https://youtu.be/6ztrJA_efXs" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Mars 2026", miniature: "images/campagnes/gearup-falka-3.webp", lien: "https://youtu.be/shSK839Blqg" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Mars 2026", miniature: "images/campagnes/gearup-falka-4.webp", lien: "https://youtu.be/776aEgmpsEk" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Mars 2026", miniature: "images/campagnes/gearup-falka-5.webp", lien: "https://youtu.be/zwQAwfWqzHE" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/gearup-falka-6.webp", lien: "https://youtu.be/_blHfc6aGGU" },
    { marque: "AutoFull", createur: "Falka", format: "Intégration", date: "Mai 2026", miniature: "images/campagnes/autofull-falka-1.webp", lien: "https://youtu.be/BW_vlA5UXfU" },
    { marque: "War Thunder", createur: "Falka", format: "Intégration", date: "Mai 2026", miniature: "images/campagnes/war-thunder-falka-1.webp", lien: "https://youtu.be/mrx3UTeJfdc" },
    { marque: "Raid Shadow", createur: "Falka", format: "Intégration", date: "Juillet 2026", miniature: "images/campagnes/raid-falka-1.webp", lien: "https://youtu.be/WcUok-ce5Jg" },
    { marque: "MaxEsport", createur: "Falka", format: "Intégration", date: "Juillet 2026", miniature: "images/campagnes/maxesport-falka-1.webp", lien: "https://youtu.be/Ew66Zx98HvU" },
    { marque: "GearUp", createur: "Falka", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/gearup-falka-7.webp", lien: "https://youtu.be/gYjV-qdA6QA" },
    { marque: "MyLOOT", createur: "Falka", format: "Vidéo courte", date: "Septembre 2026", miniature: "images/campagnes/myloot-falka-1.webp", lien: "https://www.tiktok.com/@falkalive/video/7690940369202089248" },
    { marque: "Filmora", createur: "Falka", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/filmora-falka-2.webp", lien: "https://youtu.be/O5WPf8NzW6A" },
    { marque: "MaxEsport", createur: "Falka", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/maxesport-falka-2.webp", lien: "https://youtu.be/VS4OoiRn81c" },
    { marque: "FragPunk", createur: "Rojin & Fuziah", format: "Vidéo dédiée", date: "Novembre 2025", miniature: "images/campagnes/fragpunk-rojin-fuziah-1.webp", lien: "https://youtu.be/-XrqLKW20yw" },
    { marque: "War Thunder", createur: "Rojin & Fuziah", format: "Intégration", date: "Novembre 2025", miniature: "images/campagnes/war-thunder-rojin-fuziah-1.webp", lien: "https://youtu.be/81EoweB4cfM" },
    { marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Novembre 2025", miniature: "images/campagnes/maxesport-rojin-fuziah-1.webp", lien: "https://youtu.be/GQqgJYhX11M" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Décembre 2025", miniature: "images/campagnes/gearup-rojin-fuziah-1.webp", lien: "https://youtu.be/aH99tCqTel4" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Janvier 2026", miniature: "images/campagnes/gearup-rojin-fuziah-2.webp", lien: "https://youtu.be/q6VzLdDPfbE" },
    { marque: "Filmora", createur: "Rojin & Fuziah", format: "Intégration", date: "Janvier 2026", miniature: "images/campagnes/filmora-rojin-fuziah-1.webp", lien: "https://youtu.be/EgOX52oCuOY" },
    { marque: "Raid Shadow", createur: "Rojin & Fuziah", format: "Intégration", date: "Février 2026", miniature: "images/campagnes/raid-shadow-rojin-fuziah-1.webp", lien: "https://youtu.be/vrIsJv-ebl8" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Mars 2026", miniature: "images/campagnes/gearup-rojin-fuziah-3.webp", lien: "https://youtu.be/ZI_KA32j_u0" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/gearup-rojin-fuziah-4.webp", lien: "https://youtu.be/jVvVvm39QQo" },
    { marque: "AutoFull", createur: "Rojin & Fuziah", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/autofull-rojin-fuziah-1.webp", lien: "https://youtu.be/HgIMzIKuMAM" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Avril 2026", miniature: "images/campagnes/gearup-rojin-fuziah-5.webp", lien: "https://youtu.be/AdTeYqjQkN4" },
    { marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Mai 2026", miniature: "images/campagnes/maxesport-rojin-fuziah-2.webp", lien: "https://youtu.be/IiNieaqQYqI" },
    { marque: "Raid Shadow", createur: "Rojin & Fuziah", format: "Intégration", date: "Mai 2026", miniature: "images/campagnes/raid-shadow-rojin-fuziah-2.webp", lien: "https://youtu.be/R-N3gH5WqlQ" },
    { marque: "SteelSeries", createur: "Rojin & Fuziah", format: "Intégration", date: "Juin 2026", miniature: "images/campagnes/steelseries-rojin-fuziah-1.webp", lien: "https://youtu.be/UyBBKThEMkg" },
    { marque: "SteelSeries", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Juin 2026", miniature: "images/campagnes/steelseries-rojin-fuziah-2.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7655733301440761110" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Juin 2026", miniature: "images/campagnes/gearup-rojin-fuziah-6.webp", lien: "https://youtu.be/XCaIuHqPJOw" },
    { marque: "AutoFull", createur: "Rojin & Fuziah", format: "Intégration", date: "Juin 2026", miniature: "images/campagnes/autofull-rojin-fuziah-2.webp", lien: "https://youtu.be/voFXPp6j-nE" },
    { marque: "GearUp", createur: "Rojin & Fuziah", format: "Intégration", date: "Juillet 2026", miniature: "images/campagnes/gearup-rojin-fuziah-7.webp", lien: "https://youtu.be/NuxYr-JsPcw" },
    { marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/maxesport-rojin-fuziah-3.webp", lien: "https://youtu.be/Mi6RkyOK1Ws" },
    { marque: "HyperX", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Août 2026", miniature: "images/campagnes/hyperx-rojin-fuziah-1.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7670646332020788502" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/myloot-rojin-fuziah-1.webp", lien: "https://youtu.be/6JYxhDZ2XyI" },
    { marque: "SIHOO", createur: "Rojin & Fuziah", format: "Intégration", date: "Août 2026", miniature: "images/campagnes/sihoo-rojin-fuziah-1.webp", lien: "https://youtu.be/quXSkINouCE" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Août 2026", miniature: "images/campagnes/myloot-rojin-fuziah-2.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7675446722151091478" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Août 2026", miniature: "images/campagnes/myloot-rojin-fuziah-3.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7676526948318809366" },
    { marque: "AutoFull", createur: "Rojin & Fuziah", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/autofull-rojin-fuziah-3.webp", lien: "https://youtu.be/GptM0-115dc" },
    { marque: "Holy", createur: "Rojin & Fuziah", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/holy-rojin-fuziah-1.webp", lien: "https://youtu.be/hX5Cz8J4rrc" },
    { marque: "OperaGX", createur: "Rojin & Fuziah", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/operagx-rojin-fuziah-1.webp", lien: "https://youtu.be/o8yO8WoK1qA" },
    { marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Septembre 2026", miniature: "images/campagnes/maxesport-rojin-fuziah-4.webp", lien: "https://youtu.be/Ax9UsTGgVAg" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Septembre 2026", miniature: "images/campagnes/myloot-rojin-fuziah-4.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7690604350321741078" },
    { marque: "Filmora", createur: "Rojin & Fuziah", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/filmora-rojin-fuziah-2.webp", lien: "https://youtu.be/6YODlT-Kc9U" },
    { marque: "MYPC", createur: "Rojin & Fuziah", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/mypc-rojin-fuziah-1.webp", lien: "https://youtu.be/n2-Y9E_-Szo" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Intégration", date: "Octobre 2026", miniature: "images/campagnes/myloot-rojin-fuziah-5.webp", lien: "https://youtu.be/W7brCmrbcoQ" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Octobre 2026", miniature: "images/campagnes/myloot-rojin-fuziah-6.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7701752618778905878" },
    { marque: "MyLOOT", createur: "Rojin & Fuziah", format: "Vidéo courte", date: "Novembre 2026", miniature: "images/campagnes/myloot-rojin-fuziah-7.webp", lien: "https://www.tiktok.com/@rojin_x_fuziahvlr/video/7703193502003252502" },
    { marque: "MaxEsport", createur: "Rojin & Fuziah", format: "Intégration", date: "Novembre 2026", miniature: "images/campagnes/maxesport-rojin-fuziah-5.webp", lien: "https://youtu.be/FFn9UKwzc3o" },
    { marque: "Logitech G", createur: "Darick", format: "Vidéo courte", date: "Octobre 2026", miniature: "images/campagnes/logitech-darick-1.webp", lien: "https://www.youtube.com/shorts/2-kuWNQhbEQ" }
  ]
};
