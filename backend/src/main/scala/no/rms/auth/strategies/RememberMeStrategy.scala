package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.Logger
import no.rms.auth.{Users, User}
import org.scalatra.auth.ScentryStrategy
import org.scalatra.{CookieOptions, ScalatraBase}

class RememberMeStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, response: HttpServletResponse) extends ScentryStrategy[User] {

  override def name: String = "RememberMe"

  val COOKIE_KEY = "REMEMBER_ME"
  private val oneWeek = 7 * 24 * 3600

  private def tokenVal = {
    app.cookies.get(COOKIE_KEY) match {
      case Some(token) => token
      case None => ""
    }
  }

  override def isValid(implicit request: HttpServletRequest): Boolean = {
    Logger.info("RememberMeStrategy: determining isValid: " + (tokenVal != "").toString())
    tokenVal != ""
  }

  override def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse) = {
    Logger.info("RememberMeStrategy: attempting authentication")
    val user = Users.findById(tokenVal)
    Some(user)
  }

  override def unauthenticated()(implicit request: HttpServletRequest, response: HttpServletResponse) {
    app.redirect("/session/new")
  }

  override def afterAuthenticate(winningStrategy: String, user: User)(implicit request: HttpServletRequest, response: HttpServletResponse) = {
    Logger.info("rememberMe: afterAuth fired")
    if (winningStrategy == "RememberMe" || winningStrategy == "UserPassword") {
      val token = user.id
      app.cookies.set(COOKIE_KEY, token)(CookieOptions(maxAge = oneWeek, path = "/"))
    }
  }

  override def beforeLogout(user: User)(implicit request: HttpServletRequest, response: HttpServletResponse) = {
    Logger.info("rememberMe: beforeLogout")
    if (user != null) {
      user.forgetMe
    }

    app.cookies.delete(COOKIE_KEY)(CookieOptions(path = "/"))
  }
}
