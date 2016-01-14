package no.rms.models

import java.time.LocalDateTime

case class Project(id: String, title: String, description: String, images: Seq[ImageWrapper], created: LocalDateTime = LocalDateTime.now){
override  def toString: String = f"$id - $title - $created"
}

case class ProjectWrapper(id: String, title: String, description: String, images: String, created: String)
