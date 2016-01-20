package no.rms.db

import java.io.File

import no.rms.models.{Product, ProductWrapper, Project}
import no.rms.{Config, Logger, Samples}
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{Future, Promise}

object RmsDb {
  class Projects(tag: Tag) extends Table[(String, String, String, String, String)](tag, "PROJECTS") {
    def id = column[String]("ID", O.PrimaryKey)
    def title = column[String]("TITLE")
    def description = column[String]("DESCRIPTION", O.Length(1000000))
    def images = column[String]("IMAGES", O.Length(10000))
    def created = column[String]("CREATED")

    def * = (id, title, description, images, created)
  }

  class Products(tag: Tag) extends Table[(String, String, String, String, String, String, String)](tag, "PRODUCTS") {
    def id = column[String]("ID", O.PrimaryKey)
    def title = column[String]("TITLE")
    def description = column[String]("DESCRIPTION", O.Length(1000000))
    def sub = column[String]("SUB_PRODUCTS", O.Length(10000))
    def images = column[String]("IMAGES", O.Length(20000))
    def src = column[String]("SRC")
    def category = column[String]("CATEGORY")

    def * = (id, title, description, sub, images, src, category)
  }

  lazy val projects = TableQuery[Projects]
  lazy val products = TableQuery[Products]

  lazy val createSchemaAction = (products.schema ++ projects.schema).create
  lazy val dropSchemaAction = (products.schema ++ projects.schema).drop
  val delim = "___"

  def init(db: Database): Future[Boolean] = {
    val p = Promise[Boolean]()
    val dbFile = new File("rms.mv.db")
    if (!dbFile.exists) {
      db.run(createSchemaAction).andThen {
        case _ =>
          Samples.projects.foreach(p => storeProject(p, db))
          store(Samples.products, db)
      }.onSuccess { case r => p.success(true) }
    } else {
      db.run(createSchemaAction).onSuccess { case r => p.success(true) }
    }
    p.future
  }

  def allProjects(db: Database): Future[Seq[Project]] = {
    db.run(projects.result).map(res => res.map {
      case (fields) => Project.fromFields(fields)
      case _ => throw new IllegalArgumentException("Couldn't fetch projects")
    })
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

  def fetchProject(id: String, db: Database): Future[Option[Project]] = {
    db.run(projects.filter(_.id === id).result.headOption).map {
      case Some(fields) => Some(Project.fromFields(fields))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch project: $id")
    }
  }

  def fetchProduct(id: String, db: Database): Future[Option[ProductWrapper]] = {
    db.run(products.filter(_.id === id).result.headOption).map {
      case Some(fields) => Some(ProductWrapper.fromFields(fields))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch product: $id")
    }
  }

  def storeProject(project: Project, db: Database): Future[Project] = {
    val data = projects.insertOrUpdate(project.id, project.title, project.description, project.images.mkString(delim), Config.format(project.created))
    Logger.info("Adding project: " + project)
    db.run(data).transform(s => project, f => f)
  }

  def storeProduct(product: Product, db: Database): Future[Product] = {
    for {
      success <- store(product, db) if success
      all <- RmsDb.allProducts(db)
    } yield all
  }

  private def store(product: Product, db: Database): Future[Boolean] = {
    product.sub match {
      case Nil =>
        store(ProductWrapper.wrap(product), db).transform(s => true, f => f)
      case rest =>
        val futures = Seq(store(ProductWrapper.wrap(product), db)) ++ rest.map(r => store(r, db))
        Future.sequence(futures).transform(s => true, f => f)
    }
  }

  private def store(product: ProductWrapper, db: Database): Future[Boolean] = {
    val data = products.insertOrUpdate(product.id, product.title, product.description, product.sub, product.images, product.src, product.category)
    db.run(data).transform(s => true, f => f)
  }
}
