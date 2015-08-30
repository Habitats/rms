package no.rms.auth

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import no.rms.Config
import org.scalatra.ScalatraBase
import org.scalatra.auth.strategy.{BasicAuthStrategy, BasicAuthSupport}
import org.scalatra.auth.{ScentryConfig, ScentrySupport}

class AuthenticationStrategy(protected override val app: ScalatraBase, realm: String) extends BasicAuthStrategy[User](app, realm) {

  protected def validate(username: String, password: String)(implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    if (username == Config.username && password == Config.password) Some(User(username)) else None
  }

  protected def getUserId(user: User)(implicit request: HttpServletRequest, response: HttpServletResponse): String = user.id

}

trait AuthenticationSupport extends ScentrySupport[User] with BasicAuthSupport[User] {
  self: ScalatraBase =>

  val realm = "Romerike Markiseservice AS"

  protected def fromSession = {
    case id: String => User(id)
  }

  protected def toSession = {
    case user: User => user.id
  }

  protected val scentryConfig = (new ScentryConfig {}).asInstanceOf[ScentryConfiguration]

  /**
   * If an unauthenticated user attempts to access a route which is protected by Scentry,
   * run the unauthenticated() method on the UserPasswordStrategy.
   */
  override protected def configureScentry = {
    scentry.unauthenticated {
      scentry.strategies("Basic").unauthenticated()
    }
  }

  /**
   * Register auth strategies with Scentry. Any controller with this trait mixed in will attempt to
   * progressively use all registered strategies to log the user in, falling back if necessary.
   */
  override protected def registerAuthStrategies = {
    scentry.register("Basic", app => new AuthenticationStrategy(app, realm))
  }
}



