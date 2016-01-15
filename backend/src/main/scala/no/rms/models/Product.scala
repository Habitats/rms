package no.rms.models

import no.rms.ImageUtils
import no.rms.db.RmsDb

case class Product(name: String, desc: String, sub: Seq[Product], short: String, images: Seq[ImageWrapper], category: String, src: String) {

  def attachCategory(category: String = ""): Product = {
    val nestedCategory = if(category.length == 0) s"$short" else s"$category/$short"
    val newSub = sub.map(_.attachCategory(nestedCategory))

    val images = ImageUtils.fetchUrls(nestedCategory)
    val coverSrc = images.find(_.name.toLowerCase == "main.jpg").orElse(images.headOption).map(_.src).getOrElse(src)
    val c = copy(category = category, sub = newSub, images = images, src = coverSrc)
    c
  }

  override def toString: String = {
    f"\n$name > $desc > $category > ${sub.mkString(", ")}"
  }

  val id = short + "," + category
}

object Product {
  def apply(name: String, desc: String, sub: Seq[Product] = Nil): Product = {
    val short = name.toLowerCase
      .replaceAll(" ", "_")
      .replaceAll("å", "a")
      .replaceAll("ø", "o")
      .replaceAll("æ", "ae")
      .replaceAll("é", "e")

    new Product(name = name, desc = desc, sub = sub, short = short, category = "", images = Nil, src = "image/" + ImageUtils.notFound.getName)
  }
}

case class ProductWrapper(id: String, name: String, description: String, sub: String, images: String, src: String)

object ProductWrapper {

  def extract(pw: ProductWrapper, products: Seq[ProductWrapper]): Product = {
    val subs = pw.sub.split(RmsDb.delim)
    val sub = products.filter(p => subs.contains(p.id)).map(p => extract(p, products))
    val images = if (pw.images.length > 0) pw.images.split(RmsDb.delim).map(i => ImageWrapper.fromString(i)).toList else Nil
    val id = pw.id.split(",")
    Product(pw.name, pw.description, sub, id(0), images, if(id.length > 1) id(1) else "", pw.src)
  }

  def wrap(p: Product): ProductWrapper = {
    ProductWrapper(id = p.id, name = p.name, description = p.desc, sub = p.sub.map(_.id).mkString(RmsDb.delim), images = p.images.mkString(RmsDb.delim), src = p.src)
  }

  def tree(r: Seq[ProductWrapper]): Product = {
    r.find(_.id.split(",").length == 1).map(p => ProductWrapper.extract(p, r)).get
  }
}
