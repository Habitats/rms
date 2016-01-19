package no.rms.models

import no.rms.ImageUtils

class ImageWrapper(val title: String, val src: String) {
  override def toString: String = f"$title - $src"
}

object ImageWrapper {
  def fromString(i: String): ImageWrapper = {
    val split = i.split(" - ")
    new ImageWrapper(split(0), split(1))
  }

  def apply(title: String, src: String): ImageWrapper = {
    new ImageWrapper(title, "image/" + src.replaceAll("/", ImageUtils.delim))
  }

  def unapply(image: ImageWrapper): (String, String) = (image.title, image.src)
}

