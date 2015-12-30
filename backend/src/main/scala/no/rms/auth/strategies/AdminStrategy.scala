package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.auth.{User, Users}
import no.rms.{Config, Logger}
import org.eclipse.jetty.http.HttpStatus
import org.scalatra.ScalatraBase
import org.scalatra.auth.ScentryStrategy

class AdminStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, reponse: HttpServletResponse) extends ScentryStrategy[User] {

  override def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    Logger.info("Admin > Authenticate ...")
    val user = Users.active(app.cookies(Config.COOKIE_ID))
    if (user.admin) {
      Logger.info(s"Admin > Login success: ${user}");
      Some(user)
    } else {
      Logger.info("Admin > Login failed!")
      None
    }
  }

  override def unauthenticated()(implicit request: HttpServletRequest, response: HttpServletResponse): Unit = {
    Logger.info(s"Admin > Unauthorized attemped!")
    app.halt(HttpStatus.UNAUTHORIZED_401)
  }
}
