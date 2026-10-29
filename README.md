# Vinyl Vault v1.1.0
Oversikt over vinylsamlingen: hvilke plater du eier, hvilke du mangler og hvor komplett samlingen er per artist.

Åpne: https://kilemann.github.io/Vinyl-Vault.io/

## Slik virker lagringen
- Samlingen ligger i `collection.json` i dette repoet. Alle som åpner lenken ser den, men kan ikke endre den.
- For å redigere: trykk **🔒 Lås opp** og lim inn en GitHub-nøkkel:
  1. https://github.com/settings/personal-access-tokens/new
  2. Repository access: **Only select repositories** → **Vinyl-Vault.io**
  3. Repository permissions: **Contents: Read and write**
- Nøkkelen lagres bare på enheten. Hver lagring blir en commit, så all historikk finnes i GitHub.
- Diagrammene bruker Chart.js fra cdnjs.

Endringer: se [CHANGELOG.md](CHANGELOG.md).
