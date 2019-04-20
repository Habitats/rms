package no.rms.servlets

import java.time.LocalDateTime

import no.rms._
import no.rms.auth.AuthenticationSupport
import org.json4s.JsonAST.JString
import org.json4s.{CustomSerializer, DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor, Future}

class ImageServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with AuthenticationSupport {
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
    "IMAGE OK"
  }

  get("/:id/:size/?") {
    val size = params.get("size").get
    val path = params.get("id").get
    Log.i("GET: image/" + path + "/" + size)
    contentType = "image"
    Future {
      ImageUtils.fetchPath(path, size).getOrElse(ImageUtils.notFound())
    }
  }

  get("/:id/?") {
    val id = params.get("id").get
    Log.i("GET: image/" + id)
    contentType = "image"
    ImageUtils.fetchPath(id).getOrElse(ImageUtils.notFound())
  }
}

