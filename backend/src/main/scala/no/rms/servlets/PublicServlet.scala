package no.rms.servlets

import java.io.File
import java.nio.file.Paths
import java.time.LocalDateTime

import no.rms._
import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Email, ImageWrapper}
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext

class PublicServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
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

  get("/hello/?") {
    contentType = formats("txt")
    requireLogin()
    Logger.info("hello!")
    "HELLO MR. ADMIN"
  }

  get("/?") {
    Logger.info("GET: /")
    contentType = "text/html"
    val index = new File(servletContext.getResource("/index.html").getFile)
    index
  }

  get("/projects/?") {
    Logger.info("GET: projects")
    RmsDb.allProjects(db)
  }

  get("/project/:id/?") {
    val id = params.get("id").get
    Logger.info("GET: project/" + id)
    RmsDb.project(id, db)
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
    val images = Paths.get("img", "raw").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => ImageWrapper(f, "/image/" + f)).toList
    images
  }

  get("/privates/?") {
    Logger.info("GET: privates/")
    val images = Paths.get("img", "raw", "private").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => ImageWrapper(f, "private/" + f)).toList
    images
  }


  get("/image/:id/:size/?") {
    val id = params.get("id").get
    val size = params.get("size").get
    Logger.info("GET: image/" + id + "/" + size)
    contentType = "image"
    ImageUtils.fetchSize(id, size).getOrElse(ImageUtils.notFound)
  }

  get("/private/:id/:size/?") {
    val id = params.get("id").get
    val size = params.get("size").get
    Logger.info("GET: private/" + id + "/" + size)
    contentType = "image"
    ImageUtils.fetchSize(id, size, "private").getOrElse(ImageUtils.notFound)
  }

  get("/image/:id/?") {
    val id = params.get("id").get
    Logger.info("GET: image/" + id)
    contentType = "image"
    ImageUtils.fetch(id).getOrElse(ImageUtils.notFound)
  }

  get("/private/:id/?") {
    val id = params.get("id").get
    Logger.info("GET: private/" + id)
    contentType = "image"
    ImageUtils.fetch(id, path = "private").getOrElse(ImageUtils.notFound)
  }
}

