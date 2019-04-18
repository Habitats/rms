package no.rms.models

import java.time.LocalDateTime

import no.rms.Config
import no.rms.db.RmsDb

case class Project(id: String, title: String, description: String, images: Seq[ImageWrapper], modified: LocalDateTime = LocalDateTime.now) {
  override def toString: String = f"$id - $title - $modified"
}

object Project {

  def fromFields(fields: (String, String, String, String, String)): Project = {
    fields match {
      case (id, title, description, img, modified) =>
        Project(
          id = id,
          title = title,
          description = description,
          images = img.split(RmsDb.delim).map(i => ImageWrapper.fromString(i)),
          modified = Config.parse(modified)
        )
    }
  }
}

case class ProjectWrapper(id: String, title: String, description: String, images: String, modified: String)
