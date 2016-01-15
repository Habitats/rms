package no.rms

import java.io.File
import java.nio.file.{Files, Paths}

import com.sksamuel.scrimage.Image
import com.sksamuel.scrimage.nio.JpegWriter
import no.rms.models.ImageWrapper

import scala.util.Random

object ImageUtils {
  implicit val writer = JpegWriter().withCompression(80).withProgressive(true)

  val rootDir = "img"
  val delim = ","

  def notFound(): File = Random.shuffle(Paths.get(rootDir, "not_found").toFile.listFiles.toList).head

  def privates: Seq[ImageWrapper] = {
    val p = fetchUrls("privat")
    p
  }

  def rename(f: File): File = {
    if (f.getName.contains(" ")) {
      val renamed = Paths.get(f.getParent, f.getName.toLowerCase.replaceAll(" ", "_")).toFile
      if (!renamed.exists) {
        Files.move(f.toPath, renamed.toPath)
      } else{
        Files.delete(f.toPath)
      }
      Logger.info("Renaming: " + f.getName + " > " + renamed.getName)
      renamed
    } else {
      f
    }
  }

  def fetchUrls(path: String = ""): Seq[ImageWrapper] = {
    val f = new File("img/raw/" + path)
    if (f.exists) {
      f.listFiles
        .map(rename)
        .map(_.getName.toLowerCase).filter(f => f.endsWith(".jpg") || f.endsWith(".png"))
        .map(f => ImageWrapper(f, (if (path.length > 0) (path + "/") else "") + f))
    } else Nil
  }

  def fetchPath(urlPath: String, size: String = "raw"): Option[File] = {
    val args = urlPath.split(ImageUtils.delim)
    val id = args.last
    val path = if (args.length > 1) args.take(args.length - 1).mkString("", "/", "/") else ""
    ImageUtils.fetchSize(id, size, path).map(rename)
  }

  private def fetch(id: String, path: String = ""): Option[File] = {
    val imgDir = if (path != "") new File(s"$rootDir/raw/$path") else new File(rootDir + "/raw")
    val image = new File(imgDir.toString, id)
    if (image.exists) Some(image) else None
  }

  private def fetchSize(id: String, size: String, path: String = ""): Option[File] = {
    fetch(id, path).map(image => {
      size match {
        case "med" | "low" =>
          val thumbsRoot = Paths.get(rootDir, "thumbs_" + size).toString
          val dest = new File(if (path != "") Paths.get(thumbsRoot, path).toString else thumbsRoot)
          dest.mkdirs
          val out = new File(dest.getAbsolutePath, id)
          if (out.exists) {
            out
          } else {
            out.createNewFile()
            size match {
              case "med" => Image.fromFile(image).bound(1500, 1500).output(out)
              case "low" => Image.fromFile(image).bound(256, 256).output(out)
            }
          }
        case _ => image
      }
    }
    )
  }
}
