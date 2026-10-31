# Vinyl Vault v1.8.0
Oversikt over vinylsamlingen: hvilke plater du eier, hvilke du mangler og hvor komplett samlingen er per artist.

Åpne: https://kilemann.github.io/Vinyl-Vault.io/

## Slik virker lagringen
- Samlingen ligger i `collection.json` i dette repoet. Alle som åpner lenken ser den, men kan ikke endre den.
- For å redigere: trykk **🔒 Lås opp** og lim inn en GitHub-nøkkel:
  1. https://github.com/settings/personal-access-tokens/new
  2. Repository access: **Only select repositories** → **Vinyl-Vault.io**
  3. Repository permissions: **Contents: Read and write**
- Endringer lagres til GitHub 1 minutt etter siste endring, eller straks med «💾 Lagre nå». Nøkkelen lagres bare på enheten. Hver lagring blir en commit, så all historikk finnes i GitHub.
- Album, cover og tracklister kan hentes automatisk fra MusicBrainz og Cover Art Archive (gratis, uten nøkkel).
- Diagrammene bruker Chart.js fra cdnjs.

## Coverbilder
- GitHub-jobben **Lagre cover** (`.github/workflows/covers.yml`) kjører når `collection.json` endres.
  Den henter manglende cover fra Cover Art Archive og legger dem i `covers/`, med oversikt i `covers/index.json`.
  Kan også startes for hånd under Actions → Lagre cover → Run workflow.
- Appen viser cover fra `covers/` når de finnes, ellers fra nettet. Hver enhet husker bildene (`sw.js`), så de vises straks neste gang.

Endringer: se [CHANGELOG.md](CHANGELOG.md).
