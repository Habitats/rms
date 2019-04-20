package no.rms

import com.sendgrid.{Email => SendGridEmail, _}
import no.rms.models.Email

import scala.util.Try

trait SendGridMailer {

  def send(email: Email): Unit = {

    val mail = new Mail(
      new SendGridEmail(email.contactEmail),
      email.subject,
      new SendGridEmail(Config.mailTo),
      new Content("text/html",
        "<html><body><h1>Forespørsel</h1>" +
          "<p>Melding fra: " + email.name + "</p>" +
          "<p>Telefon: " + email.contactPhone + "</p>" +
          "<p>Epost: " + email.contactEmail + "</p>" +
          "<p>Emne: " + email.subject + "</p>" +
          "<p>Melding: " + email.message + "</p>" +
          "</body></html>"
      )
    )

    val copy = new Mail(
      new SendGridEmail(Config.mailFrom),
      "Kopi av forespørsel til Romerike Markiseservice: " + email.subject,
      new SendGridEmail(email.contactEmail),
      new Content("text/html",
        "<html><body><h1>Kopi av forespørsel</h1>" +
          "<p>Melding fra: " + email.name + "</p>" +
          "<p>Telefon: " + email.contactPhone + "</p>" +
          "<p>Epost: " + email.contactEmail + "</p>" +
          "<p>Emne: " + email.subject + "</p>" +
          "<p>Melding: " + email.message + "</p>" +
          "</body></html>"
      )
    )

    sendEmail(mail)
    sendEmail(copy)
  }

  private def sendEmail(mail: Mail) = {
    val sg = new SendGrid(Config.sendGridApi)
    val request = new Request()
    Try {
      request.method = Method.POST
      request.endpoint = "mail/send"
      request.body = mail.build()
      val response = sg.api(request)
      Log.i("Email sent: " + response.statusCode)
    }
  }
}
