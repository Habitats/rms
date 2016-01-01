package no.rms.db

import java.io.File
import java.time.LocalDateTime

import no.rms.models.{Image, Project}
import no.rms.{Config, Logger}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


object RmsDb {

  class Projects(tag: Tag) extends Table[(String, String, String, String, String)](tag, "PROJECTS") {
    def id = column[String]("ID", O.PrimaryKey)

    def title = column[String]("TITLE")

    def description = column[String]("DESCRIPTION")

    def img = column[String]("IMG")

    def created = column[String]("CREATED")

    def * = (id, title, description, img, created)
  }

  def init(db: Database) {
    if (!new File("rms.mv.db").exists) {
      val vgsImgs = Seq(
        Image("1", "image/ref_nannestad.vgs_1.jpg"),
        Image("2", "image/ref_nannestad.vgs_2.jpg"),
        Image("3", "image/ref_nannestad.vgs_3.jpg"),
        Image("4", "image/ref_nannestad.vgs_4.jpg")
      )
      val komImgs = Seq(
        Image("1", "image/ref_nannestad.kommunehus_1.jpg"),
        Image("2", "image/ref_nannestad.kommunehus_2.jpg"),
        Image("3", "image/ref_nannestad.kommunehus_3.jpg"),
        Image("4", "image/ref_nannestad.kommunehus_4.jpg")
      )

      val samples = Seq(
        Project("1", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("2", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", komImgs, LocalDateTime.now),
        Project("3", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", komImgs, LocalDateTime.now),
        Project("4", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("5", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("6", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("7", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("8", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now)
      )

      db.run(createSchemaAction).andThen {
        case _ => samples.foreach(p => store(p, db))
      }
    } else {
      db.run(createSchemaAction)
    }
  }

  def allProjects(db: Database): Future[Seq[Project]] = {
    db.run(projects.result).map(res => res.map {
      case (id, title, description, img, created) => Project(id, title, description, img.split(",").map(i => Image(i.split("/").last, i)).toList, Config.parse(created))
    })
  }

  def project(id: String, db: Database): Future[Option[Project]] = {
    db.run(projects.filter(_.id === id).result.headOption).map {
      case Some((id, title, description, img, created)) => Some(Project(id, title, description, img.split(",").map(i => Image(i.split("/").last, i)).toList, Config.parse(created)))
      case _ => throw new IllegalArgumentException("INVALID ID")
    }
  }

  def store(project: Project, db: Database) {
    update(project.copy(created = LocalDateTime.now), db)
  }

  def update(project: Project, db: Database) {
    val data = projects +=(project.id, project.title, project.description, project.img.map(_.url).mkString(","), Config.format(project.created))
    Logger.info("Adding project: " + project)
    db.run(data)
  }

  lazy val projects = TableQuery[Projects]

  lazy val createSchemaAction = projects.schema.create

  lazy val dropSchemaAction = projects.schema.drop

  val selectProjectTitles = {
    for {c <- projects} yield c.title
  }
}
