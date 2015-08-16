package no.rms

import javax.mail.internet.InternetAddress

import courier.Defaults._
import courier._
import no.rms.models.Email

trait RmsMailer {
  def send(email: Email) = {
    val mailer = Mailer("utpost.sysedata.no", 587)
      .auth(true)
      .as("kontaktskjema@romerike-markiseservice.no", "mutte123")
      .startTtls(true)()

    mailer(Envelope.from(new InternetAddress("kontaktskjema@romerike-markiseservice.no"))
      .to(new InternetAddress("morten@romerike-markiseservice.no"))
      .subject(email.subject)
      .content(Multipart()
      .html("<html><body><h1>Forespørsel</h1>" +
      "<p>Melding fra: " + email.name + "</p>" +
      "<p>Telefon: " + email.contactPhone + "</p>" +
      "<p>Epost: " + email.contactEmail + "</p>" +
      "<p>Emne: " + email.subject + "</p>" +
      "<p>Melding: " + email.message + "</p>" +
      "</body></html>")))
      .onSuccess {
      case _ => {
        println("delivered message")
      }
    }

    mailer(Envelope.from(new InternetAddress("kontaktskjema@romerike-markiseservice.no"))
      .to(new InternetAddress(email.contactEmail))
      .subject("Kopi av forespørsel til Romerike Markiseservice: " + email.subject)
      .content(Multipart()
      .html("<html><body><h1>Kopi av forespørsel</h1>" +
      "<p>Melding fra: " + email.name + "</p>" +
      "<p>Telefon: " + email.contactPhone + "</p>" +
      "<p>Epost: " + email.contactEmail + "</p>" +
      "<p>Emne: " + email.subject + "</p>" +
      "<p>Melding: " + email.message + "</p>" +
      "</body></html>")))
      .onSuccess {
      case _ => {
        println("delivered copy to " + email.contactEmail)
      }
    }
  }
}
