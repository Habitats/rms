import no.rms.Config
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.webapp.WebAppContext
import org.scalatra.servlet.ScalatraListener

object JettyLauncher {

  def main(args: Array[String]) {
    val port = if (System.getenv("PORT") != null) System.getenv("PORT").toInt else 8081

    val server  = new Server(port)
    val context = new WebAppContext()
    context.setContextPath("/")
    val resourceBase= Config.appRoot
    println("Setting resource base: " + resourceBase)
    context.setResourceBase(resourceBase)
    context.setInitParameter(ScalatraListener.LifeCycleKey, "ScalatraBootstrap")
    context.addEventListener(new ScalatraListener)

    server.setHandler(context)

    server.start()
    server.join()
  }
}
