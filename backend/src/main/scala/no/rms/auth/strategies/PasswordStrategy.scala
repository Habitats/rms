package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.auth.{User, Users}
import no.rms.{Config, Logger}
import org.scalatra.ScalatraBase
import org.scalatra.auth.ScentryStrategy

class PasswordStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, response: HttpServletResponse) extends ScentryStrategy[User] {

  override def name: String = "UserPassword"

  private def login: String = app.params.getOrElse("login", "")

  private def password: String = app.params.getOrElse("password", "")

  private def id: String = app.cookies.get("ID").getOrElse("NONE")

  override def isValid(implicit request: HttpServletRequest) = {
    Logger.info("Session ID: " + id)
    val user = Users.findById(id)
    user.username.nonEmpty && user.password.nonEmpty
  }

  def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    Logger.info("UserPasswordStrategy: attempting authentication")
    val user = Users.findById(id)
    val valid = user.username.get == Config.username && user.password.get == Config.password
    if (valid) {
      Logger.info("login success")
      val adminUser = user.copy(admin = true)
      Some(adminUser)
    } else {
      Logger.info("login failed")
      None
    }
  }

}
