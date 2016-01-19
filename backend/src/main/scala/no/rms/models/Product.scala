package no.rms.models

import no.rms.ImageUtils
import no.rms.db.RmsDb

case class Product(id: String, title: String, description: String, sub: Seq[Product], images: Seq[ImageWrapper], category: String, src: String) {

  def attachCategory(category: String = ""): Product = {
    val nestedCategory = if (category.length == 0) s"$id" else s"$category/$id"
    val newSub = sub.map(_.attachCategory(nestedCategory))

    val images = ImageUtils.fetchUrls(nestedCategory)
    val coverSrc = images.find(_.title.toLowerCase == "main.jpg").orElse(images.headOption).map(_.src).getOrElse(src)
    val c = copy(category = category, sub = newSub, images = images, src = coverSrc)
    c
  }

  override def toString: String = {
    f"\n$title > $description > $category > ${sub.mkString(", ")}"
  }

}

object Product {
  def apply(title: String, description: String, sub: Seq[Product] = Nil, id: String = null ): Product = {
    new Product(if(id == null) genId(title) else id, title = title, description = description, sub = sub, category = "", images = Nil, src = "image/" + ImageUtils.notFound.getName)
  }

  def genId(title: String) = title.toLowerCase
    .replaceAll(" ", "_")
    .replaceAll(",", "_")
    .replaceAll("å", "a")
    .replaceAll("ø", "o")
    .replaceAll("æ", "ae")
    .replaceAll("é", "e")
}

case class ProductWrapper(id: String, title: String, description: String, sub: String, images: String, src: String, category: String)

object ProductWrapper {

  def fromFields(fields: (String, String, String, String, String, String, String)): ProductWrapper = {
    fields match {
      case ((id, title, description, sub, images, src, category)) => ProductWrapper(id = id, title = title, description = description, sub = sub, images = images, src = src, category = category)
    }
  }

  def extract(pw: ProductWrapper, products: Seq[ProductWrapper]): Product = {
    val subs = pw.sub.split(RmsDb.delim)
    val sub = products.filter(p => subs.contains(p.id)).map(p => extract(p, products))
    val images = if (pw.images.length > 0) pw.images.split(RmsDb.delim).map(i => ImageWrapper.fromString(i)).toList else Nil
    Product(id = pw.id, title = pw.title, description = pw.description, sub = sub, images = images, category = pw.category, src = pw.src)
  }

  def wrap(p: Product): ProductWrapper = {
    ProductWrapper(id = p.id, title = p.title, description = p.description, sub = p.sub.map(_.id).mkString(RmsDb.delim), images = p.images.mkString(RmsDb.delim), src = p.src, category = p.category)
  }

  def tree(r: Seq[ProductWrapper]): Product = {
    val root = r.find(_.category.isEmpty)
    root.map(p => ProductWrapper.extract(p, r)).get
  }
}
