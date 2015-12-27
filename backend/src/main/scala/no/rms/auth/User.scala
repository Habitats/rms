package no.rms.auth

case class User(id: String, username: Option[String] = None, password: Option[String] = None, rememberMe: Boolean = false, admin: Boolean = false) {

  def forgetMe() {
    println("User: this is where you'd invalidate the saved token in you User model")
  }
}

