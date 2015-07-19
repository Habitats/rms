package no.rms.db

import no.rms.models.Project
import slick.driver.JdbcDriver.api._

object RmsDb {

  class Projects(tag: Tag) extends Table[(String, String, String, String)](tag, "PROJECTS") {
    def id = column[String]("ID", O.PrimaryKey)

    def title = column[String]("TITLE")

    def description = column[String]("DESCRIPTION")

    def img = column[String]("IMG")

    def * = (id, title, description, img)
  }

  def p(imgs: List[String]): String = {
    imgs.map("http://localhost:8080/images/" + _).mkString(",")
  }

  def init(db: Database) {
    val vgsImgs = List("ref_nannestad.vgs_1.jpg", "ref_nannestad.vgs_2.jpg", "ref_nannestad.vgs_3.jpg", "ref_nannestad.vgs_4.jpg")
    val komImgs = List("ref_nannestad.kommunehus_1.jpg", "ref_nannestad.kommunehus_2.jpg", "ref_nannestad.kommunehus_3.jpg", "ref_nannestad.kommunehus_4.jpg")
    

    val insertProjects = DBIO.seq(
      RmsDb.projects +=("1", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("2", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(komImgs)),
      RmsDb.projects +=("3", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("4", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("5", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("6", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("7", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs)),
      RmsDb.projects +=("8", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", p(vgsImgs))
    )

    val createDatabase = DBIO.seq(createSchemaAction, insertProjects)
    db.run(createDatabase)
  }

  def store(project: Project, db: Database) {
    val data = RmsDb.projects +=(project.id, project.title, project.description, project.img.mkString(","))
    db.run(data)
  }

  val projects = TableQuery[Projects]

  val createSchemaAction = (projects.schema).create

  val dropSchemaAction = (projects.schema).drop

  val selectProjectTitles = {
    for {c <- projects} yield (c.title)
  }
}
