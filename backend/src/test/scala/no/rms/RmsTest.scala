package no.rms

import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner


@RunWith(classOf[JUnitRunner])
class RmsTest extends FunSuite {

  //  test("that dropbox works") {
  //    Dropbox.login
  //  }

//  val db = {
//    import slick.driver.JdbcDriver.api._
//    new File("rms.mv.db").delete()
//    val cpds = new ComboPooledDataSource
//    val db = Database.forDataSource(cpds)
//    db
//  }
//
//  test("products") {
//    RmsDb.init(db).onSuccess { case r =>
//      val products = Products.products
//      val p1 = products.head
////      val single = RmsDb.store(p1, db)
//      val all = Future.sequence(products.map(p => RmsDb.store(p, db)))
//
//      all.onComplete {
//        case Success(r) =>
//          val futureProducts = RmsDb.allProducts(db).onComplete {
//            case Success(r) =>
////              val products2 = r.filter(_.id.split(",")(1) === "produkter").map(p => ProductWrapper.extract(p, r))
////              assert(products2.toSet === products.toSet)
////              println(r.mkString("\n"))
//          }
//        case Failure(ex) => throw new Exception
//      }
//    }
//
//    Thread.sleep(10000)
//  }
}
