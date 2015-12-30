package no.rms.servlets

import java.io.File
import java.nio.file.Paths

import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Email, Image, Project}
import no.rms.{BackendStack, Logger, RmsMailer}
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext
import scala.util.Random

class PublicServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
  protected implicit def executor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  before() {
    contentType = formats("json")
  }

  def notFound(): File = Random.shuffle(Paths.get("img", "not_found").toFile.listFiles.toList).head

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
    db.run(RmsDb.projects.result).map(res => res.map {
      case (id, title, description, img) => Project(id, title, description, img.split(",").map(i => Image(i.split("/").last, i)).toList)
    }
    )
  }

  post("/mail/?") {
    Logger.info("POST: mail")
    val email = parsedBody.extract[Email]
    contentType = "text"
    send(email)
    "delived message"
  }

  get("/images/?") {
    Logger.info("GET: images/")
    val images = Paths.get("img").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "/image/" + f)).toList
    images
  }

  get("/image/:id/?") {
    val id = params.get("id")
    Logger.info("GET: image/" + id.getOrElse(""))
    contentType = "image"
    val image = params.get("id").map(id => Paths.get("img", id).toFile).filter(_.exists).getOrElse(notFound())
    image
  }

  get("/privates/?") {
    Logger.info("GET: privates")
    val images = Paths.get("img", "private").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "private/" + f)).toList
    images
  }

  get("/private/:id/?") {
    val id = params.get("id")
    Logger.info("GET: private/" + id.getOrElse(""))
    contentType = "image"
    val image = params.get("id").map(id => Paths.get("img", "private", id).toFile).filter(_.exists).getOrElse(notFound())
    image
  }
}

