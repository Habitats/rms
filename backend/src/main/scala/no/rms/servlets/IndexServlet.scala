package no.rms.servlets

import no.rms._
import org.scalatra.CorsSupport

class IndexServlet extends BackendStack with CorsSupport  {

  options("*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  get("/*?") {
    Log.i("GET: /")
    contentType = "text/html"
    val resource = Config.loadFile(Config.appRoot + "/index.html")
    Log.i("loading resource: " + resource)
    resource
  }

  get("/health/?") {
    contentType = "text/html"
    Log.i("hello!")
    "INDEX OK"
  }
}

