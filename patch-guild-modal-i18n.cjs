// patch-guild-modal-i18n.cjs — adds GuildMemberModal strings to all 12 locales.
// Idempotent: re-running skips keys that already exist. No .bak files.
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "src", "i18n", "locales");
const SENTINEL = "professions"; // if present, assume this patch already ran

const STRINGS = {
  no: { professions: "Yrker", activeNow: "Aktiv nå", lastSeenMinutes: "Sist sett for {n} min siden", lastSeenHours: "Sist sett for {n}t siden", lastSeenDays: "Sist sett for {n}d siden", lastSeenMonths: "Sist sett for {n}mnd siden", couldntLoad: "Kunne ikke laste denne karakteren akkurat nå.", activity: "Aktivitet" },
  en: { professions: "Professions", activeNow: "Active now", lastSeenMinutes: "Last seen {n} min ago", lastSeenHours: "Last seen {n}h ago", lastSeenDays: "Last seen {n}d ago", lastSeenMonths: "Last seen {n}mo ago", couldntLoad: "Couldn't load this character right now.", activity: "Activity" },
  nl: { professions: "Beroepen", activeNow: "Nu actief", lastSeenMinutes: "{n} min geleden gezien", lastSeenHours: "{n}u geleden gezien", lastSeenDays: "{n}d geleden gezien", lastSeenMonths: "{n}mnd geleden gezien", couldntLoad: "Kon dit personage nu niet laden.", activity: "Activiteit" },
  fr: { professions: "Métiers", activeNow: "Actif maintenant", lastSeenMinutes: "Vu il y a {n} min", lastSeenHours: "Vu il y a {n}h", lastSeenDays: "Vu il y a {n}j", lastSeenMonths: "Vu il y a {n}mois", couldntLoad: "Impossible de charger ce personnage pour le moment.", activity: "Activité" },
  de: { professions: "Berufe", activeNow: "Jetzt aktiv", lastSeenMinutes: "Zuletzt vor {n} Min gesehen", lastSeenHours: "Zuletzt vor {n}Std gesehen", lastSeenDays: "Zuletzt vor {n}T gesehen", lastSeenMonths: "Zuletzt vor {n}Mon gesehen", couldntLoad: "Dieser Charakter konnte gerade nicht geladen werden.", activity: "Aktivität" },
  it: { professions: "Professioni", activeNow: "Attivo ora", lastSeenMinutes: "Visto {n} min fa", lastSeenHours: "Visto {n}h fa", lastSeenDays: "Visto {n}g fa", lastSeenMonths: "Visto {n}mesi fa", couldntLoad: "Impossibile caricare questo personaggio al momento.", activity: "Attività" },
  sv: { professions: "Yrken", activeNow: "Aktiv nu", lastSeenMinutes: "Sågs för {n} min sedan", lastSeenHours: "Sågs för {n}h sedan", lastSeenDays: "Sågs för {n}d sedan", lastSeenMonths: "Sågs för {n}mån sedan", couldntLoad: "Kunde inte ladda den här karaktären just nu.", activity: "Aktivitet" },
  da: { professions: "Erhverv", activeNow: "Aktiv nu", lastSeenMinutes: "Sidst set for {n} min siden", lastSeenHours: "Sidst set for {n}t siden", lastSeenDays: "Sidst set for {n}d siden", lastSeenMonths: "Sidst set for {n}mdr siden", couldntLoad: "Kunne ikke indlæse denne karakter lige nu.", activity: "Aktivitet" },
  fi: { professions: "Ammatit", activeNow: "Aktiivinen nyt", lastSeenMinutes: "Nähty {n} min sitten", lastSeenHours: "Nähty {n}t sitten", lastSeenDays: "Nähty {n}pv sitten", lastSeenMonths: "Nähty {n}kk sitten", couldntLoad: "Hahmoa ei voitu ladata juuri nyt.", activity: "Aktiivisuus" },
  es: { professions: "Profesiones", activeNow: "Activo ahora", lastSeenMinutes: "Visto hace {n} min", lastSeenHours: "Visto hace {n}h", lastSeenDays: "Visto hace {n}d", lastSeenMonths: "Visto hace {n}meses", couldntLoad: "No se pudo cargar este personaje ahora mismo.", activity: "Actividad" },
  pl: { professions: "Profesje", activeNow: "Aktywny teraz", lastSeenMinutes: "Widziany {n} min temu", lastSeenHours: "Widziany {n}godz temu", lastSeenDays: "Widziany {n}d temu", lastSeenMonths: "Widziany {n}mies temu", couldntLoad: "Nie udało się teraz załadować tej postaci.", activity: "Aktywność" },
  pt: { professions: "Profissões", activeNow: "Ativo agora", lastSeenMinutes: "Visto há {n} min", lastSeenHours: "Visto há {n}h", lastSeenDays: "Visto há {n}d", lastSeenMonths: "Visto há {n}meses", couldntLoad: "Não foi possível carregar este personagem agora.", activity: "Atividade" },
};

let patched = 0, skipped = 0;
Object.keys(STRINGS).forEach(function (loc) {
  const file = path.join(LOCALES_DIR, loc + ".json");
  if (!fs.existsSync(file)) { console.warn("skip (missing): " + loc); return; }
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  if (Object.prototype.hasOwnProperty.call(json, SENTINEL)) { skipped++; return; }
  Object.assign(json, STRINGS[loc]);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf8");
  patched++;
  console.log("patched: " + loc);
});
console.log("done — patched " + patched + ", skipped " + skipped);