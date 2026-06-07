# Wartable — WoW guild finder (Expo, plain JS)

Two-sided matching: players find guilds, guilds find players. Optional
Battle.net sign-in. Retail + Classic. 12 languages. Light/dark theme.

## House style
Plain JavaScript · React Navigation (native-stack + bottom-tabs) ·
TanStack Query · Zustand · Axios (interceptors) · expo-secure-store ·
i18next (12 locales, Norwegian default) · full file scaffolds, no .bak files.

## Setup (from scratch)
This scaffold assumes a blank Expo JS app. If starting fresh:
```
npx create-expo-app@latest wartable --template blank
cd wartable
```
Then copy the `src/` folder, `App.js`, and `gen-locales.cjs` in, and install:
```
npx expo install react-native-screens react-native-safe-area-context \
  react-native-gesture-handler expo-secure-store expo-localization expo-auth-session expo-web-browser
npm install @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs @tanstack/react-query zustand axios \
  i18next react-i18next
```
Run:
```
npx expo start
```

## Structure
```
App.js                         entry: Query + Theme + Navigation providers
gen-locales.cjs                edit + `node gen-locales.cjs` to regen locales
src/
  theme/  themes.js  ThemeContext.jsx     light/dark tokens + useTheme()
  i18n/   index.js  locales/<12>.json     i18next, device-lang detect
  api/    client.js                        axios + auth interceptors
  store/  useAuthStore.js                  zustand auth (BNet + manual)
  navigation/ RootNavigator.jsx            auth gate → tabs
  components/ ListingCard.jsx
  screens/ Onboarding SignIn Browse Matches Post Profile Settings ListingDetail
  data/    sampleListings.js               model shapes + mock data
```

## Data model (backend contract)
GuildListing: { id, type:"guild", guildName, realm, region, faction, version,
  playstyle[], raidDays[], timezone, about, classNeeds[] }
PlayerListing: { id, type:"player", displayName, mainClass, mainSpec, ilvl,
  region, faction, version, playstyle[], availability[], about }
Enums: region EU|NA|OCE|any · faction alliance|horde|any · version retail|classic|any

## TODO
- Backend: Node/Express/MongoDB. Endpoints for listings (CRUD), matches, messages.
- Battle.net OAuth: wire SignInScreen.startBattleNet via expo-auth-session,
  exchange code on backend, call useAuthStore.signInWithToken(token,user).
- Set API_BASE_URL in src/api/client.js (env/app.config, not hard-coded).
- Build the Post listing form and Filters sheet (fields from sampleListings.js).
- Replace SAMPLE_GUILDS/PLAYERS with TanStack Query hooks against the API.
