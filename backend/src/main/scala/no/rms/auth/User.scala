package no.rms.auth

case class User(id: String = "NO_ID", username: Option[String] = None, password: Option[String] = None, rememberMe: Boolean = false, admin: Boolean = false) {

  def update(safeUser: SafeUser): User = copy(username = safeUser.username, rememberMe = safeUser.rememberMe)
}
