package no.rms.auth

import no.rms.auth.strategies.PasswordStrategy
import org.scalatra.ScalatraBase
import org.scalatra.auth.{ScentryConfig, ScentrySupport}


trait AuthenticationSupport extends ScalatraBase with ScentrySupport[User] {
  self: ScalatraBase =>

  val realm = "Romerike Markiseservice AS"

  protected def fromSession = {
    case id: String => if(Users.active.contains(id)) Users.findById(id) else null
  }

  protected def toSession = {
    case user: User => user.id
  }

  protected val scentryConfig = new ScentryConfig {}.asInstanceOf[ScentryConfiguration]

  /**
   * If an unauthenticated user attempts to access a route which is protected by Scentry,
   * run the unauthenticated() method on the UserPasswordStrategy.
   */
  override protected def configureScentry = {

    scentry.unauthenticated {
      scentry.strategies("UserPassword").unauthenticated()
    }
  }

  /**
   * Register auth strategies with Scentry. Any controller with this trait mixed in will attempt to
   * progressively use all registered strategies to log the user in, falling back if necessary.
   */
  override protected def registerAuthStrategies = {
    //    scentry.register("Basic", app => new BasicAuthenticationStrategy(app, realm))
//    scentry.register("RememberMe", app => new RememberMeStrategy(app))
    scentry.register("UserPassword", app => new PasswordStrategy(app))
  }
}



