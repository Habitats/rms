
import javax.servlet.ServletContext

import com.mchange.v2.c3p0.ComboPooledDataSource
import no.rms.Logger
import no.rms.db.RmsDb
import no.rms.servlets.{PublicServlet, SecretServlet, SessionServlet}
import org.scalatra._
import slick.driver.JdbcDriver.api._

class ScalatraBootstrap extends LifeCycle {
  val cpds = new ComboPooledDataSource
  Logger.info("Created c3po connection pool")

  override def init(context: ServletContext) {
    val db = Database.forDataSource(cpds)
    RmsDb.init(db)
    context.mount(new SecretServlet(db), "/secret/*")
    context.mount(new SessionServlet, "/session/*")
    context.mount(new PublicServlet(db), "/*")
  }

  private def closeDbConnection(): Unit = {
    Logger.info("Closing c3po connection pool")
    cpds.close()
  }

  override def destroy(context: ServletContext): Unit = {
    super.destroy(context)
    closeDbConnection()
  }
}
