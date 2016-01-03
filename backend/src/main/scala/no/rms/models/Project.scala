package no.rms.models

import java.time.LocalDateTime

case class Project(id: String, title: String, description: String, img: Seq[Image], created: LocalDateTime = LocalDateTime.now){
override  def toString: String = f"$id - $title - $created"
}
