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

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}
import scala.util.{Failure, Success, Try}

class SecretServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with RmsMailer with AuthenticationSupport {
  protected implicit def executor: ExecutionContextExecutor = ExecutionContext.Implicits.global

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

  get("/health/?") {
    contentType = formats("txt")
    Logger.info("hello!")
    "SECRET OK"
  }

  get("/?") {
    Logger.info("GET: secret")
    contentType = "text"
    "Autorisert!"
  }

  post("/project/?") {
    Logger.info("POST: project")
    Try(parsedBody.extract[Project]) match {
      case Success(p) => RmsDb.storeProject(p)
      case Failure(ex) => Logger.info(ex.getMessage)
    }
  }

  delete("/project/?") {
    Logger.info("DELETE: project")
    Try(parsedBody.extract[String]) match {
      case Success(p) => RmsDb.removeProject(p).transform(s => RmsDb.allProjects(), f => f)
      case Failure(ex) => Logger.info(ex.getMessage)
    }
  }

  post("/product/?") {
    Logger.info("POST: product")
    Try(parsedBody.extract[Product]) match {
      case Success(p) => if (p.id == "-1") RmsDb.newProduct(p) else RmsDb.storeProduct(p)
      case Failure(ex) => Logger.info(ex.getMessage)
    }
  }

  delete("/product/?") {
    Logger.info("DELETE: product")
    Try(parsedBody.extract[String]) match {
      case Success(p) => RmsDb.removeProduct(p).transform(s => RmsDb.allProducts(), f => f)
      case Failure(ex) => Logger.info(ex.getMessage)
    }
  }

  get("/invalidate/?") {
    ImageUtils.invalidateCache()
    Some("Cache invalidated")
  }
}

