package no.rms.db

import java.io.File
import java.time.LocalDateTime

import no.rms.models.{ImageWrapper, Product, ProductWrapper, Project}
import no.rms.{Config, Logger, Products}
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{Future, Promise}
import scala.util.{Failure, Success}


object RmsDb {
  def storeProduct(product: Product, db: Database): Future[Product] = {
    for {
      success <- store(ProductWrapper.wrap(product), db) if success
      all <- RmsDb.allProducts(db)
    } yield all
  }

  val delim = "___"

  class Projects(tag: Tag) extends Table[(String, String, String, String, String)](tag, "PROJECTS") {
    def id = column[String]("ID", O.PrimaryKey)
    def title = column[String]("TITLE")
    def description = column[String]("DESCRIPTION", O.Length(10000))
    def images = column[String]("IMAGES", O.Length(10000))
    def created = column[String]("CREATED")

    def * = (id, title, description, images, created)
  }

  class Products(tag: Tag) extends Table[(String, String, String, String, String, String, String)](tag, "PRODUCTS") {
    def id = column[String]("ID", O.PrimaryKey)
    def title = column[String]("TITLE")
    def description = column[String]("DESCRIPTION", O.Length(10000))
    def sub = column[String]("SUB_PRODUCTS", O.Length(10000))
    def images = column[String]("IMAGES", O.Length(20000))
    def src = column[String]("SRC")
    def category = column[String]("CATEGORY")

    def * = (id, title, description, sub, images, src, category)
  }

  def init(db: Database): Future[Boolean] = {
    val p = Promise[Boolean]()
    val dbFile = new File("rms.mv.db")
    if (!dbFile.exists) {
      val vgsImgs = Seq(
        ImageWrapper("1", "referanser/ref_nannestad.vgs_1.jpg"),
        ImageWrapper("2", "referanser/ref_nannestad.vgs_2.jpg"),
        ImageWrapper("3", "referanser/ref_nannestad.vgs_3.jpg"),
        ImageWrapper("4", "referanser/ref_nannestad.vgs_4.jpg")
      )
      val komImgs = Seq(
        ImageWrapper("1", "referanser/ref_nannestad.kommunehus_1.jpg"),
        ImageWrapper("2", "referanser/ref_nannestad.kommunehus_2.jpg"),
        ImageWrapper("3", "referanser/ref_nannestad.kommunehus_3.jpg"),
        ImageWrapper("4", "referanser/ref_nannestad.kommunehus_4.jpg")
      )

      val samples = Seq(
        Project("1", "Nannestad VGS", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", vgsImgs, LocalDateTime.now),
        Project("2", "Nannestad Kommunehus", "Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!", komImgs, LocalDateTime.now)
      )

      db.run(createSchemaAction).andThen {
        case _ =>
          samples.foreach(p => store(p, db))
          store(Products.products, db)
      }.onSuccess { case r => p.success(true) }
    } else {
      db.run(createSchemaAction).onSuccess { case r => p.success(true) }
    }
    p.future
  }

  def allProjects(db: Database): Future[Seq[Project]] = {
    db.run(projects.result).map(res => res.map {
      case (id, title, description, img, created) =>
        Project(id = id, title = title, description = description, images = img.split(delim).map(i => ImageWrapper.fromString(i)), created = Config.parse(created))
      case _ => throw new IllegalArgumentException("Couldn't fetch projects")
    })
  }

  def project(id: String, db: Database): Future[Option[Project]] = {
    db.run(projects.filter(_.id === id).result.headOption).map {
      case Some((id, title, description, img, created)) =>
        Some(Project(id = id, title = title, description = description, images = img.split(delim).map(i => ImageWrapper.fromString(i)), created = Config.parse(created)))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch project: $id")
    }
  }

  def product(id: String, db: Database): Future[Option[ProductWrapper]] = {
    db.run(products.filter(_.id === id).result.headOption).map {
      case Some(fields) => Some(ProductWrapper.fromFields(fields))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch product: $id")
    }
  }

  def allProducts(db: Database): Future[Product] = {
    val futureProducts = db.run(products.result)
    futureProducts.map { products =>
      val wrapped = for {
        fields <- products
      } yield ProductWrapper.fromFields(fields)
      ProductWrapper.tree(wrapped)
    }
  }

  implicit def toImage(str: String): Seq[ImageWrapper] = str.split(delim).map(i => ImageWrapper.fromString(i))

  def store(project: Project, db: Database): Future[Project] = {
    val data = projects +=(project.id, project.title, project.description, project.images.mkString(delim), Config.format(project.created))
    Logger.info("Adding project: " + project)
    val promise = Promise[Project]()
    db.run(data).andThen {
      case Success(res) => promise.success(project)
      case Failure(ex) => throw new Exception(ex)
    }
    promise.future
  }

  def store(product: Product, db: Database): Future[Boolean] = {
    val p = Promise[Boolean]()
    product.sub match {
      case Nil =>
        store(ProductWrapper.wrap(product), db)
      case rest =>
        val futures = Seq(store(ProductWrapper.wrap(product), db)) ++ rest.map(r => store(r, db))
        Future.sequence(futures).onComplete {
          case Success(res) => p.success(true)
          case Failure(ex) => p.failure(ex)
        }
        p.future
    }
  }

  def store(product: ProductWrapper, db: Database): Future[Boolean] = {
    val data = products.insertOrUpdate(product.id, product.title, product.description, product.sub, product.images, product.src, product.category)
    val p = Promise[Boolean]
    db.run(data).onComplete {
      case Success(res) => p.success(true)
      case Failure(ex) => throw new Exception(ex)
    }
    p.future
  }

  lazy val projects = TableQuery[Projects]
  lazy val products = TableQuery[Products]

  lazy val createSchemaAction = (products.schema ++ projects.schema).create
  lazy val dropSchemaAction = (products.schema ++ projects.schema).drop

  val selectProjectTitles = {
    for {c <- projects} yield c.title
  }
}
