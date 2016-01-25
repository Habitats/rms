package no.rms

import java.time.LocalDateTime

import no.rms.models.{ImageWrapper, Product, Project}

object Samples {
  def products = {
    Product("Produkter", "", Seq(
      Product("Eksteriør", "", Seq(
        Product("Markiser", "Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser.", Seq(
          Product("Terrassemarkise", "Terrassemarkiser er et fint alternativ til tak over terrasse. Vi har flere varianter å velge mellom. Markisen gir deg mulighet til å sitte ute selv om været skulle være litt fuktig. Skulle ønsket om å nyte solen uten skjerming, kan markisen kjøres inn. I motsetning til hva man kan gjøre med et fast tak. Med våre terrassevarmere kan du nyte høstkvelder under markisen i en lun atmosfære. ", Seq(
            Product("Classic", "Classic er vår bestselger, og er en terrassemarkiser som kjennetegnes ved et enkelt design kombinert med gode tekniske detaljer. Classic terrassemarkise kan brukes på terrasser, verandaer, uteserveringer, kiosker og butikker."),
            Product("Classic Marcesa", "VENTAL terrassemarkise type Marcesa er vår sterkeste markise. Marcesa terrassemarkiser kjennetegnes ved et enkelt design kombinert med gode tekniske detaljer."),
            Product("Classic Light", "Classic Light er en svært konkurransedyktig terrassemarkise og egner seg godt på terrasser som ligger i le for vind."),
            Product("Nova", "Nova er en meget sterk og solid terrassemarkise."),
            Product("Nova Marcesa", "Nova er en meget sterk og solid terrassemarkise.")
          )),
          Product("Takmarkise Omega", "Solskjermingsprodukt for glassfasade i tak (vinterhager etc.)."),
          Product("Kjells vindusmarkise", "Kjells vindusmarkise har fjærer i markisearmene som holder duken stram. Markisen er laget i lakkerte profiler."),
          Product("Kassettmarkise", "Det spesielle med denne markisen er at markisearmer og duk ligger helt innkapslet i kassetten. Dette gir et lekkert utseende kombinert med optimal beskyttelse og lang levetid."),
          Product("Vertikalmarkise", "Vår vertikalmarkise passer ypperlig som levegg til din uteplass. Vertikalmarkisen tilpasses slik at den går i ett med bygget eller verandaen."),
          Product("Fasademarkise", "Perfekt for større vindusfelt på grunn av sin robuste utførelse."),
          Product("Restaurantmarkise", "En markisetype som beskytter på sene sommertider med både tak og vegg."),
          Product("Pergola", "Decor pergola er et nytt produkt i vårt sortiment. Dette for å møte en stadig økende etterspørsel etter moderne pergolasystem."),
          Product("Tilbehør", "", Seq(
            Product("Dukkolleksjon", "Vi fører totalt 120 forskjellige duker. Her skulle det være noe for enhver smak. Er du på jakt etter en tekstil du ikke finner her, hjelper vi deg gjerne med å finne den. Vi gjør oppmerksom på at fargegjengivelsen her avviker noe fra virkeligheten."),
            Product("Allværsduk", "Teknologien som brukes for Perma-Cleans selvrengjørende egenskap er inspirert av studiene av lotusblomsten, som beholder sine blader helt rene selv om den vokser i elver og sjøer med møkkete vann. Planten har en struktur som består av en stor mengde ørsmå opphøyde partikler som er ekstremt vannavstøtende, noe som gjør at bladene aldri blir fuktige. I stedet ruller vanndråpene av bladene, og fører med seg smuss, insekter og støv."),
            Product("Spesialbraketter", "Spesialbraketter og spesialtak må benyttes når utslående dører kommer i konflikt med montering av markisen, eller monteringshøyden er kritisk lav.")
          ))
        )),
        Product("Persienner", "Utvendig monterte persienner stopper varmen før den kommer inn i rommet. Dette gir det laveste varmeinnslippet av alle former for solskjerming. For brukeren betyr utvendige persienner total fleksibilitet. Persiennene har 50 mm brede lameller og leveres i 3 varianter: 50 mm, 50 mm variant og 50 mm spesial.", Seq(
          Product("50 mm", ""),
          Product("50 mm Variant", "Variant er solid fasadepersienner til mellomstore vinduer, og kan leveres med alternative betjeningsmåter som sveiv og runddragssnor."),
          Product("50 mm Spesial", "50 mm Spesial passer på vippevinduer som f.eks. H-vindu og verandadører, og gir full solskjerming selv med vinduet i luftestilling."),
          Product("80 mm", "Denne persiennen har en kraftig og solid konstruksjon som passer best for store vindusflater. Persiennen leveres med innebygd vindlås i toppkassen som holder den innstilte lamellvinkelen selv i sterk vind. Dette gir persiennen en lang levetid og krever lite vedlikehold.")
        )),
        Product("Screen", "Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass.", Seq(
          Product("Smartscreen", "", Seq(
            Product("65x72", ""),
            Product("80x80", ""),
            Product("105x115", "")
          )),
          Product("SF screen", ""),
          Product("Zip screen", ""),
          Product("Markisolett", "Størrelse 105x115"),
          Product("Mini screen", "Mini screens har kompakt og elegant kassett som kan benyttes på mindre vinduer, gjerne i kombinasjon med andre screens.")
        )),
        Product("Varme og belysning", "Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder.", Seq(
          Product("Somfy kretsvarmer", "Terrassevarmer på 2000 W. Varmer ikke opp luften men bare det som stopper strålene, noe som gjør at det er mye enklere å styre varmen. Grunnet kvartselementet når kretsvarmeren sin maks temperatur på under et sekund. Levetid element: 7.000-10.000 timer."),
          Product("Somfy lyslist", "Lakkert, med feste for tak/vegg. Leveres i fargen antrasitt, sølv eller hvit, med lengde på 3 meter.")
        )),
        Product("Faste skjermer", ""),
        Product("Sprosser", "Sett et personlig preg på vinduene. Sprosser brukes for å pusse opp fasaden på huset. Huset blir ikke til å kjenne igjen. Huset får en helt annen stil. Sprosserammer gjør noe med sjelen i huset.")
      )),
      Product("Interiør", "", Seq(
        Product("Rullegardiner", "Rullegardiner med ensfarget, mønstret, mørklegging og transparent. Velg blant over 130 farger!"),
        Product("Persienner", "Dekorative design og mønstre. Mange forskjelllige farger. Leveres med lameller i 25 mm bredde, samt utvalgte i 35 mm bredde, begge i meget høy kvalitet.", id = "innvendige_persienner"),
        Product("Lamellgardiner", "Lamellgardiner har mange anvendelseområder: Som dekorasjon, romdeler og solskjerming. Spesielt egnet for store vindusflater."),
        Product("Plisségardiner", "Våre Plisségardiner er laget av moderne tekstiler og designet i over 120 farger. Når du kontakter oss vedrørende Plisségardiner hjelper vi deg å finne kombinasjonen som vil gi det perfekte resultatet. Velg blant 120 farger og tekstiler."),
        Product("Duette", "Dekorativt produkt med bikakestruktur som gir høy isoleringseffekt. Eksklusiv kolleksjon av farger, mønster og design. Spesielt egnet for vinduer med avvikende form."),
        Product("Zebra", "Et moderne og innovativt alternativ. Tekstilen som har store tverrstriper åpnes og lukkes med forskyvning av front- og baktekstil, noe som gir et godt utsyn og god skjerming i riktig posisjon."),
        Product("Insektsnetting", "For montering i vinduer og verandadører, med bredde inntil 180 cm og høyde inntil 240 cm. Leveres med hvit overkasse, sideskinner og underlist.")
      )),
      Product("Vindusfilm", "En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning.", Seq(
        Product("Multifilm", "Den perfekte løsningen for varme og lysdemping – alt i ett produkt."),
        Product("Solfilm", ""),
        Product("Sikkerhetsfilm", ""),
        Product("Dekor og folie", ""),
        Product("Film for glasstak", "")
      )),
      Product("Styringssystemer", "", Seq(
        Product("Sol- og vindsensor", "", Seq(
          Product("Vindføler", "Markisene dine er beskyttet og trekkes automatisk inn hvis det begynner å blåse, selv om du ikke er hjemme. Du må selv kjøre de ut igjen."),
          Product("Sol- og vindføler", "Markisene, persiennene og screenene reagerer automatisk på været. Så snart solen titter frem beskyttes automatisk terrassen og/eller rommene dine, og forblir kjølige. Hvis det blåser opp trekkes markisene, persiennene og screenene automatisk inn/opp. Du kan også overstyre dette selv. Hvis du har programmert inn din favorittinnstilling, kjøres produktet dit med ett tastetrykk.")
        )),
        Product("App-styring", "", Seq(
          Product("HD smart awning control", "Styringsenhet inkluderer fjernkontroll, radiomottaker, wifi modul og sol/vindsensor.Dette er et styringssystem for 2 motoriserte solskjermingsprodukter og lys. Via appen kan du kjøre produktene inn og ut. Du kan også endre solfølsomheten og vindstyrken produktene skal reagere på. I tillegg kan du og legge inn hvor langt markisen skal gå ut eller vinklingen på persiennene."),
          Product("TaHoma", "Ta kontroll over solskjermingen, lamper, Velux takvinduer, motorvarmeren, garasjeporten, mm., med din smarttelefon eller via internett, på jobben, på ferie, på bussen etc. Det kan programmeres opptil 100 scenarier for hva som skal skje når.  Det finnes to ulike trådløse styringsmetoder:  RTS - gir produktene ett signal som gjør at f.eks markisen går inn (eller ut). RTS \"vet\" ikke om produktet er ute eller inne. Io - vet om f.eks markisen er ute eller inne, eller bare et stykke ute. Dette gir en helt annen kontroll på alle produkter som er tilkoblet vi io. Du kan da f.eks se om garasjeporten er lukket. Med io kan du også legge inn varsler som f.eks \"alarm\" om garasjeporten står åpen etter kl 22. Et scenario kan være at kl 7 om morgenen på en hverdag går de innvendige rullegardinene opp, lyset inne slår seg på, lyset ute slår seg av, etc., etc. "),
          Product("TaHoma boks", "Kan lese både RTS og io.")
        )),
        Product("Fjernkontroll", "Styr produktene dine med fjernkontrollen fra hvor som helst, og juster dem til den ideelle posisjonen med et fingertrykk. Kjør opp, ned, eller vinkle en eller flere av dine utvendige persienner på sekunder med et tastetrykk. Kjør markisene ut eller inn, kjør screenene opp eller ned, kjør til siden lamellgardinene. ")
      )),
      Product("Vedlikehold", "", Seq(
        Product("Snortskift", ""),
        Product("Gode råd", "Vask markisene med mildt såpevann, f.ek.s Zalo. Ikke bruk høytrykkspyler. Hvis vanlig vask ikke er tilstrekkelig eller ved jordslag kan jordslag middel benyttes. Dette kjøpes hos byggvareforhandler/fargehandler. Følg bruksanvisningen på produktet, men ikke bruk høytrykkspyler. Etter vask bør duken impregeneres (se under)."),
        Product("Service-arbeid", "")
      ))
    )).attachCategory()
  }

  def projects = {
    val vgsImgs = Seq(
      ImageWrapper("1", "referanser/ref_nannestad.vgs_1.jpg"),
      ImageWrapper("2", "referanser/ref_nannestad.vgs_2.jpg"),
      ImageWrapper("3", "referanser/ref_nannestad.vgs_3.jpg"),
      ImageWrapper("4", "referanser/ref_nannestad.vgs_4.jpg")
    )
    val komImgs = Seq(
      ImageWrapper("1", "referanser/ref_nannestad.kommunehus_1.jpg"),
      ImageWrapper("2", "referanser/ref_nannestad.kommunehus_2.jpg"),
      ImageWrapper("3", "referanser/ref_nannestad.kommunehus_3.jpg"),
      ImageWrapper("4", "referanser/ref_nannestad.kommunehus_4.jpg")
    )

    val samples = Seq(
      Project("1", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
      Project("2", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", komImgs, LocalDateTime.now)
    )
    samples
  }
}
