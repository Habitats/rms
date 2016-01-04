package no.rms

import java.io.File
import java.nio.file.Paths

import com.sksamuel.scrimage.Image
import com.sksamuel.scrimage.nio.JpegWriter

import scala.util.Random

object ImageUtils {
  implicit val writer = JpegWriter().withCompression(80).withProgressive(true)

  val rootDir = "img"

  def notFound(): File = Random.shuffle(Paths.get(rootDir, "not_found").toFile.listFiles.toList).head

  def fetch(id: String, path: String = ""): Option[File] = {
    val imgDir = if (path != "") Paths.get(rootDir, "raw", path) else Paths.get(rootDir, "raw")
    val image = new File(imgDir.toString, id)
    if (image.exists) Some(image) else None
  }

  def fetchSize(id: String, size: String, path: String = ""): Option[File] = {
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
