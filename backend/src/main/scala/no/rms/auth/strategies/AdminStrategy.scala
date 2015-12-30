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
    val user = app.cookies.get(Config.COOKIE_ID) match {
      case Some(id) => Users.active.get(id)
      case _ => None
    }
    if (user.filter(_.admin).nonEmpty) {
      Logger.info(s"Admin > Login success!");
    } else {
      Logger.info("Admin > Login failed!")
    }
    user
  }

  override def afterLogout(user: User)(implicit request: HttpServletRequest, response: HttpServletResponse): Unit = {
    Logger.info(s"Admin > Removing cookie!")
    Users.logout(user)
    app.cookies.delete(Config.COOKIE_ID)
  }

  override def unauthenticated()(implicit request: HttpServletRequest, response: HttpServletResponse): Unit = {
    Logger.info(s"Admin > Unauthorized attemped!")
    app.halt(HttpStatus.UNAUTHORIZED_401)
  }
}
