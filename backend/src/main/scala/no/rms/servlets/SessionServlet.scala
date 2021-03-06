package no.rms.servlets

import no.rms.auth.{AuthenticationSupport, SafeUser, User, Users}
import no.rms.{BackendStack, Log}
import org.eclipse.jetty.http.HttpStatus
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, FutureSupport}

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}
import scala.util.{Failure, Success, Try}

class SessionServlet extends BackendStack with FutureSupport with JacksonJsonSupport with CorsSupport with AuthenticationSupport {
  protected implicit def executor: ExecutionContextExecutor = ExecutionContext.Implicits.global

  protected implicit val jsonFormats: Formats = DefaultFormats

  options("/*") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }

  before() {
    contentType = formats("json")
    scentry.authenticate("RememberMe")
  }

  get("/?") {
    user
  }

  get("/health/?") {
    contentType = formats("txt")
    Log.i("hello!")
    "SESSION OK"
  }

  get("/test/?") {
    Users.update(user.copy(username = Some(System.currentTimeMillis.toString)))
  }

  post("/?") {
    if (!isAuthenticated) {
      halt(HttpStatus.UNAUTHORIZED_401)
    } else {
      Log.i(user)
      Try(parsedBody.extract[SafeUser]) match {
        case Success(u) => Users.update(user.update(u)); u
        case Failure(ex) => Log.i(ex.getMessage)
      }
    }
  }

  post("/logout/?") {
    val u = new SafeUser(user.copy(admin = false))
    scentry.logout
    u
  }

  post("/login/?") {
    // add user to "users", session will fetch it from there and euthenticate
    Try(parsedBody.extract[User]) match {
      case Success(u) => Users.login(u.copy(id = user.id))
      case Failure(ex) => Log.i(ex.getMessage)
    }

    scentry.authenticate("Admin").map(u => new SafeUser(u))
  }
}
