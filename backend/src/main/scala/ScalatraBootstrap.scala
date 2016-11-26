
import javax.servlet.ServletContext

import no.rms.db.RmsDb
import no.rms.servlets._
import org.scalatra._

class ScalatraBootstrap extends LifeCycle {

  override def init(context: ServletContext) {
    //    if (Config.DEBUG) Config.DB_FILE.delete
    context.mount(new IndexServlet, "/*")
    context.mount(new SecretServlet, "/secret/*")
    context.mount(new SessionServlet, "/session/*")
    context.mount(new PublicServlet, "/api/*")
    context.mount(new ImageServlet, "/image/*")
  }

  override def destroy(context: ServletContext): Unit = {
    super.destroy(context)
    RmsDb.closeDbConnection()
  }
}
