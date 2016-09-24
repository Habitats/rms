package no.rms.servlets

import java.io.File
import java.time.LocalDateTime

import no.rms._
import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Email, Product}
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.H2Driver.api._

import scala.concurrent.{ExecutionContext, Future}

class PublicServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
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
    contentType = formats("json")
  }

  get("/health/?") {
    contentType = formats("txt")
    Logger.info("hello!")
    "API OK"
  }

  get("/projects/?") {
    Logger.info("GET: projects")
    RmsDb.allProjects
  }

  get("/project/:id/?") {
    val id = params.get("id").get
    Logger.info("GET: project/" + id)
    RmsDb.fetchProject(id)
  }

  get("/products/?") {
    Logger.info("GET: products")
    val products: Future[Product] = RmsDb.allProducts
    products
  }

  post("/mail/?") {
    Logger.info("POST: mail")
    val email = parsedBody.extract[Email]
    contentType = "text"
    send(email)
    "delivered message"
  }

  get("/images/?") {
    Logger.info("GET: images/")
    Future {
      ImageUtils.fetchUrls("referanser")
    }
  }
}

