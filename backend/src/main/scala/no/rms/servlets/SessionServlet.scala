package no.rms.servlets

import no.rms.auth.{AuthenticationSupport, User, Users}
import no.rms.{BackendStack, Logger}
import org.joda.time.DateTime
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}

import scala.concurrent.ExecutionContext

/**
 * Created by mail on 30.08.2015.
 */
class SessionServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with AuthenticationSupport {
  protected implicit def executor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
  }

  before() {
    contentType = formats("json")
  }

  get("/?") {
    if (!isAuthenticated) {
      val id = DateTime.now.getMillis.toString
      cookies.set("ID", id)
      user = User(id = id, admin = isAuthenticated)
      Logger.info("GET: new session: " + user)
      user
    } else {
      Logger.info("GET: using old session: " + user)
      user
    }
  }

  post("/?") {
    user = parsedBody.extract[User]
    Logger.info("POST: authenticating " + user.id + " ...")
    Users.add(user)
    val authedUser = scentry.authenticate("UserPassword").get
    Users.add(authedUser)
    Logger.info("Authenticated: " + authedUser)
    authedUser
  }

  post("/logout/?") {
    val user = parsedBody.extract[User]
    Logger.info("GET: logout")
    scentry.logout
    user.copy(username = None, password = None, admin = false)
  }
}
