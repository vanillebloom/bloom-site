(function () {
  "use strict";

  var data = window.BLOOM || { marques: [], talents: [], campagnes: [] };
  var MAIL = "vanille@bloomtalent.fr";

  // Chaque nouvelle page s'ouvre tout en haut (sauf lien vers une ancre précise)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function enHaut() { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
  enHaut();
  window.addEventListener("load", enHaut);
  window.addEventListener("pageshow", enHaut);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(id) { return document.getElementById(id); }
  // Abonnés : 125000 -> "125 k", 1250000 -> "1,3 M"
  function nombre(n) {
    if (n == null || n === "") return "[XX k]";
    n = Number(n);
    if (n >= 1e6) return (Math.round(n / 1e5) / 10).toString().replace(".", ",") + " M";
    if (n >= 1000) return Math.round(n / 1000) + " k";
    return String(n);
  }
  function totalAbos(t) {
    var ps = t.plateformes || [];
    if (!ps.length || ps.some(function (p) { return p.abonnes == null || p.abonnes === ""; })) return null;
    return ps.reduce(function (s, p) { return s + Number(p.abonnes); }, 0);
  }
  function icone(nom, taille) {
    var d = (window.BLOOM_ICONES || {})[nom];
    return d ? '<svg class="icone-reseau" width="' + taille + '" height="' + taille + '" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="' + esc(nom) + '"><path d="' + d + '"/></svg>' : '<span class="reseau-nom">' + esc(nom) + "</span>";
  }
  function slug(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function img(src, alt, vide) {
    return src ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">' : esc(vide || "");
  }
  function pastilles(liste, classe) {
    return '<div class="pastilles">' + (liste || []).map(function (p) {
      return '<span class="pastille' + (classe ? " " + classe : "") + '">' + esc(p) + "</span>";
    }).join("") + "</div>";
  }
  function doubler(el, html, classeGroupe) {
    // Deux copies identiques pour un défilement sans coupure
    el.innerHTML =
      '<div class="defile-groupe ' + (classeGroupe || "") + '">' + html + "</div>" +
      '<div class="defile-groupe ' + (classeGroupe || "") + '" aria-hidden="true">' + html + "</div>";
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".nav-burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var nav = burger.closest(".nav");
      var ouvert = nav.classList.toggle("ouvert");
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
  }

  /* ---------- Hero : bulles des talents ---------- */
  // Positions des bulles : classes .b1 à .b5 dans style.css
  var places = [
    { taille: 168, anneau: true, noire: true, f: "flotte-1" },
    { taille: 120, f: "flotte-2" },
    { taille: 136, f: "flotte-3" },
    { taille: 152, anneau: true, noire: true, f: "flotte-1" },
    { taille: 100, f: "flotte-2" }
  ];
  var bulles = $("hero-bulles");
  if (bulles) {
    var choix = (data.bulles || []).map(function (n) {
      return data.talents.filter(function (t) { return t.nom === n; })[0];
    }).filter(Boolean);
    if (!choix.length) choix = data.talents;
    bulles.innerHTML = choix.slice(0, places.length).map(function (t, i) {
      var p = places[i];
      return '<div class="bulle deco b' + (i + 1) + " " + p.f + '">' +
        '<div class="bulle-photo' + (p.anneau ? " anneau" : "") + '" style="--t:' + p.taille + 'px">' +
        img(t.photo, t.nom, "[Photo]") + "</div>" +
        '<span class="etiquette' + (p.noire ? " noire" : "") + '">' + esc(t.nom) + "</span></div>";
    }).join("");
  }
  var heroMobile = $("hero-mobile");
  // Sur téléphone : rangée des 5 créateurs des bulles (ceux qui ont une photo)
  var avecPhoto = ((data.bulles || []).map(function (n) {
    return data.talents.filter(function (t) { return t.nom === n; })[0];
  }).filter(Boolean).concat(data.talents)).filter(function (t, k, arr) {
    return t.photo && arr.indexOf(t) === k;
  }).slice(0, 5);
  if (heroMobile && avecPhoto.length) {
    heroMobile.innerHTML = avecPhoto.map(function (t) {
      return '<div class="bulle-photo" title="' + esc(t.nom) + '">' + img(t.photo, t.nom, "") + "</div>";
    }).join("");
  }

  /* ---------- Marques ---------- */
  var marques = $("defile-marques");
  if (marques) {
    // Les vraies marques (avec logo) remplacent les emplacements dès qu'il y en a une
    var reelles = data.marques.filter(function (m) { return m.logo; });
    var liste = reelles.length ? reelles : data.marques;
    // On répète la liste pour que le bandeau soit toujours plein, même avec peu de logos
    var plein = liste.slice();
    while (liste.length && plein.length < 12) plein = plein.concat(liste);
    doubler(marques, plein.map(function (m) {
      var fond = m.fond ? ' style="background:' + esc(m.fond) + ";border-color:" + esc(m.fond) + '"' : "";
      return '<div class="marque' + (m.remplir ? " marque-pleine" : "") + (m.contour ? " marque-contour" : "") + '"' + fond + ">" + (m.logo ? '<img src="' + esc(m.logo) + '" alt="' + esc(m.nom) + '" decoding="async" width="540" height="216">' : esc(m.nom)) + "</div>";
    }).join(""));
  }

  // Vitesse de défilement constante, quel que soit le nombre de logos (≈ 50 px par seconde)
  if (marques) {
    var groupe = marques.querySelector(".defile-groupe");
    if (groupe && groupe.offsetWidth) marques.style.animationDuration = Math.round(groupe.offsetWidth / 50) + "s";
  }

  /* ---------- Talents (accueil) : carrousel à flèches ---------- */
  var piste = $("carrousel-talents");
  if (piste) {
    piste.innerHTML = data.talents.map(function (t) {
      return '<a class="carte-talent carte-roster" href="talents.html#' + slug(t.nom) + '" aria-label="Voir la fiche de ' + esc(t.nom) + '">' +
        '<div class="carte-roster-photo">' + img(t.photo, "", "") + "</div>" +
        pastilles(t.categories, "pastille-orange") +
        '<div class="carte-roster-texte"><span class="carte-roster-nom">' + esc(t.nom) + "</span>" +
        '<span class="carte-roster-abos"><strong>' + nombre(totalAbos(t)) + "</strong> abonnés</span></div>" +
        "</a>";
    }).join("");
    var fleches = document.querySelectorAll(".fleche");
    function majFleches() {
      var max = piste.scrollWidth - piste.clientWidth - 2;
      fleches.forEach(function (f) {
        var dir = Number(f.getAttribute("data-dir"));
        f.disabled = dir < 0 ? piste.scrollLeft <= 2 : piste.scrollLeft >= max;
      });
    }
    fleches.forEach(function (f) {
      f.addEventListener("click", function () {
        var carte = piste.querySelector(".carte-talent");
        var pas = carte ? carte.offsetWidth + 20 : 260;
        var nb = Math.max(1, Math.floor(piste.clientWidth / pas));
        piste.scrollBy({ left: Number(f.getAttribute("data-dir")) * pas * nb, behavior: "smooth" });
      });
    });
    piste.addEventListener("scroll", majFleches, { passive: true });
    window.addEventListener("resize", majFleches);
    majFleches();
  }

  /* ---------- Campagnes ---------- */
  function miniature(c) {
    return img(c.miniature, c.marque + " × " + c.createur, "[Miniature vidéo]");
  }
  function photoCreateur(nom) {
    var t = data.talents.filter(function (x) { return x.nom === nom; })[0];
    return t && t.photo ? '<img src="' + esc(t.photo) + '" alt="">' : "";
  }
  function logoMarque(nom) {
    var m = data.marques.filter(function (x) { return x.nom.toLowerCase() === String(nom).toLowerCase(); })[0];
    return m && m.rond ? '<img class="carte-logo' + (m.contour ? " carte-logo-contour" : "") + '" src="' + esc(m.rond) + '" alt="' + esc(m.nom) + '">' : "";
  }
  // Marque + créateur toujours sur une seule ligne : on réduit le texte si besoin
  function ajusterTitres() {
    document.querySelectorAll(".carte-titre").forEach(function (t) {
      t.style.fontSize = "";
      if (!t.clientWidth) return;
      var base = parseFloat(getComputedStyle(t).fontSize), taille = base;
      while (t.scrollWidth > t.clientWidth + 1 && taille > base * 0.55) {
        taille -= 0.5;
        t.style.fontSize = taille + "px";
      }
    });
  }
  var ajusteEnAttente = false;
  function planifierAjustement() {
    if (ajusteEnAttente) return;
    ajusteEnAttente = true;
    requestAnimationFrame(function () { ajusteEnAttente = false; ajusterTitres(); });
  }
  new MutationObserver(planifierAjustement).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open"] });
  window.addEventListener("resize", planifierAjustement);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(planifierAjustement);
  function carteCampagne(c) {
    var balise = c.lien ? "a" : "div";
    var attrs = c.lien ? ' href="' + esc(c.lien) + '" target="_blank" rel="noopener"' : "";
    return "<" + balise + ' class="carte-campagne"' + attrs + ">" +
      '<div class="miniature">' + miniature(c) + "</div>" +
      '<div class="carte-campagne-texte">' + logoMarque(c.marque) +
      '<div class="carte-titre"><span class="carte-marque">' + esc(c.marque) + "</span>" +
      '<span class="pastille-createur">' + photoCreateur(c.createur) + esc(c.createur) + "</span></div>" +
      '<p class="meta">' + esc(c.format) + " · " + esc(c.date) + "</p>" +
      "</div></" + balise + ">";
  }
  // Tri : de la plus récente à la plus ancienne, à partir de la date écrite en toutes lettres ("Février 2026")
  var MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
  function valeurDate(c) {
    var t = String(c.date || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var an = t.match(/(\d{4})/);
    if (!an) return -1;
    var m = MOIS.filter(function (x) { return t.indexOf(x) >= 0; })[0];
    return Number(an[1]) * 12 + (m ? MOIS.indexOf(m) : 0);
  }
  var parDate = data.campagnes.slice().sort(function (a, b) { return valeurDate(b) - valeurDate(a); });

  // Accueil : les campagnes marquées « phare », sinon les plus récentes
  var recentes = $("campagnes-recentes");
  if (recentes) {
    var phares = data.campagnes.filter(function (c) { return c.phare; });
    var choixAccueil = phares.concat(parDate.filter(function (c) { return !c.phare; })).slice(0, 3);
    recentes.innerHTML = choixAccueil.map(carteCampagne).join("");
  }

  /* ---------- Page Campagnes : Tout / Par créateur / Par marque ---------- */
  var zone = $("campagnes-zone");
  if (zone) {
    function pluriel(n) { return n + (n > 1 ? " campagnes" : " campagne"); }
    function grille(liste) {
      return '<div class="grille-campagnes">' + liste.map(carteCampagne).join("") + "</div>";
    }
    function grouper(cle) {
      var groupes = {}, ordre = [];
      parDate.forEach(function (c) {
        var k = c[cle];
        if (!groupes[k]) { groupes[k] = []; ordre.push(k); }
        groupes[k].push(c);
      });
      // Les plus fournis d'abord, puis le plus récent
      return ordre.sort(function (x, y) { return groupes[y].length - groupes[x].length; })
        .map(function (k) { return { nom: k, liste: groupes[k] }; });
    }
    function visuelCreateur(nom, cls) {
      var t = data.talents.filter(function (x) { return x.nom === nom; })[0];
      return t && t.photo ? '<img class="' + cls + '" src="' + esc(t.photo) + '" alt="">' : "";
    }
    function visuelMarque(nom, cls) {
      var m = data.marques.filter(function (x) { return x.nom.toLowerCase() === String(nom).toLowerCase(); })[0];
      if (m && m.rond) return '<img class="' + cls + (m.contour ? " " + cls + "-contour" : "") + '" src="' + esc(m.rond) + '" alt="">';
      return "";
    }
    var choix = { createurs: null, marques: null };
    var vueActive = "tout";

    function vueGroupes(cle, champ, visuel) {
      var groupes = grouper(champ);
      var sel = choix[cle];
      // Nombre de campagnes : affiché pour les marques seulement
      function compteur(g) { return cle === "marques" ? '<span class="compteur">' + pluriel(g.liste.length) + "</span>" : ""; }
      // Menu de sélection
      var menu = '<div class="selecteur" role="group" aria-label="Choisir">' +
        '<button type="button" class="puce puce-texte" data-sel="" aria-pressed="' + (!sel) + '">Tous</button>' +
        groupes.map(function (g) {
          return '<button type="button" class="puce" data-sel="' + esc(g.nom) + '" aria-pressed="' + (sel === g.nom) + '">' +
            visuel(g.nom, "puce-visuel") + "<span>" + esc(g.nom) + "</span></button>";
        }).join("") + "</div>";
      if (sel) {
        var g = groupes.filter(function (x) { return x.nom === sel; })[0];
        if (g) {
          return menu + '<section class="groupe"><div class="groupe-entete">' + visuel(g.nom, "groupe-avatar") +
            "<h2>" + esc(g.nom) + "</h2>" + compteur(g) + "</div>" +
            grille(g.liste) + "</section>";
        }
      }
      // Vue « Tous » : une ligne à flèches par groupe
      return menu + groupes.map(function (g) {
        return '<section class="groupe"><div class="groupe-entete">' + visuel(g.nom, "groupe-avatar") +
          "<h2>" + esc(g.nom) + "</h2>" + compteur(g) +
          (g.liste.length > 1 ? '<button type="button" class="tout-voir" data-sel="' + esc(g.nom) + '">Tout voir →</button>' : "") +
          "</div>" +
          '<div class="rangee">' +
          '<button class="fleche fleche-rangee fleche-g" type="button" aria-label="Précédent" data-dir="-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
          '<div class="rangee-piste">' + g.liste.map(carteCampagne).join("") + "</div>" +
          '<button class="fleche fleche-rangee fleche-d" type="button" aria-label="Suivant" data-dir="1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
          "</div></section>";
      }).join("");
    }

    var vues = {
      tout: function () {
        return parDate.length ? grille(parDate) : '<p class="vide">Les campagnes arrivent bientôt.</p>';
      },
      createurs: function () { return vueGroupes("createurs", "createur", visuelCreateur); },
      marques: function () { return vueGroupes("marques", "marque", visuelMarque); }
    };

    function majRangees() {
      zone.querySelectorAll(".rangee").forEach(function (r) {
        var p = r.querySelector(".rangee-piste");
        var max = p.scrollWidth - p.clientWidth - 2;
        r.classList.toggle("sans-defilement", max <= 0);
        r.querySelectorAll(".fleche-rangee").forEach(function (f) {
          var dir = Number(f.getAttribute("data-dir"));
          f.disabled = dir < 0 ? p.scrollLeft <= 2 : p.scrollLeft >= max;
        });
      });
    }
    var ongletsC = document.querySelectorAll(".onglet-campagnes");
    function montrerVue(cle) {
      vueActive = cle;
      ongletsC.forEach(function (o) { o.setAttribute("aria-selected", o.getAttribute("data-vue") === cle ? "true" : "false"); });
      zone.innerHTML = vues[cle]();
      zone.querySelectorAll(".rangee-piste").forEach(function (p) { p.addEventListener("scroll", majRangees, { passive: true }); });
      majRangees();
    }
    ongletsC.forEach(function (o) {
      o.addEventListener("click", function () { montrerVue(o.getAttribute("data-vue")); });
    });
    zone.addEventListener("click", function (e) {
      var choixBtn = e.target.closest(".puce, .tout-voir");
      if (choixBtn) {
        choix[vueActive] = choixBtn.getAttribute("data-sel") || null;
        montrerVue(vueActive);
        if (choixBtn.classList.contains("tout-voir")) zone.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var f = e.target.closest(".fleche-rangee");
      if (f) {
        var p = f.parentElement.querySelector(".rangee-piste");
        var carte = p.querySelector(".carte-campagne");
        var pas = carte ? carte.offsetWidth + 20 : 340;
        var nb = Math.max(1, Math.floor(p.clientWidth / pas));
        p.scrollBy({ left: Number(f.getAttribute("data-dir")) * pas * nb, behavior: "smooth" });
      }
    });
    window.addEventListener("resize", majRangees);
    // Arrivée depuis une fiche talent (campagnes.html#createur-darick) : vue « Par créateur » déjà filtrée
    var depart = "tout";
    var h = location.hash.match(/^#createur-(.+)$/);
    if (h) {
      var cr = data.talents.filter(function (t) { return slug(t.nom) === h[1]; })[0];
      if (cr) { choix.createurs = cr.nom; depart = "createurs"; }
    }
    montrerVue(depart);
  }

  /* ---------- Page Talents : filtre par catégorie + fiche détaillée ---------- */
  var roster = $("roster");
  if (roster) {
    var filtreCat = $("filtre-categories");
    var categories = [];
    data.talents.forEach(function (t) {
      (t.categories || []).forEach(function (c) { if (categories.indexOf(c) < 0) categories.push(c); });
    });
    var catActive = "";
    function afficherRoster() {
      filtreCat.innerHTML = ['<button type="button" class="puce puce-texte" data-cat="" aria-pressed="' + (!catActive) + '">Tous</button>']
        .concat(categories.map(function (c) {
          return '<button type="button" class="puce puce-texte" data-cat="' + esc(c) + '" aria-pressed="' + (catActive === c) + '">' + esc(c) + "</button>";
        })).join("");
      var liste = catActive ? data.talents.filter(function (t) { return (t.categories || []).indexOf(catActive) >= 0; }) : data.talents;
      roster.innerHTML = liste.map(function (t) {
        return '<button type="button" class="carte-roster" data-nom="' + esc(t.nom) + '" aria-haspopup="dialog" aria-label="Voir le profil de ' + esc(t.nom) + '">' +
          '<div class="carte-roster-photo">' + img(t.photo, "", "") + "</div>" +
          pastilles(t.categories, "pastille-orange") +
          '<div class="carte-roster-texte"><span class="carte-roster-nom">' + esc(t.nom) + "</span>" +
          '<span class="carte-roster-abos"><strong>' + nombre(totalAbos(t)) + "</strong> abonnés</span></div>" +
          "</button>";
      }).join("");
    }
    filtreCat.addEventListener("click", function (e) {
      var b = e.target.closest(".puce");
      if (!b) return;
      catActive = b.getAttribute("data-cat");
      afficherRoster();
    });

    // Fiche détaillée (fenêtre au clic)
    var dialog = $("fiche-talent");
    var contenu = $("fiche-contenu");
    function ouvrirFiche(nom) {
      var t = data.talents.filter(function (x) { return x.nom === nom; })[0];
      if (!t || !dialog) return;
      var siens = parDate.filter(function (c) { return c.createur === t.nom && c.marque.charAt(0) !== "["; });
      contenu.innerHTML =
        '<div class="fiche-haut">' +
        '<div class="photo-ronde">' + img(t.photo, t.nom, "[Photo]") + "</div>" +
        '<div class="fiche-id"><h2 id="fiche-titre">' + esc(t.nom) + "</h2>" +
        pastilles(t.categories, "pastille-orange") + "</div></div>" +
        '<div class="fiche-reseaux">' +
        '<div class="abos-fiche"><strong>' + nombre(totalAbos(t)) + "</strong><span>abonnés cumulés</span></div>" +
        '<div class="reseaux-liste">' + (t.plateformes || []).map(function (p) {
          var dedans = icone(p.nom, 22) + '<span class="reseau-titre">' + esc(p.compte || p.nom) + "</span><strong>" + nombre(p.abonnes) + "</strong>" + (p.lien ? '<span class="reseau-fleche" aria-hidden="true">→</span>' : "");
          return p.lien ? '<a class="reseau-ligne" href="' + esc(p.lien) + '" target="_blank" rel="noopener">' + dedans + "</a>" : '<div class="reseau-ligne">' + dedans + "</div>";
        }).join("") + "</div></div>" +
        (siens.length ? '<div class="fiche-campagnes"><h3>Dernières campagnes</h3><div class="fiche-campagnes-liste">' +
          siens.slice(0, 3).map(carteCampagne).join("") + "</div>" +
          (siens.length > 3 ? '<a class="lien-fort" href="campagnes.html#createur-' + slug(t.nom) + '">Voir toutes les campagnes →</a>' : "") + "</div>" : "") +
        "";
      if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
      contenu.scrollTop = 0;
      try { history.replaceState(null, "", "#" + slug(t.nom)); } catch (e) {}
    }
    function fermerFiche() {
      if (dialog.close) dialog.close(); else dialog.removeAttribute("open");
    }
    roster.addEventListener("click", function (e) {
      var c = e.target.closest(".carte-roster");
      if (c) ouvrirFiche(c.getAttribute("data-nom"));
    });
    dialog.querySelector(".fiche-fermer").addEventListener("click", fermerFiche);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) fermerFiche(); }); // clic sur le fond
    dialog.addEventListener("close", function () {
      try { history.replaceState(null, "", location.pathname); } catch (e) {}
    });

    afficherRoster();
    // Arrivée depuis l'accueil (talents.html#darick) : on ouvre directement sa fiche
    if (location.hash) {
      var cible = data.talents.filter(function (t) { return "#" + slug(t.nom) === location.hash; })[0];
      if (cible) ouvrirFiche(cible.nom);
    }
  }

  /* ---------- Services : onglets marques / créateurs ---------- */
  var services = {
    marques: {
      intro: "Une intégration authentique, de la première idée au bilan.",
      etapes: [
        ["Casting sur mesure", "Je cherche avec vous les créateurs dont l’univers mettra votre produit en valeur."],
        ["Un message qui sonne juste", "Votre brief devient un script naturel, dans la voix du créateur, sans perdre vos messages clés."],
        ["Suivi de A à Z", "Planning, validations, mise en ligne : je gère tout le suivi avec le créateur."],
        ["Des résultats concrets", "30 jours après la diffusion, vous recevez un rapport clair avec les chiffres de la campagne."]
      ]
    },
    createurs: {
      intro: "Je vous simplifie vos collabs, et un peu la vie aussi.",
      etapes: [
        ["Votre boîte mail", "Je réponds aux marques qui vous contactent, et j’en démarche de nouvelles."],
        ["Les bonnes collabs", "Je négocie vos tarifs et je ne garde que les partenariats qui vous ressemblent."],
        ["Zéro prise de tête", "Scripts, planning, facturation : je m’occupe de tout ce qui vous fait perdre du temps."],
        ["Un vrai suivi", "Gifting, événements, conseils : un accompagnement personnalisé, au quotidien."]
      ]
    }
  };
  var onglets = document.querySelectorAll(".onglet");
  var etapes = $("etapes");
  var intro = $("services-intro");
  function montrer(cle) {
    var s = services[cle];
    if (!s || !etapes) return;
    onglets.forEach(function (o) { o.setAttribute("aria-selected", o.getAttribute("data-cle") === cle ? "true" : "false"); });
    if (intro) intro.textContent = s.intro;
    etapes.innerHTML = s.etapes.map(function (e, i) {
      return '<div class="etape"><div class="etape-num">' + (i + 1) + "</div><h3>" + esc(e[0]) + "</h3><p>" + esc(e[1]) + "</p></div>";
    }).join("");
  }
  onglets.forEach(function (o) {
    o.addEventListener("click", function () { montrer(o.getAttribute("data-cle")); });
  });
  if (etapes) montrer("marques");
})();
