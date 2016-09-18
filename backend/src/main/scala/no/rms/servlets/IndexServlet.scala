package no.rms.servlets

import java.io.File

import no.rms._
import org.scalatra.CorsSupport

class IndexServlet extends BackendStack with CorsSupport {

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  get("/?") {
    Logger.info("GET: /")
    contentType = "text/html"
    val index = new File(servletContext.getResource("/index.html").getFile)
    index
  }
}

