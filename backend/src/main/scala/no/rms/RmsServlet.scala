package no.rms

import no.rms.db.RmsDb
import no.rms.models.Project
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

class RmsServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport {
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
  }

  before() {
    contentType = formats("json")
  }

  get("/hello/") {
    ":)"
  }

  get("/projects") {
    db.run(RmsDb.projects.result).map(res => res.map {
      case (id, title, description, img) => Project(id, title, description, img.split(",").toList)
    }
    )
  }

  post("/?") {
    println("yolo?")
    val project = parsedBody.extract[Project]
    println(project)
    RmsDb.store(project, db)

    project
  }
}

