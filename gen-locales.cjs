<<<<<<< HEAD
// gen-locales.cjs — 12 locales for the character-showcase app. Norwegian default.
// WoW terms (Mythic+, raid, ilvl) kept as recognised game terms across langs.
const fs = require("fs"); const path = require("path");
const LANGS = ["no","en","nl","fr","de","it","sv","da","fi","es","pl","pt"];
const OUT = path.join(__dirname, "src", "i18n", "locales");
fs.mkdirSync(OUT, { recursive: true });

const S = {
  no:{appName:"Wartable",tagline:"Vis frem karakteren din.",signIn:"Logg inn",continueBattleNet:"Fortsett med Battle.net",continueManual:"Fortsett uten innlogging",pickCharacter:"Velg karakter",myCharacters:"Mine karakterer",lookup:"Søk opp",enterCharacter:"Karakternavn",realm:"Realm",region:"Region",search:"Søk",gear:"Utstyr",mythicPlus:"Mythic+",raids:"Raid",achievements:"Prestasjoner",itemLevel:"Gjenstandsnivå",rating:"Vurdering",bestRuns:"Beste løp",noRuns:"Ingen løp denne sesongen",guild:"Laug",share:"Del",shareCode:"Delingskode",createCode:"Lag delingskode",viewCode:"Vis en kode",enterCode:"Skriv inn kode",myCodes:"Mine koder",copied:"Kopiert",settings:"Innstillinger",language:"Språk",theme:"Tema",themeLight:"Lyst",themeDark:"Mørkt",themeSystem:"System",signOut:"Logg ut",loading:"Laster …",retry:"Prøv igjen",notFound:"Ikke funnet",noChars:"Ingen karakterer. Logg inn med Battle.net.",level:"Nivå"},
  en:{appName:"Wartable",tagline:"Show off your character.",signIn:"Sign in",continueBattleNet:"Continue with Battle.net",continueManual:"Continue without sign-in",pickCharacter:"Pick a character",myCharacters:"My characters",lookup:"Look up",enterCharacter:"Character name",realm:"Realm",region:"Region",search:"Search",gear:"Gear",mythicPlus:"Mythic+",raids:"Raids",achievements:"Achievements",itemLevel:"Item level",rating:"Rating",bestRuns:"Best runs",noRuns:"No runs this season",guild:"Guild",share:"Share",shareCode:"Share code",createCode:"Create share code",viewCode:"View a code",enterCode:"Enter code",myCodes:"My codes",copied:"Copied",settings:"Settings",language:"Language",theme:"Theme",themeLight:"Light",themeDark:"Dark",themeSystem:"System",signOut:"Sign out",loading:"Loading …",retry:"Retry",notFound:"Not found",noChars:"No characters. Sign in with Battle.net.",level:"Level"},
  nl:{appName:"Wartable",tagline:"Toon je personage.",signIn:"Inloggen",continueBattleNet:"Doorgaan met Battle.net",continueManual:"Doorgaan zonder inloggen",pickCharacter:"Kies een personage",myCharacters:"Mijn personages",lookup:"Opzoeken",enterCharacter:"Personagenaam",realm:"Realm",region:"Regio",search:"Zoeken",gear:"Uitrusting",mythicPlus:"Mythic+",raids:"Raids",achievements:"Prestaties",itemLevel:"Itemniveau",rating:"Score",bestRuns:"Beste runs",noRuns:"Geen runs dit seizoen",guild:"Gilde",share:"Delen",shareCode:"Deelcode",createCode:"Deelcode maken",viewCode:"Code bekijken",enterCode:"Code invoeren",myCodes:"Mijn codes",copied:"Gekopieerd",settings:"Instellingen",language:"Taal",theme:"Thema",themeLight:"Licht",themeDark:"Donker",themeSystem:"Systeem",signOut:"Uitloggen",loading:"Laden …",retry:"Opnieuw",notFound:"Niet gevonden",noChars:"Geen personages. Log in met Battle.net.",level:"Niveau"},
  fr:{appName:"Wartable",tagline:"Mettez votre personnage en valeur.",signIn:"Se connecter",continueBattleNet:"Continuer avec Battle.net",continueManual:"Continuer sans connexion",pickCharacter:"Choisir un personnage",myCharacters:"Mes personnages",lookup:"Rechercher",enterCharacter:"Nom du personnage",realm:"Royaume",region:"Région",search:"Rechercher",gear:"Équipement",mythicPlus:"Mythique+",raids:"Raids",achievements:"Hauts faits",itemLevel:"Niveau d'objet",rating:"Cote",bestRuns:"Meilleures clés",noRuns:"Aucune clé cette saison",guild:"Guilde",share:"Partager",shareCode:"Code de partage",createCode:"Créer un code",viewCode:"Voir un code",enterCode:"Saisir le code",myCodes:"Mes codes",copied:"Copié",settings:"Paramètres",language:"Langue",theme:"Thème",themeLight:"Clair",themeDark:"Sombre",themeSystem:"Système",signOut:"Se déconnecter",loading:"Chargement …",retry:"Réessayer",notFound:"Introuvable",noChars:"Aucun personnage. Connectez-vous avec Battle.net.",level:"Niveau"},
  de:{appName:"Wartable",tagline:"Zeig deinen Charakter.",signIn:"Anmelden",continueBattleNet:"Mit Battle.net fortfahren",continueManual:"Ohne Anmeldung fortfahren",pickCharacter:"Charakter wählen",myCharacters:"Meine Charaktere",lookup:"Suchen",enterCharacter:"Charaktername",realm:"Realm",region:"Region",search:"Suchen",gear:"Ausrüstung",mythicPlus:"Mythisch+",raids:"Schlachtzüge",achievements:"Erfolge",itemLevel:"Gegenstandsstufe",rating:"Wertung",bestRuns:"Beste Läufe",noRuns:"Keine Läufe diese Saison",guild:"Gilde",share:"Teilen",shareCode:"Teilcode",createCode:"Teilcode erstellen",viewCode:"Code ansehen",enterCode:"Code eingeben",myCodes:"Meine Codes",copied:"Kopiert",settings:"Einstellungen",language:"Sprache",theme:"Design",themeLight:"Hell",themeDark:"Dunkel",themeSystem:"System",signOut:"Abmelden",loading:"Lädt …",retry:"Erneut",notFound:"Nicht gefunden",noChars:"Keine Charaktere. Mit Battle.net anmelden.",level:"Stufe"},
  it:{appName:"Wartable",tagline:"Mostra il tuo personaggio.",signIn:"Accedi",continueBattleNet:"Continua con Battle.net",continueManual:"Continua senza accesso",pickCharacter:"Scegli un personaggio",myCharacters:"I miei personaggi",lookup:"Cerca",enterCharacter:"Nome personaggio",realm:"Reame",region:"Regione",search:"Cerca",gear:"Equipaggiamento",mythicPlus:"Mitica+",raids:"Incursioni",achievements:"Imprese",itemLevel:"Livello oggetti",rating:"Punteggio",bestRuns:"Migliori run",noRuns:"Nessuna run questa stagione",guild:"Gilda",share:"Condividi",shareCode:"Codice",createCode:"Crea codice",viewCode:"Vedi un codice",enterCode:"Inserisci codice",myCodes:"I miei codici",copied:"Copiato",settings:"Impostazioni",language:"Lingua",theme:"Tema",themeLight:"Chiaro",themeDark:"Scuro",themeSystem:"Sistema",signOut:"Esci",loading:"Caricamento …",retry:"Riprova",notFound:"Non trovato",noChars:"Nessun personaggio. Accedi con Battle.net.",level:"Livello"},
  sv:{appName:"Wartable",tagline:"Visa upp din karaktär.",signIn:"Logga in",continueBattleNet:"Fortsätt med Battle.net",continueManual:"Fortsätt utan inloggning",pickCharacter:"Välj en karaktär",myCharacters:"Mina karaktärer",lookup:"Sök upp",enterCharacter:"Karaktärsnamn",realm:"Realm",region:"Region",search:"Sök",gear:"Utrustning",mythicPlus:"Mythic+",raids:"Raids",achievements:"Bedrifter",itemLevel:"Föremålsnivå",rating:"Betyg",bestRuns:"Bästa runs",noRuns:"Inga runs den här säsongen",guild:"Gille",share:"Dela",shareCode:"Delningskod",createCode:"Skapa delningskod",viewCode:"Visa en kod",enterCode:"Ange kod",myCodes:"Mina koder",copied:"Kopierad",settings:"Inställningar",language:"Språk",theme:"Tema",themeLight:"Ljust",themeDark:"Mörkt",themeSystem:"System",signOut:"Logga ut",loading:"Laddar …",retry:"Försök igen",notFound:"Hittades inte",noChars:"Inga karaktärer. Logga in med Battle.net.",level:"Nivå"},
  da:{appName:"Wartable",tagline:"Vis din karakter frem.",signIn:"Log ind",continueBattleNet:"Fortsæt med Battle.net",continueManual:"Fortsæt uden login",pickCharacter:"Vælg en karakter",myCharacters:"Mine karakterer",lookup:"Slå op",enterCharacter:"Karakternavn",realm:"Realm",region:"Region",search:"Søg",gear:"Udstyr",mythicPlus:"Mythic+",raids:"Raids",achievements:"Bedrifter",itemLevel:"Genstandsniveau",rating:"Vurdering",bestRuns:"Bedste runs",noRuns:"Ingen runs denne sæson",guild:"Laug",share:"Del",shareCode:"Delingskode",createCode:"Opret delingskode",viewCode:"Vis en kode",enterCode:"Indtast kode",myCodes:"Mine koder",copied:"Kopieret",settings:"Indstillinger",language:"Sprog",theme:"Tema",themeLight:"Lyst",themeDark:"Mørkt",themeSystem:"System",signOut:"Log ud",loading:"Indlæser …",retry:"Prøv igen",notFound:"Ikke fundet",noChars:"Ingen karakterer. Log ind med Battle.net.",level:"Niveau"},
  fi:{appName:"Wartable",tagline:"Esittele hahmosi.",signIn:"Kirjaudu",continueBattleNet:"Jatka Battle.netillä",continueManual:"Jatka ilman kirjautumista",pickCharacter:"Valitse hahmo",myCharacters:"Omat hahmot",lookup:"Hae",enterCharacter:"Hahmon nimi",realm:"Realm",region:"Alue",search:"Hae",gear:"Varusteet",mythicPlus:"Mythic+",raids:"Raidit",achievements:"Saavutukset",itemLevel:"Esinetaso",rating:"Pisteet",bestRuns:"Parhaat juoksut",noRuns:"Ei juoksuja tällä kaudella",guild:"Kilta",share:"Jaa",shareCode:"Jakokoodi",createCode:"Luo jakokoodi",viewCode:"Näytä koodi",enterCode:"Syötä koodi",myCodes:"Omat koodit",copied:"Kopioitu",settings:"Asetukset",language:"Kieli",theme:"Teema",themeLight:"Vaalea",themeDark:"Tumma",themeSystem:"Järjestelmä",signOut:"Kirjaudu ulos",loading:"Ladataan …",retry:"Yritä uudelleen",notFound:"Ei löytynyt",noChars:"Ei hahmoja. Kirjaudu Battle.netillä.",level:"Taso"},
  es:{appName:"Wartable",tagline:"Luce tu personaje.",signIn:"Iniciar sesión",continueBattleNet:"Continuar con Battle.net",continueManual:"Continuar sin iniciar sesión",pickCharacter:"Elige un personaje",myCharacters:"Mis personajes",lookup:"Buscar",enterCharacter:"Nombre del personaje",realm:"Reino",region:"Región",search:"Buscar",gear:"Equipo",mythicPlus:"Mítica+",raids:"Bandas",achievements:"Logros",itemLevel:"Nivel de objeto",rating:"Puntuación",bestRuns:"Mejores carreras",noRuns:"Sin carreras esta temporada",guild:"Hermandad",share:"Compartir",shareCode:"Código",createCode:"Crear código",viewCode:"Ver un código",enterCode:"Introducir código",myCodes:"Mis códigos",copied:"Copiado",settings:"Ajustes",language:"Idioma",theme:"Tema",themeLight:"Claro",themeDark:"Oscuro",themeSystem:"Sistema",signOut:"Cerrar sesión",loading:"Cargando …",retry:"Reintentar",notFound:"No encontrado",noChars:"Sin personajes. Inicia sesión con Battle.net.",level:"Nivel"},
  pl:{appName:"Wartable",tagline:"Pochwal się postacią.",signIn:"Zaloguj się",continueBattleNet:"Kontynuuj z Battle.net",continueManual:"Kontynuuj bez logowania",pickCharacter:"Wybierz postać",myCharacters:"Moje postacie",lookup:"Wyszukaj",enterCharacter:"Nazwa postaci",realm:"Realm",region:"Region",search:"Szukaj",gear:"Ekwipunek",mythicPlus:"Mityczna+",raids:"Rajdy",achievements:"Osiągnięcia",itemLevel:"Poziom przedmiotu",rating:"Wynik",bestRuns:"Najlepsze biegi",noRuns:"Brak biegów w tym sezonie",guild:"Gildia",share:"Udostępnij",shareCode:"Kod",createCode:"Utwórz kod",viewCode:"Zobacz kod",enterCode:"Wpisz kod",myCodes:"Moje kody",copied:"Skopiowano",settings:"Ustawienia",language:"Język",theme:"Motyw",themeLight:"Jasny",themeDark:"Ciemny",themeSystem:"Systemowy",signOut:"Wyloguj się",loading:"Ładowanie …",retry:"Ponów",notFound:"Nie znaleziono",noChars:"Brak postaci. Zaloguj się przez Battle.net.",level:"Poziom"},
  pt:{appName:"Wartable",tagline:"Mostra a tua personagem.",signIn:"Entrar",continueBattleNet:"Continuar com Battle.net",continueManual:"Continuar sem iniciar sessão",pickCharacter:"Escolhe uma personagem",myCharacters:"As minhas personagens",lookup:"Procurar",enterCharacter:"Nome da personagem",realm:"Reino",region:"Região",search:"Procurar",gear:"Equipamento",mythicPlus:"Mítica+",raids:"Raides",achievements:"Proezas",itemLevel:"Nível de item",rating:"Pontuação",bestRuns:"Melhores corridas",noRuns:"Sem corridas esta época",guild:"Guilda",share:"Partilhar",shareCode:"Código",createCode:"Criar código",viewCode:"Ver um código",enterCode:"Inserir código",myCodes:"Os meus códigos",copied:"Copiado",settings:"Definições",language:"Idioma",theme:"Tema",themeLight:"Claro",themeDark:"Escuro",themeSystem:"Sistema",signOut:"Sair",loading:"A carregar …",retry:"Tentar de novo",notFound:"Não encontrado",noChars:"Sem personagens. Inicia sessão com Battle.net.",level:"Nível"},
};
let n=0; for(const l of LANGS){ fs.writeFileSync(path.join(OUT,`${l}.json`), JSON.stringify(S[l],null,2)+"\n"); n++; console.log("✓",l); }
console.log(`\n${n} locale files written`);
=======
/**
 * gen-locales.cjs — writes src/i18n/locales/<lang>.json for all 12 languages.
 *
 * Wartable guild-finder UI strings. Norwegian default. Edit here, re-run:
 *   node gen-locales.cjs
 *
 * WoW domain terms (faction names Alliance/Horde, "raid", "M+", "PvP") are
 * kept as recognised English game terms in every language — the WoW community
 * uses them universally — except where a natural local word clearly exists.
 */
const fs = require("fs");
const path = require("path");

const LANGS = ["no", "en", "nl", "fr", "de", "it", "sv", "da", "fi", "es", "pl", "pt"];
const OUT = path.join(__dirname, "src", "i18n", "locales");
fs.mkdirSync(OUT, { recursive: true });

// Keys grouped by area. Keep flat keys for simple t("key") lookups.
const STR = {
  no: {
    appName: "Wartable",
    tagline: "Finn lauget ditt. Finn spillerne dine.",
    // tabs
    tabBrowse: "Utforsk", tabMatches: "Treff", tabPost: "Annonse", tabProfile: "Profil",
    // auth
    signIn: "Logg inn", signUp: "Registrer deg", signOut: "Logg ut",
    continueBattleNet: "Fortsett med Battle.net", continueManual: "Fortsett uten innlogging",
    email: "E-post", password: "Passord",
    // roles / sides
    iAmPlayer: "Jeg er spiller", iAmGuild: "Jeg representerer et laug",
    // browse / filters
    browseGuilds: "Utforsk laug", browsePlayers: "Utforsk spillere",
    filters: "Filtre", region: "Region", faction: "Fraksjon", version: "Versjon",
    retail: "Retail", classic: "Classic", any: "Alle",
    alliance: "Alliance", horde: "Horde",
    playstyle: "Spillestil", raiding: "Raiding", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Sosialt",
    // listing fields
    guildName: "Laugnavn", realm: "Realm", about: "Om", lookingFor: "Søker etter", raidDays: "Raid-dager", timezone: "Tidssone",
    classNeeds: "Klassebehov", apply: "Søk", applied: "Søkt", interested: "Interessert",
    // matches
    yourMatches: "Dine treff", noMatchesYet: "Ingen treff ennå", message: "Melding",
    // post
    createListing: "Opprett annonse", editListing: "Rediger annonse", publish: "Publiser", saveDraft: "Lagre utkast",
    // profile / settings
    settings: "Innstillinger", language: "Språk", theme: "Tema",
    themeLight: "Lyst", themeDark: "Mørkt", themeSystem: "System",
    // generic
    save: "Lagre", cancel: "Avbryt", back: "Tilbake", next: "Neste", done: "Ferdig",
    loading: "Laster …", noData: "Ingen data", retry: "Prøv igjen",
  },
  en: {
    appName: "Wartable",
    tagline: "Find your guild. Find your players.",
    tabBrowse: "Browse", tabMatches: "Matches", tabPost: "Listing", tabProfile: "Profile",
    signIn: "Sign in", signUp: "Sign up", signOut: "Sign out",
    continueBattleNet: "Continue with Battle.net", continueManual: "Continue without sign-in",
    email: "Email", password: "Password",
    iAmPlayer: "I'm a player", iAmGuild: "I represent a guild",
    browseGuilds: "Browse guilds", browsePlayers: "Browse players",
    filters: "Filters", region: "Region", faction: "Faction", version: "Version",
    retail: "Retail", classic: "Classic", any: "Any",
    alliance: "Alliance", horde: "Horde",
    playstyle: "Playstyle", raiding: "Raiding", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Social",
    guildName: "Guild name", realm: "Realm", about: "About", lookingFor: "Looking for", raidDays: "Raid days", timezone: "Timezone",
    classNeeds: "Class needs", apply: "Apply", applied: "Applied", interested: "Interested",
    yourMatches: "Your matches", noMatchesYet: "No matches yet", message: "Message",
    createListing: "Create listing", editListing: "Edit listing", publish: "Publish", saveDraft: "Save draft",
    settings: "Settings", language: "Language", theme: "Theme",
    themeLight: "Light", themeDark: "Dark", themeSystem: "System",
    save: "Save", cancel: "Cancel", back: "Back", next: "Next", done: "Done",
    loading: "Loading …", noData: "No data", retry: "Retry",
  },
  nl: {
    appName: "Wartable", tagline: "Vind je gilde. Vind je spelers.",
    tabBrowse: "Verkennen", tabMatches: "Matches", tabPost: "Advertentie", tabProfile: "Profiel",
    signIn: "Inloggen", signUp: "Registreren", signOut: "Uitloggen",
    continueBattleNet: "Doorgaan met Battle.net", continueManual: "Doorgaan zonder inloggen",
    email: "E-mail", password: "Wachtwoord",
    iAmPlayer: "Ik ben speler", iAmGuild: "Ik vertegenwoordig een gilde",
    browseGuilds: "Gildes verkennen", browsePlayers: "Spelers verkennen",
    filters: "Filters", region: "Regio", faction: "Factie", version: "Versie",
    retail: "Retail", classic: "Classic", any: "Alle", alliance: "Alliance", horde: "Horde",
    playstyle: "Speelstijl", raiding: "Raiding", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Sociaal",
    guildName: "Gildenaam", realm: "Realm", about: "Over", lookingFor: "Zoekt", raidDays: "Raid-dagen", timezone: "Tijdzone",
    classNeeds: "Klassebehoefte", apply: "Aanmelden", applied: "Aangemeld", interested: "Geïnteresseerd",
    yourMatches: "Jouw matches", noMatchesYet: "Nog geen matches", message: "Bericht",
    createListing: "Advertentie maken", editListing: "Advertentie bewerken", publish: "Publiceren", saveDraft: "Concept opslaan",
    settings: "Instellingen", language: "Taal", theme: "Thema",
    themeLight: "Licht", themeDark: "Donker", themeSystem: "Systeem",
    save: "Opslaan", cancel: "Annuleren", back: "Terug", next: "Volgende", done: "Klaar",
    loading: "Laden …", noData: "Geen data", retry: "Opnieuw",
  },
  fr: {
    appName: "Wartable", tagline: "Trouvez votre guilde. Trouvez vos joueurs.",
    tabBrowse: "Explorer", tabMatches: "Affinités", tabPost: "Annonce", tabProfile: "Profil",
    signIn: "Se connecter", signUp: "S'inscrire", signOut: "Se déconnecter",
    continueBattleNet: "Continuer avec Battle.net", continueManual: "Continuer sans connexion",
    email: "E-mail", password: "Mot de passe",
    iAmPlayer: "Je suis joueur", iAmGuild: "Je représente une guilde",
    browseGuilds: "Explorer les guildes", browsePlayers: "Explorer les joueurs",
    filters: "Filtres", region: "Région", faction: "Faction", version: "Version",
    retail: "Retail", classic: "Classic", any: "Toutes", alliance: "Alliance", horde: "Horde",
    playstyle: "Style de jeu", raiding: "Raid", mythicPlus: "Mythique+", pvp: "JcJ", casual: "Détente", social: "Social",
    guildName: "Nom de guilde", realm: "Royaume", about: "À propos", lookingFor: "Recherche", raidDays: "Jours de raid", timezone: "Fuseau horaire",
    classNeeds: "Classes recherchées", apply: "Postuler", applied: "Postulé", interested: "Intéressé",
    yourMatches: "Vos affinités", noMatchesYet: "Pas encore d'affinités", message: "Message",
    createListing: "Créer une annonce", editListing: "Modifier l'annonce", publish: "Publier", saveDraft: "Enregistrer le brouillon",
    settings: "Paramètres", language: "Langue", theme: "Thème",
    themeLight: "Clair", themeDark: "Sombre", themeSystem: "Système",
    save: "Enregistrer", cancel: "Annuler", back: "Retour", next: "Suivant", done: "Terminé",
    loading: "Chargement …", noData: "Aucune donnée", retry: "Réessayer",
  },
  de: {
    appName: "Wartable", tagline: "Finde deine Gilde. Finde deine Spieler.",
    tabBrowse: "Stöbern", tabMatches: "Treffer", tabPost: "Anzeige", tabProfile: "Profil",
    signIn: "Anmelden", signUp: "Registrieren", signOut: "Abmelden",
    continueBattleNet: "Mit Battle.net fortfahren", continueManual: "Ohne Anmeldung fortfahren",
    email: "E-Mail", password: "Passwort",
    iAmPlayer: "Ich bin Spieler", iAmGuild: "Ich vertrete eine Gilde",
    browseGuilds: "Gilden durchstöbern", browsePlayers: "Spieler durchstöbern",
    filters: "Filter", region: "Region", faction: "Fraktion", version: "Version",
    retail: "Retail", classic: "Classic", any: "Alle", alliance: "Allianz", horde: "Horde",
    playstyle: "Spielstil", raiding: "Raiding", mythicPlus: "Mythisch+", pvp: "PvP", casual: "Casual", social: "Sozial",
    guildName: "Gildenname", realm: "Realm", about: "Über", lookingFor: "Sucht", raidDays: "Raid-Tage", timezone: "Zeitzone",
    classNeeds: "Klassenbedarf", apply: "Bewerben", applied: "Beworben", interested: "Interessiert",
    yourMatches: "Deine Treffer", noMatchesYet: "Noch keine Treffer", message: "Nachricht",
    createListing: "Anzeige erstellen", editListing: "Anzeige bearbeiten", publish: "Veröffentlichen", saveDraft: "Entwurf speichern",
    settings: "Einstellungen", language: "Sprache", theme: "Design",
    themeLight: "Hell", themeDark: "Dunkel", themeSystem: "System",
    save: "Speichern", cancel: "Abbrechen", back: "Zurück", next: "Weiter", done: "Fertig",
    loading: "Lädt …", noData: "Keine Daten", retry: "Erneut",
  },
  it: {
    appName: "Wartable", tagline: "Trova la tua gilda. Trova i tuoi giocatori.",
    tabBrowse: "Esplora", tabMatches: "Affinità", tabPost: "Annuncio", tabProfile: "Profilo",
    signIn: "Accedi", signUp: "Registrati", signOut: "Esci",
    continueBattleNet: "Continua con Battle.net", continueManual: "Continua senza accesso",
    email: "E-mail", password: "Password",
    iAmPlayer: "Sono un giocatore", iAmGuild: "Rappresento una gilda",
    browseGuilds: "Esplora le gilde", browsePlayers: "Esplora i giocatori",
    filters: "Filtri", region: "Regione", faction: "Fazione", version: "Versione",
    retail: "Retail", classic: "Classic", any: "Tutte", alliance: "Alleanza", horde: "Orda",
    playstyle: "Stile di gioco", raiding: "Raid", mythicPlus: "Mitica+", pvp: "PvP", casual: "Casual", social: "Sociale",
    guildName: "Nome gilda", realm: "Reame", about: "Info", lookingFor: "Cerca", raidDays: "Giorni di raid", timezone: "Fuso orario",
    classNeeds: "Classi richieste", apply: "Candidati", applied: "Candidato", interested: "Interessato",
    yourMatches: "Le tue affinità", noMatchesYet: "Ancora nessuna affinità", message: "Messaggio",
    createListing: "Crea annuncio", editListing: "Modifica annuncio", publish: "Pubblica", saveDraft: "Salva bozza",
    settings: "Impostazioni", language: "Lingua", theme: "Tema",
    themeLight: "Chiaro", themeDark: "Scuro", themeSystem: "Sistema",
    save: "Salva", cancel: "Annulla", back: "Indietro", next: "Avanti", done: "Fatto",
    loading: "Caricamento …", noData: "Nessun dato", retry: "Riprova",
  },
  sv: {
    appName: "Wartable", tagline: "Hitta ditt gille. Hitta dina spelare.",
    tabBrowse: "Utforska", tabMatches: "Träffar", tabPost: "Annons", tabProfile: "Profil",
    signIn: "Logga in", signUp: "Registrera", signOut: "Logga ut",
    continueBattleNet: "Fortsätt med Battle.net", continueManual: "Fortsätt utan inloggning",
    email: "E-post", password: "Lösenord",
    iAmPlayer: "Jag är spelare", iAmGuild: "Jag representerar ett gille",
    browseGuilds: "Utforska gillen", browsePlayers: "Utforska spelare",
    filters: "Filter", region: "Region", faction: "Fraktion", version: "Version",
    retail: "Retail", classic: "Classic", any: "Alla", alliance: "Alliance", horde: "Horde",
    playstyle: "Spelstil", raiding: "Raiding", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Socialt",
    guildName: "Gillenamn", realm: "Realm", about: "Om", lookingFor: "Söker", raidDays: "Raid-dagar", timezone: "Tidszon",
    classNeeds: "Klassbehov", apply: "Ansök", applied: "Ansökt", interested: "Intresserad",
    yourMatches: "Dina träffar", noMatchesYet: "Inga träffar ännu", message: "Meddelande",
    createListing: "Skapa annons", editListing: "Redigera annons", publish: "Publicera", saveDraft: "Spara utkast",
    settings: "Inställningar", language: "Språk", theme: "Tema",
    themeLight: "Ljust", themeDark: "Mörkt", themeSystem: "System",
    save: "Spara", cancel: "Avbryt", back: "Tillbaka", next: "Nästa", done: "Klar",
    loading: "Laddar …", noData: "Inga data", retry: "Försök igen",
  },
  da: {
    appName: "Wartable", tagline: "Find dit laug. Find dine spillere.",
    tabBrowse: "Udforsk", tabMatches: "Match", tabPost: "Annonce", tabProfile: "Profil",
    signIn: "Log ind", signUp: "Opret", signOut: "Log ud",
    continueBattleNet: "Fortsæt med Battle.net", continueManual: "Fortsæt uden login",
    email: "E-mail", password: "Adgangskode",
    iAmPlayer: "Jeg er spiller", iAmGuild: "Jeg repræsenterer et laug",
    browseGuilds: "Udforsk laug", browsePlayers: "Udforsk spillere",
    filters: "Filtre", region: "Region", faction: "Fraktion", version: "Version",
    retail: "Retail", classic: "Classic", any: "Alle", alliance: "Alliance", horde: "Horde",
    playstyle: "Spillestil", raiding: "Raiding", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Socialt",
    guildName: "Laugnavn", realm: "Realm", about: "Om", lookingFor: "Søger", raidDays: "Raid-dage", timezone: "Tidszone",
    classNeeds: "Klassebehov", apply: "Ansøg", applied: "Ansøgt", interested: "Interesseret",
    yourMatches: "Dine match", noMatchesYet: "Ingen match endnu", message: "Besked",
    createListing: "Opret annonce", editListing: "Rediger annonce", publish: "Udgiv", saveDraft: "Gem kladde",
    settings: "Indstillinger", language: "Sprog", theme: "Tema",
    themeLight: "Lyst", themeDark: "Mørkt", themeSystem: "System",
    save: "Gem", cancel: "Annuller", back: "Tilbage", next: "Næste", done: "Færdig",
    loading: "Indlæser …", noData: "Ingen data", retry: "Prøv igen",
  },
  fi: {
    appName: "Wartable", tagline: "Löydä kiltasi. Löydä pelaajasi.",
    tabBrowse: "Selaa", tabMatches: "Osumat", tabPost: "Ilmoitus", tabProfile: "Profiili",
    signIn: "Kirjaudu", signUp: "Rekisteröidy", signOut: "Kirjaudu ulos",
    continueBattleNet: "Jatka Battle.netillä", continueManual: "Jatka ilman kirjautumista",
    email: "Sähköposti", password: "Salasana",
    iAmPlayer: "Olen pelaaja", iAmGuild: "Edustan kiltaa",
    browseGuilds: "Selaa kiltoja", browsePlayers: "Selaa pelaajia",
    filters: "Suodattimet", region: "Alue", faction: "Faktio", version: "Versio",
    retail: "Retail", classic: "Classic", any: "Kaikki", alliance: "Alliance", horde: "Horde",
    playstyle: "Pelityyli", raiding: "Raidaus", mythicPlus: "Mythic+", pvp: "PvP", casual: "Casual", social: "Sosiaalinen",
    guildName: "Killan nimi", realm: "Realm", about: "Tietoa", lookingFor: "Etsii", raidDays: "Raid-päivät", timezone: "Aikavyöhyke",
    classNeeds: "Luokkatarpeet", apply: "Hae", applied: "Haettu", interested: "Kiinnostunut",
    yourMatches: "Osumasi", noMatchesYet: "Ei osumia vielä", message: "Viesti",
    createListing: "Luo ilmoitus", editListing: "Muokkaa ilmoitusta", publish: "Julkaise", saveDraft: "Tallenna luonnos",
    settings: "Asetukset", language: "Kieli", theme: "Teema",
    themeLight: "Vaalea", themeDark: "Tumma", themeSystem: "Järjestelmä",
    save: "Tallenna", cancel: "Peruuta", back: "Takaisin", next: "Seuraava", done: "Valmis",
    loading: "Ladataan …", noData: "Ei tietoja", retry: "Yritä uudelleen",
  },
  es: {
    appName: "Wartable", tagline: "Encuentra tu hermandad. Encuentra a tus jugadores.",
    tabBrowse: "Explorar", tabMatches: "Coincidencias", tabPost: "Anuncio", tabProfile: "Perfil",
    signIn: "Iniciar sesión", signUp: "Registrarse", signOut: "Cerrar sesión",
    continueBattleNet: "Continuar con Battle.net", continueManual: "Continuar sin iniciar sesión",
    email: "Correo", password: "Contraseña",
    iAmPlayer: "Soy jugador", iAmGuild: "Represento una hermandad",
    browseGuilds: "Explorar hermandades", browsePlayers: "Explorar jugadores",
    filters: "Filtros", region: "Región", faction: "Facción", version: "Versión",
    retail: "Retail", classic: "Classic", any: "Todas", alliance: "Alianza", horde: "Horda",
    playstyle: "Estilo de juego", raiding: "Raideo", mythicPlus: "Mítica+", pvp: "JcJ", casual: "Casual", social: "Social",
    guildName: "Nombre de hermandad", realm: "Reino", about: "Acerca de", lookingFor: "Busca", raidDays: "Días de raid", timezone: "Zona horaria",
    classNeeds: "Clases buscadas", apply: "Postular", applied: "Postulado", interested: "Interesado",
    yourMatches: "Tus coincidencias", noMatchesYet: "Aún no hay coincidencias", message: "Mensaje",
    createListing: "Crear anuncio", editListing: "Editar anuncio", publish: "Publicar", saveDraft: "Guardar borrador",
    settings: "Ajustes", language: "Idioma", theme: "Tema",
    themeLight: "Claro", themeDark: "Oscuro", themeSystem: "Sistema",
    save: "Guardar", cancel: "Cancelar", back: "Atrás", next: "Siguiente", done: "Listo",
    loading: "Cargando …", noData: "Sin datos", retry: "Reintentar",
  },
  pl: {
    appName: "Wartable", tagline: "Znajdź swoją gildię. Znajdź swoich graczy.",
    tabBrowse: "Przeglądaj", tabMatches: "Dopasowania", tabPost: "Ogłoszenie", tabProfile: "Profil",
    signIn: "Zaloguj się", signUp: "Zarejestruj się", signOut: "Wyloguj się",
    continueBattleNet: "Kontynuuj z Battle.net", continueManual: "Kontynuuj bez logowania",
    email: "E-mail", password: "Hasło",
    iAmPlayer: "Jestem graczem", iAmGuild: "Reprezentuję gildię",
    browseGuilds: "Przeglądaj gildie", browsePlayers: "Przeglądaj graczy",
    filters: "Filtry", region: "Region", faction: "Frakcja", version: "Wersja",
    retail: "Retail", classic: "Classic", any: "Wszystkie", alliance: "Przymierze", horde: "Horda",
    playstyle: "Styl gry", raiding: "Rajdy", mythicPlus: "Mityczna+", pvp: "PvP", casual: "Casual", social: "Towarzyski",
    guildName: "Nazwa gildii", realm: "Realm", about: "O nas", lookingFor: "Szuka", raidDays: "Dni rajdów", timezone: "Strefa czasowa",
    classNeeds: "Potrzebne klasy", apply: "Aplikuj", applied: "Zaaplikowano", interested: "Zainteresowany",
    yourMatches: "Twoje dopasowania", noMatchesYet: "Brak dopasowań", message: "Wiadomość",
    createListing: "Utwórz ogłoszenie", editListing: "Edytuj ogłoszenie", publish: "Opublikuj", saveDraft: "Zapisz szkic",
    settings: "Ustawienia", language: "Język", theme: "Motyw",
    themeLight: "Jasny", themeDark: "Ciemny", themeSystem: "Systemowy",
    save: "Zapisz", cancel: "Anuluj", back: "Wstecz", next: "Dalej", done: "Gotowe",
    loading: "Ładowanie …", noData: "Brak danych", retry: "Ponów",
  },
  pt: {
    appName: "Wartable", tagline: "Encontra a tua guilda. Encontra os teus jogadores.",
    tabBrowse: "Explorar", tabMatches: "Correspondências", tabPost: "Anúncio", tabProfile: "Perfil",
    signIn: "Entrar", signUp: "Registar", signOut: "Sair",
    continueBattleNet: "Continuar com Battle.net", continueManual: "Continuar sem iniciar sessão",
    email: "E-mail", password: "Palavra-passe",
    iAmPlayer: "Sou jogador", iAmGuild: "Represento uma guilda",
    browseGuilds: "Explorar guildas", browsePlayers: "Explorar jogadores",
    filters: "Filtros", region: "Região", faction: "Facção", version: "Versão",
    retail: "Retail", classic: "Classic", any: "Todas", alliance: "Aliança", horde: "Horda",
    playstyle: "Estilo de jogo", raiding: "Raide", mythicPlus: "Mítica+", pvp: "JcJ", casual: "Casual", social: "Social",
    guildName: "Nome da guilda", realm: "Reino", about: "Sobre", lookingFor: "Procura", raidDays: "Dias de raide", timezone: "Fuso horário",
    classNeeds: "Classes procuradas", apply: "Candidatar", applied: "Candidatado", interested: "Interessado",
    yourMatches: "As tuas correspondências", noMatchesYet: "Ainda sem correspondências", message: "Mensagem",
    createListing: "Criar anúncio", editListing: "Editar anúncio", publish: "Publicar", saveDraft: "Guardar rascunho",
    settings: "Definições", language: "Idioma", theme: "Tema",
    themeLight: "Claro", themeDark: "Escuro", themeSystem: "Sistema",
    save: "Guardar", cancel: "Cancelar", back: "Voltar", next: "Seguinte", done: "Concluído",
    loading: "A carregar …", noData: "Sem dados", retry: "Tentar de novo",
  },
};

let count = 0;
for (const lang of LANGS) {
  fs.writeFileSync(
    path.join(OUT, `${lang}.json`),
    JSON.stringify(STR[lang], null, 2) + "\n",
    "utf8",
  );
  count++;
  console.log(`✓ ${lang}.json (${Object.keys(STR[lang]).length} keys)`);
}
console.log(`\nDone. ${count} locale files written to src/i18n/locales`);
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
