package no.rms.servlets

import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.Project
import no.rms.{BackendStack, Logger, RmsMailer}
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext

class SecretServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
  protected implicit def executor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  before() {
    contentType = formats("json")
    requireLogin()
  }

  get("/?") {
    Logger.info("GET: secret")
    contentType = "text"
    "Autorisert!"
  }

  post("/?") {
    Logger.info("POST: project")
    val project = parsedBody.extract[Project]
    println("received: " + project)
    RmsDb.store(project, db)

    project
  }
}
