package no.rms.db

import slick.driver.JdbcDriver.api._

object RmsDb {

  class Projects(tag: Tag) extends Table[(String, String, String, String)](tag, "PROJECTS") {
    def id = column[String]("ID", O.PrimaryKey)

    def title = column[String]("TITLE")

    def description = column[String]("DESCRIPTION")

    def img = column[String]("IMG")

    def * = (id, title, description, img)
  }

  def init(db: Database) {
    val vgsImgs = List(
      "http://www.romerike-markise.no/images/ref_nannestad.vgs_1.jpg",
      "http://www.romerike-markise.no/images/ref_nannestad.vgs_2.jpg",
      "http://www.romerike-markise.no/images/ref_nannestad.vgs_3.jpg",
      "http://www.romerike-markise.no/images/ref_nannestad.vgs_4.jpg"
    ).mkString(",")

    val insertProjects = DBIO.seq(
      RmsDb.projects +=("1", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("2", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("3", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("4", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("5", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("6", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("7", "Manesjen, Jessheim", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs),
      RmsDb.projects +=("8", "Jessheim Kulturhus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs)
    )

    val createDatabase = DBIO.seq(createSchemaAction, insertProjects)
    db.run(createDatabase)
  }

  val projects = TableQuery[Projects]

  val createSchemaAction = (projects.schema).create

  val dropSchemaAction = (projects.schema).drop

  val selectProjectTitles = {
    for {c <- projects} yield (c.title)
  }
}
