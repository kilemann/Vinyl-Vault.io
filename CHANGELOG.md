# Endringslogg – Vinyl Vault

## 1.9.0 – 2026-10-31
- Hent info for én plate overskriver nå med info fra nettet: tittel, år, sjanger, cover og trackliste (og artistnavn for plater i mapper).
  Pris, tilstand, kjøpsdato, notater og eierstatus beholdes. «Angre» i 7 sekunder.
- Knappen vises på alle plater: «🔎 Hent info», eller «🔎 Oppdater fra nettet» når platen har info fra før.
- «Hent info for alle» i en mappe fyller fortsatt bare tomme felt.
- Ønskeliste og favoritter: artister med flere album samles i en stabel, som i mappene. Gjelder egne sider og boksene på Oversikten.

## 1.8.0 – 2026-10-31
- Mapper: artister med 2 eller flere plater i samme mappe samles automatisk i en stabel med antall plater.
  Trykk på stabelen for å se platene. Søk i mappen viser treffene enkeltvis.
- Fra en stabel: «＋ Legg til plate» og pluss-knappen fyller ut artistnavnet. Albumsiden viser «📁 Mappe › Artist» som vei tilbake.
- Rettet: lange artist- og albumnavn kunne gjøre rutenettet bredere enn skjermen på mobil (Samling, mapper m.fl.).

## 1.7.0 – 2026-10-30
- Artister: artistene vises først, mappene nederst.
- Samling: mappene står sist i filteret.
- Ny plate rett i en mappe med «＋ Legg til plate» på mappesiden (eller pluss-knappen i mappen). Artistnavnet skrives som tekst,
  med forslag fra navn du har fra før, og det lages ingen egen artist. «Hent info fra nettet etter lagring» er valgt som standard.

## 1.6.0 – 2026-10-30
Oversikt:
- «Mest komplette artister», «Album per artist» og «Topp 10 artister» viser bare artister du eier minst 2 plater av.
- Ønskelisten på oversikten viser alle platene i en egen boks som kan rulles, sortert på artist.

Hent album:
- Ingen album er forhåndsvalgt. Du krysser av selv, eller bruker «Velg alle».

Mapper (nytt):
- Lag egne mapper, f.eks. «Til salgs» eller «Diverse», for å samle plater uten å ha mange artister. Mappene vises øverst på Artister-siden.
- «📁 Flytt til mappe» på albumsiden. Platen beholder artistnavnet. Blir artisten tom, får du spørsmål om å slette den. Kan angres.
- Flytt mellom mapper, eller tilbake til en egen artist (artisten opprettes på nytt om den er slettet).
- «🔎 Hent info for N plater» i mappen søker opp hver plate (artist + tittel) i MusicBrainz og fyller ut år, cover og sjanger.
  Bare sikre treff brukes. Tracklister hentes i bakgrunnen.
- «🔎 Hent info» på albumsiden for plater uten MusicBrainz-kobling. Viser treff du velger mellom, og lar deg justere søket.
  Bare tomme felt fylles ut.
- Plater i mapper teller med i totaler, samlingsverdi og diagrammet per tiår, og vises i Samling (egen mappe-chip) og Mangler.
- Sletting av mappe sletter platene i den, med bekreftelse og «Angre».

## 1.5.0 – 2026-10-29
- Samlingen lagres til GitHub 1 minutt etter siste endring i stedet for 1,5 sekunder. Færre commits og publiseringer.
- Ny knapp «💾 Lagre nå» øverst mens noe venter på å bli lagret.
- Lagrer straks når appen legges i bakgrunnen (som før). Lukkes fanen med ulagrede endringer, spør nettleseren først.

## 1.4.0 – 2026-10-29
Raskere coverbilder:
- Ny GitHub-jobb «Lagre cover» henter cover fra Cover Art Archive (250 og 500 px) og lagrer dem i repoet under `covers/`.
  Den kjører automatisk når samlingen endres. Egne cover-lenker lagres også (opptil 2 MB).
  Bilder for album som er slettet, ryddes bort. Album uten cover sjekkes på nytt etter 14 dager.
- Appen viser cover fra repoet (GitHub Pages) når de finnes, ellers fra nettet som før.
- Hver enhet husker coverbildene etter første visning (service worker `sw.js`), så de vises straks neste gang, også uten nett.
  Bare bilder bufres. Appen og samlingen hentes alltid fersk.

## 1.3.0 – 2026-10-29
Mindre mobildata:
- Rutenett og lister bruker 250 px-cover fra Cover Art Archive. 500 px brukes bare på albumsiden.
- Chart.js hentes først når Oversikten åpnes, og bare én gang.

Tryggere redigering:
- Bekreftelse før spor fjernes fra tracklisten og før et notat slettes.
- Albumskjemaet viser hva som blir fjernet (spor, notat, cover, pris, dato, tilstand) og krever et ekstra trykk på «Fjern og lagre».
- «Angre» i 7 sekunder etter sletting av album og artist, endring av eierstatus, tracklister og notater.
- Slettebekreftelsen sier tydelig hva som forsvinner.

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
