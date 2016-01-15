package no.rms

import no.rms.models.{Product, ProductWrapper}
import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner


@RunWith(classOf[JUnitRunner])
class RmsTest extends FunSuite {

  //  test("that dropbox works") {
  //    Dropbox.login
  //  }


  test("products") {
    val root =
      Product("a", "908", Seq(
        Product("aa", "345", Seq(
          Product("aaa", "123"),
          Product("aab", "213")
        )),
        Product("ab", "123", Seq(
          Product("aba", "234"),
          Product("abb", "453")
        )),
        Product("ac", "345")
      )).attachCategory()

    def flat(root: Product): Seq[Product] = root.sub.flatMap(r => flat(r)) ++ Seq(root)

    val all = flat(root)
    val wrapped = all.map(ProductWrapper.wrap)
    val tree = ProductWrapper.tree(wrapped)

    println("Root:")
    println(root)
    println("Copy:")
    println(tree)
    assert(root === tree)
  }
}
