# Vinyl Vault
Oversikt over vinylsamlingen: eide og manglende plater, hvor komplett hver artist er. Én HTML-fil (`index.html`) med `sw.js`.
Nettside: https://kilemann.github.io/Vinyl-Vault.io/

## Regler for alt arbeid i dette repoet
- Svar brukeren på norsk. Commit-meldinger på norsk, med versjon først (f.eks. «Appnavn 1.4.0: kort beskrivelse»).
- Hver endring får nytt versjonsnummer (MAJOR.MINOR.PATCH) og en linje i endringsloggen. Versjonen skal være lik på alle stedene under.
- Lever rett på `main` når resultatet er godt nok og testene er grønne. Kjør `git fetch origin main` og rebase før push.
- Testdrevet utvikling (TDD) bare når brukeren ber om det. Eksisterende tester kjøres alltid før push.
- Tekniske påstander skal sjekkes mot dokumentasjon eller kilde, ikke gjettes.
- Appen står på samlesida (kilemann.github.io). Den skal vise navn, versjon og en (i)-knapp øverst til venstre. (i) åpner info-vinduet med bruksanvisning og versjonsliste. Oppdater versjonslista der ved hver ny versjon.
- Publiseres med GitHub Pages fra `main` (rot). Det tar noen minutter før endringen er ute.

## Versjon står her
- `index.html`: kommentaren øverst (`/* Vinyl Vault vX.Y.Z`), kommentaren over skriptet, `const APP_VERSION` og versjonslista i `openInfo()`
- `package.json`, `README.md` (tittel), `CHANGELOG.md`
- `sw.js` og `scripts/fetch-covers.mjs` nevner versjonen i kommentar/User-Agent

## Tester
Ingen automatiske tester ennå. Sjekk i nettleser (mobil og PC) før push.

## Viktig
- Samlingen ligger i `collection.json` og skrives av appen via GitHub API (én commit per lagring). Coverbilder i `covers/` hentes av en robot (`.github/workflows/covers.yml`). Ikke endre disse for hånd, og hent alltid siste `main` før push.
- Streng innholdssikkerhetspolicy (CSP) i `<head>`. Nye eksterne adresser må legges til der.
