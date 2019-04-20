package no.rms.servlets

import java.time.LocalDateTime

import no.rms._
import no.rms.auth.AuthenticationSupport
import no.rms.db.RmsDb
import no.rms.models.{Email, Product}
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor, Future}

class PublicServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with SendGridMailer with AuthenticationSupport {
  protected implicit def executor: ExecutionContextExecutor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = {
    DefaultFormats + new LocalDateTimeSerializer
  }

  class LocalDateTimeSerializer extends CustomSerializer[LocalDateTime](
    _ => ( {
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
    Log.i("hello!")
    "API OK"
  }

  get("/projects/?") {
    Log.i("GET: projects")
    RmsDb.allProjects()
  }

  get("/project/:id/?") {
    val id = params.get("id").get
    Log.i("GET: project/" + id)
    RmsDb.fetchProject(id)
  }

  get("/products/?") {
    Log.i("GET: products")
    val products: Future[Product] = RmsDb.allProducts()
    products
  }

  post("/mail/?") {
    Log.i("POST: mail")
    val email = parsedBody.extract[Email]
    contentType = "text"
    send(email)
    email
  }

  get("/images/?") {
    Log.i("GET: images/")
    Future {
      ImageUtils.fetchUrls("referanser")
    }
  }
}

