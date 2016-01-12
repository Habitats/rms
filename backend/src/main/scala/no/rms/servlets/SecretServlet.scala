package no.rms.servlets

import java.time.LocalDateTime

import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.Project
import no.rms.{Config, BackendStack, Logger, RmsMailer}
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext

class SecretServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
  protected implicit def executor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = {
    DefaultFormats + new LocalDateTimeSerializer
  }

  class LocalDateTimeSerializer extends CustomSerializer[LocalDateTime](
    format => ( {
      case v: JString => Config.parse(v.toString)
    }, {
      case d: LocalDateTime => JString(Config.format(d))
    })
  )

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  before() {
    requireLogin()
    contentType = formats("json")
  }

  get("/?") {
    Logger.info("GET: secret")
    contentType = "text"
    "Autorisert!"
  }

  post("/?") {
    Logger.info("POST: project")
    val p = parsedBody
    val project = p.extract[Project]
    println("received: " + project)
    RmsDb.store(project, db)
  }
}

