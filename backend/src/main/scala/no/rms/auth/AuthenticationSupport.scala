package no.rms.auth

import no.rms.auth.strategies.{AdminStrategy, RememberMeStrategy}
import org.scalatra.ScalatraBase
import org.scalatra.auth.{ScentryConfig, ScentrySupport}

trait AuthenticationSupport extends ScalatraBase with ScentrySupport[User] {
  self: ScalatraBase =>

  protected def fromSession: PartialFunction[String, User] = {
    case id: String => Users.active(id)
  }

  protected def toSession: PartialFunction[User, String] = {
    case user: User => user.id
  }

  protected val scentryConfig: ScentryConfiguration = new ScentryConfig {
    override val login = "/"
  }.asInstanceOf[ScentryConfiguration]

  protected def requireLogin(): Any = {
    if (!isAuthenticated) {
      scentry.authenticate("Admin")
    }
  }

  // if unauthorized access to route protected by scentry, run unauthorized for that strategy
  override protected def configureScentry: Unit = {
    scentry.unauthenticated {
      scentry.strategies("Admin").unauthenticated()
    }
  }

  override protected def registerAuthStrategies: Unit = {
    scentry.register("RememberMe", app => new RememberMeStrategy(app))
    scentry.register("Admin", app => new AdminStrategy(app))
  }
}

