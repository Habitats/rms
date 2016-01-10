package no.rms.models

import no.rms.ImageUtils

case class Product private(name: String, desc: String, sub: Seq[Product], short: String, images: Seq[ImageWrapper], category: String, src: String) {

  def attachCategory(category: String = "produkter"): Product = {
    val nestedCategory = s"$category/$short"
    val newSub = sub.map(_.attachCategory(nestedCategory))

    val images = ImageUtils.images(nestedCategory)
    val coverSrc = images.find(_.name == "main.jpg").orElse(images.headOption).map(_.src).getOrElse(src)
    val c = copy(category = category, sub = newSub, images = images, src = coverSrc)
    c
  }
}

object Product {
  def apply(name: String, desc: String, sub: Seq[Product] = Nil): Product = {
    val short = name.toLowerCase
      .replaceAll(" ", "_")
      .replaceAll("å", "a")
      .replaceAll("ø", "o")
      .replaceAll("æ", "ae")
      .replaceAll("é", "e")

    new Product(name = name, desc = desc, sub = sub, short = short, category = "", images = Seq(), src = "image/" + ImageUtils.notFound.getName)
  }
}
