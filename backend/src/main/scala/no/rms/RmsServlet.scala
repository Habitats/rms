package no.rms

import no.rms.models.Projects
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.CorsSupport
import org.scalatra.json.JacksonJsonSupport

class RmsServlet extends BackendStack with JacksonJsonSupport with CorsSupport {
  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
  }


  before() {
    contentType = formats("json")
  }

  get("/hello/") {
    ":)"
  }

  get("/projects/") {
    Projects.all
  }
}
