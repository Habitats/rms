package no.rms

import no.rms.models.Projects
import org.scalatra.json.JacksonJsonSupport
import org.json4s.{DefaultFormats, Formats}

class RmsServlet extends BackendStack with JacksonJsonSupport {
  protected implicit val jsonFormats: Formats = DefaultFormats

  before() {
    contentType = formats("json")
  }

  get("/hello/") {
":)"
  }

  get("/") {
    Projects.all
  }
}
