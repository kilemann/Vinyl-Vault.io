# Endringslogg – Vinyl Vault

## 1.2.0 – 2026-10-29
- Hent album automatisk fra MusicBrainz når en ny artist legges til (valg i skjemaet, på som standard).
- Velg riktig artist blant søketreffene, og velg album gruppert som studio, live, samle og annet. Studioalbum er forhåndsvalgt.
- Album legges inn som «Mangler» med år, sjanger og cover fra Cover Art Archive.
- Tracklister hentes i bakgrunnen. Vinylutgaven foretrekkes når den finnes.
- Knappen «Hent album» på artistsiden henter det som mangler for eksisterende artister.
  Album du allerede har med samme tittel får cover og trackliste, og legges ikke inn på nytt.
- Knappen «Hent trackliste» på albumsiden for album uten spor.
- Kall til MusicBrainz går i kø med minst 1,1 sekund mellomrom, og prøves på nytt hvis tjenesten er travel.

## 1.1.0 – 2026-10-29
- Samlingen ligger nå i `collection.json` i GitHub-repoet. Alle som åpner lenken ser samme samling.
- Lesemodus for alle. Redigering låses opp med en GitHub-nøkkel (fine-grained token med «Contents: Read and write»
  for Vinyl-Vault.io), som lagres bare på enheten den legges inn på.
- Endringer lagres automatisk til GitHub ca. 1,5 sekunder etter siste klikk. Statusvisning: Lagrer… / Lagret / Ikke lagret – prøv igjen.
- Varsler hvis samlingen er endret fra en annen enhet, og lar deg velge hvilken versjon som skal gjelde.
- Ulagrede endringer sendes neste gang appen åpnes.
- Ved første opplåsing tilbys en samling lagret lokalt i v1.0.0 lastet opp (en lokal backup tas uansett).
- Rettet: visningen kunne krasje hvis samlingen ble byttet ut mens et album som ikke lenger fantes var åpent.

## 1.0.0 – 2026-10-29
Første versjon.
- Oversikt med statistikk, samlingsverdi, siste innkjøp, mest komplette artister, ønskeliste og favoritter
- Fire diagrammer (Chart.js 4.4.0): album per artist, album per tiår, eier vs mangler, topp 10 artister
- Artistside med kompletthet i % og fremdriftslinje, søk og sortering
- Artistdetaljer med alle album; trykk ✅/❌ for å veksle eierstatus
- Albumdetaljer med cover, fakta, trackliste og notater som kan redigeres direkte
- Samling med søk, sortering (artist, album, år, kjøpsdato) og filter (eide, mangler, alle, valgte artister)
- Mangelliste gruppert per artist
- Legg til, rediger og slett artister og album, med bekreftelse før sletting
- Automatisk generert cover når cover-URL mangler
- Eksport/import av JSON, backup og gjenoppretting i nettleseren
- Eksempeldata: Pink Floyd, Dire Straits, Iron Maiden og Rush
