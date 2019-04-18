package no.rms.servlets

import no.rms._
import org.scalatra.CorsSupport

class IndexServlet extends BackendStack with CorsSupport  {

  options("*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  get("/*?") {
    Logger.info("GET: /")
    contentType = "text/html"
    val resource = Config.loadFile(System.getenv("RMS_APP_ROOT") + "/index.html")
    println("loading resource: " + resource)
    resource
  }

  get("/health/?") {
    contentType = "text/html"
    Logger.info("hello!")
    "INDEX OK"
  }
}

