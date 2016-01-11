package no.rms

import no.rms.models.Product

object Products {
  val products = {
    val products = Set(
      Product("Eksteriør", "", Seq(
        Product("Markiser", "Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser."),
        Product("Persienner", "Utvendige persienner er både smidige og robuste."),
        Product("Screen", "Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass."),
        Product("Varme og belysning", "Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder."),
        Product("Sprosser", "Sett et personlig preg på vinduene."),
        Product("Vindusfilm", "En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning.")
      )),
      Product("Interiør", "", Seq(
        Product("Rullegardiner", ""),
        Product("Persienner", ""),
        Product("Lamellgardiner", ""),
        Product("Plisségardiner", ""),
        Product("Duette", ""),
        Product("Zebra", "Et moderne og innovativt alternativ."),
        Product("Insektsnetting", ""),
        Product("Multifilm", "Den perfekte løsningen for varme og lysdemping – alt i ett produkt.")
      )),
      Product("Automatikk", "", Seq(
        Product("Fjernkontroll", ""),
        Product("Sol- og vindsensor", ""),
        Product("App-strying", "")
      )),
      Product("Vedlikehold", "", Seq(
        Product("Snortskift", ""),
        Product("Service-arbeid", "")
      ))
    )
    products.map(_.attachCategory())
  }
}
