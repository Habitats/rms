import javax.servlet.ServletContext

import no.rms._
import org.scalatra._

class ScalatraBootstrap extends LifeCycle {
  override def init(context: ServletContext) {
    context.mount(new RmsServlet, "/*")
  }
}
