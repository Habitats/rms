package no.rms

import java.io.{File, FileReader}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

import scala.util.{Failure, Success, Try}

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  private val conf: Option[Properties] = {

    def load(propPath: String) = {
      Try {
        val conf = new Properties
  Log.i(s"Attempting to load props from $propPath ...")
        conf.load(new FileReader(loadFile(propPath)))
        Log.i(s"Successfully loaded props from $propPath!")
        conf
      } match {
        case Failure(f) => Log.i(s"Couldn't load props from $propPath: $f"); None
        case Success(p) => Some(p)
      }
    }

    Stream("/conf.properties", "conf.properties", System.getenv("RMS_PROPS_PATH"))
      .flatMap(Option(_))
      .flatMap(load)
      .headOption
  }

  val username: String = prop("username", "RMS_USERNAME")
  val password: String = prop("password", "RMS_PASSWORD")

  val mailFrom: String    = prop("mail_from", "RMS_MAIL_FROM")
  val mailTo: String      = prop("mail_to", "RMS_MAIL_TO")
  val sendGridApi: String = prop("sendgrid_api", "RMS_SENDGRID_API_KEY")

  val test: Boolean     = prop("test", "RMS_TEST").toBoolean
  val imageRoot: String = prop("images_dir", "RMS_IMAGE_ROOT")
  val appRoot: String   = prop("app_dir", "RMS_APP_ROOT")
  val dbPath: String    = Option(System.getenv("RMS_DB_PATH")).getOrElse(throw new IllegalArgumentException("Missing RMS_DB_PATH"))

  val COOKIE_ID     = "YOLO"
  val ONE_WEEK: Int = 7 * 24 * 3600
  val DEBUG         = true

  def parse(date: String): LocalDateTime  = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)

  def loadFile(path: String): File = {
    new File(
      Try(getClass.getResource(path).getFile)
        .orElse(Try(getClass.getClassLoader.getResource(path).getFile))
        .getOrElse(path)
    )
  }

  private def prop(prop: String, env: String): String = {
    val value = Option(System.getenv(env))
      .filter(_.nonEmpty)
      .orElse(conf.flatMap(p => Option(p.getProperty(prop))))
      .getOrElse(throw new IllegalArgumentException(s"No valid key: $prop/$env"))
    Log.i(s"Loaded property: $prop/$env = $value")
    value
  }
}
