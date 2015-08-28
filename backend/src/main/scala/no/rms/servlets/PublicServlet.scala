package no.rms.servlets

import java.io.File
import java.nio.file.Paths

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


  get("/images/?") {
    val images = Paths.get("img").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "/image/" + f)).toList
    images
  }

  get("/image/:id/?") {
    val id = params.get("id")
    contentType = "image"
    println(new File("").getAbsolutePath)
    val image = params.get("id").map(id => Paths.get("img", id).toFile).filter(_.exists).getOrElse(Paths.get("img", "not_found.jpg").toFile)
    image
  }

  get("/privates/?") {
    val images = Paths.get("img", "private").toFile.listFiles.map(_.getName).filter(f => f.endsWith(".jpg") || f.endsWith(".png")).map(f => Image(f, "private/" + f)).toList
    println("allprivates")
    images
  }

  get("/private/:id/?") {
    val id = params.get("id")
    contentType = "image"
    println("private")
    val image = params.get("id").map(id => Paths.get("img", "private", id).toFile).filter(_.exists).getOrElse(Paths.get("img", "not_found.jpg").toFile)
    image
  }
}

