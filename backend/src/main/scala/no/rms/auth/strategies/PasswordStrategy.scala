package no.rms.auth.strategies

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.auth.{User, Users}
import no.rms.{Config, Logger}
import org.scalatra.ScalatraBase
import org.scalatra.auth.ScentryStrategy

class PasswordStrategy(protected val app: ScalatraBase)(implicit request: HttpServletRequest, response: HttpServletResponse) extends ScentryStrategy[User] {

  override def name: String = "UserPassword"

  private def login = app.params.getOrElse("login", "")

  private def password = app.params.getOrElse("password", "")

  override def isValid(implicit request: HttpServletRequest) = {
    val user = Users.findById(app.cookies.get("ID").get)
    val valid = user.username.nonEmpty && user.password.nonEmpty
    valid
  }

  def authenticate()(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    Logger.info("UserPasswordStrategy: attempting authentication")
    val user = Users.findById(app.cookies.get("ID").get)
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
