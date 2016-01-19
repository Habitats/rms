package no.rms.servlets

import java.time.LocalDateTime

import no.rms._
import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Product, Project}
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success, Try}

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

  post("/product/?") {
    Logger.info("POST: product")
    val p = parsedBody
    Try(p.extract[Product]) match {
      case Success(p) => RmsDb.storeProduct(p, db)
      case Failure(ex) => ex.printStackTrace
    }
  }
}

