package no.rms.db

import java.time.LocalDateTime

import com.mchange.v2.c3p0.ComboPooledDataSource
import no.rms.models.{Product, ProductWrapper, Project}
import no.rms.{Config, Logger, Samples}
import slick.dbio.Effect.Schema
import slick.driver.H2Driver.api._
import slick.lifted.{ProvenShape, TableQuery}
import slick.profile.FixedSqlAction

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{Future, Promise}

object RmsDb {
  lazy val cpds = new ComboPooledDataSource
  Logger.info("Created c3po connection pool")

  val db: _root_.slick.driver.H2Driver.backend.DatabaseDef = {
    val db = Database.forDataSource(cpds)
    RmsDb.init(db)
    db
  }

  class Projects(tag: Tag) extends Table[(String, String, String, String, String)](tag, "PROJECTS") {
    def id: Rep[String] = column[String]("ID", O.PrimaryKey)
    def title: Rep[String] = column[String]("TITLE")
    def description: Rep[String] = column[String]("DESCRIPTION", O.Length(1000000))
    def images: Rep[String] = column[String]("IMAGES", O.Length(10000))
    def modified: Rep[String] = column[String]("MODIFIED")

    def * : ProvenShape[(String, String, String, String, String)] = (id, title, description, images, modified)
  }

  class Products(tag: Tag) extends Table[(String, String, String, String, String, String, String, Int)](tag, "PRODUCTS") {
    def id: Rep[String] = column[String]("ID", O.PrimaryKey)
    def title: Rep[String] = column[String]("TITLE")
    def description: Rep[String] = column[String]("DESCRIPTION", O.Length(1000000))
    def sub: Rep[String] = column[String]("SUB_PRODUCTS", O.Length(10000))
    def images: Rep[String] = column[String]("IMAGES", O.Length(20000))
    def src: Rep[String] = column[String]("SRC")
    def category: Rep[String] = column[String]("CATEGORY")
    def index: Rep[Int] = column[Int]("INDEX")

    def * : ProvenShape[(String, String, String, String, String, String, String, Int)] = (id, title, description, sub, images, src, category, index)
  }

  lazy val projects: TableQuery[Projects] = TableQuery[Projects]
  lazy val products: TableQuery[Products] = TableQuery[Products]

  lazy val createSchemaAction: FixedSqlAction[Unit, NoStream, Schema] = (products.schema ++ projects.schema).create
  lazy val dropSchemaAction  : FixedSqlAction[Unit, NoStream, Schema] = (products.schema ++ projects.schema).drop
  val delim = "___"

  private def init(db: Database): Future[Boolean] = {
    val p = Promise[Boolean]()

    if (Config.test) {
      db.run(createSchemaAction).andThen {
        case _ =>
          Samples.projects.foreach(p => storeProject(p))
          store(Samples.products)
      }.onSuccess { case r => p.success(true) }
    } else {
      db.run(createSchemaAction).onSuccess { case r => p.success(true) }
    }
    p.future
  }

  def allProjects(): Future[Seq[Project]] = {
    db.run(projects.result).map(res => res.map {
      case (fields) => Project.fromFields(fields)
      case _ => throw new IllegalArgumentException("Couldn't fetch projects")
    })
  }

  def allProducts(): Future[Product] = {
    val futureProducts = db.run(products.result)
    futureProducts.map { products =>
      val wrapped = for {
        fields <- products
      } yield ProductWrapper.fromFields(fields)
      ProductWrapper.tree(wrapped).attachCategory()
    }
  }

  def fetchProject(id: String): Future[Option[Project]] = {
    db.run(projects.filter(_.id === id).result.headOption).map {
      case Some(fields) => Some(Project.fromFields(fields))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch project: $id")
    }
  }

  def fetchProduct(id: String): Future[Option[ProductWrapper]] = {
    db.run(products.filter(_.id === id).result.headOption).map {
      case Some(fields) => Some(ProductWrapper.fromFields(fields))
      case _ => throw new IllegalArgumentException(s"Couldn't fetch product: $id")
    }
  }

  def removeProject(id: String): Future[Boolean] = {
    val data = projects.filter(_.id === id).delete
    db.run(data).transform(s => true, f => f)
  }

  def removeProduct(id: String): Future[Boolean] = {
    val data = products.filter(_.id === id).delete
    db.run(data).transform(s => true, f => f)
  }

  def storeProject(project: Project): Future[Project] = {
    val modified = LocalDateTime.now
    val data = projects.insertOrUpdate(project.id, project.title, project.description, project.images.mkString(delim), Config.format(modified))
    Logger.info("Adding project: " + project)
    db.run(data).transform(s => project.copy(modified = modified), f => f)
  }

  def newProduct(product: Product): Future[Product] = {
    storeProduct(Product(title = product.title, description = product.description, index = product.sub.length + 1))
  }

  def storeProduct(product: Product): Future[Product] = {
    for {
      success <- store(product) if success
      all <- allProducts()
    } yield all
  }

  private def store(product: Product): Future[Boolean] = {
    product.sub match {
      case Nil =>
        store(ProductWrapper.wrap(product)).transform(s => true, f => f)
      case rest =>
        val futures = Seq(store(ProductWrapper.wrap(product))) ++ rest.map(r => store(r))
        Future.sequence(futures).transform(s => true, f => f)
    }
  }

  private def store(product: ProductWrapper): Future[Boolean] = {
    val data = products.insertOrUpdate(product.id, product.title, product.description, product.sub, product.images, product.src, product.category, product.index)
    db.run(data).transform(s => true, f => f)
  }

  def closeDbConnection(): Unit = {
    Logger.info("Closing c3po connection pool")
    cpds.close()
  }

}
