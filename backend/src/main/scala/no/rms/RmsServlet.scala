package no.rms

import org.scalatra._

class RmsServlet extends ScalatraFilter {
  get("/") {"Hello world!"}
}
