package no.rms.servlets

import java.io.File

import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Email, Image, Project}
import no.rms.{BackendStack, RmsMailer}
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}
import slick.driver.JdbcDriver.api._

import scala.concurrent.ExecutionContext

class PublicServlet(val db: Database) extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
  protected implicit def executor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
  }

  before() {
    contentType = formats("json")
  }

  get("/hello/?") {
    ":)"
  }

  get("/?") {
    contentType = "text/html"
    val index = new File(servletContext.getResource("/index.html").getFile)
    println(index.getAbsolutePath)
    index
  }

  get("/projects/?") {
    db.run(RmsDb.projects.result).map(res => res.map {
      case (id, title, description, img) => Project(id, title, description, img.split(",").map(i => Image(i.split("/").last, i)).toList)
    }
    )
  }

  post("/mail/?") {
    val email = parsedBody.extract[Email]
    contentType = "text"
    send(email)
    "delived message"
  }

  get("/images") {
    val images = new File("images/").listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "/images/" + f)).toList
    images
  }

  get("/images/:id/?") {
    val id = params.get("id")
    contentType = "image"
    val image = params.get("id").map(id => new File("images/" + id)).filter(_.exists).getOrElse(new File("images/not_found.jpg"))
    image
  }

  get("/private/:id/?") {
    val id = params.get("id")
    contentType = "image"
    val image = params.get("id").map(id => new File("images/private/" + id)).filter(_.exists).getOrElse(new File("images/not_found.jpg"))
    image
  }

  get("/private") {
    val images = new File("images/private/").listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "/private/" + f)).toList
    images
  }
}

