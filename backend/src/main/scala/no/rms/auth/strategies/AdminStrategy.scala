package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.auth.{User, Users}
import no.rms.{Config, Log}
import org.eclipse.jetty.http.HttpStatus
import org.scalatra.ScalatraBase
import org.scalatra.auth.ScentryStrategy

class AdminStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, reponse: HttpServletResponse) extends ScentryStrategy[User] {

  override def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    Log.i("Admin > Authenticate ...")
    val user = app.cookies.get(Config.COOKIE_ID) match {
      case Some(id) => Users.active.get(id)
      case _ => None
    }
    if (user.exists(_.admin)) {
      Log.i(s"Admin > Login success!")
      user
    } else {
      Log.i("Admin > Login failed!")
      app.halt(HttpStatus.UNAUTHORIZED_401)
    }
  }

  override def afterLogout(user: User)(implicit request: HttpServletRequest, response: HttpServletResponse): Unit = {
    Log.i(s"Admin > Removing cookie!")
    Users.logout(user)
    app.cookies.delete(Config.COOKIE_ID)
  }

  override def unauthenticated()(implicit request: HttpServletRequest, response: HttpServletResponse): Unit = {
    Log.i(s"Admin > Unauthorized attemped!")
    app.halt(HttpStatus.UNAUTHORIZED_401)
  }
}
