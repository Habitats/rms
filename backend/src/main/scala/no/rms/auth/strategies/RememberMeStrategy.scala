package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.auth.{User, Users}
import no.rms.{Config, Log}
import org.scalatra.{CookieOptions, ScalatraBase}
import org.scalatra.auth.ScentryStrategy

import scala.util.Random

class RememberMeStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, response: HttpServletResponse) extends ScentryStrategy[User] {

  override def name: String = "RememberMe"

  override def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    val authed = app.cookies.get(Config.COOKIE_ID) match {
      case Some(token: String) =>
        Log.i(s"Attempting to use old session: $token")
        Users.active.getOrElseUpdate(token, User(token))
      case None =>
        Log.i("New session ...")
        val token = Random.nextLong.toString
        app.cookies.set(Config.COOKIE_ID, token)(CookieOptions(maxAge = Config.ONE_WEEK, path = "/"))
        Users.active.getOrElseUpdate(token, User(token))
    }

    Log.i(s"Returning user: $authed")
    Some(authed)
  }
}
