package no.rms.models

import no.rms.ImageUtils

class ImageWrapper(val name: String, val src: String) {

  override def toString: String = f"$name - $src"
}

object ImageWrapper {
  def fromString(i: String): ImageWrapper = new ImageWrapper(i.split(" - ")(0), i.split(" - ")(1))

  def apply(name: String, src: String): ImageWrapper = {
    new ImageWrapper(name, "image/" + src.replaceAll("/", ImageUtils.delim))
  }

  def unapply(image: ImageWrapper): (String, String) = (image.name, image.src)
}

