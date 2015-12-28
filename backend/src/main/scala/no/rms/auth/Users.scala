package no.rms.auth

object Users {

  val active = scala.collection.mutable.Map[String, User]()

  def add(user: User) = {
    active += (user.id -> user)
  }

  def findById(id: String) = {
    active(id)
  }
}
