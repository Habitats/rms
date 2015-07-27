import React from 'react';

export default class ContactForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="form-horizontal" method="post">
        <div className="form-group"><span className="col-md-2 text-center"><i className="fa fa-user fa-2x"></i></span>

          <div className="col-md-8">
            <input name="name" type="text" placeholder="Navn" className="form-control"/>
          </div>
          <span className="col-md-2 text-center"/>
        </div>
        <div className="form-group"><span className="col-md-2 text-center"><i className="fa fa-envelope-o fa-2x"/></span>

          <div className="col-md-8">
            <input name="email" type="text" placeholder="Epost" className="form-control"/>
          </div>
          <span className="col-md-2 text-center"/>
        </div>
        <div className="form-group"><span className="col-md-2 text-center"><i className="fa fa-phone-square fa-2x"/></span>

          <div className="col-md-8">
            <input name="phone" type="text" placeholder="Telefon" className="form-control"/>
          </div>
          <span className="col-md-2 text-center"/>
        </div>
        <div className="form-group"><span className="col-md-2 text-center"><i className="fa fa-pencil-square-o fa-2x"/></span>

          <div className="col-md-8">
            <textarea className="form-control" id="message" name="message" placeholder="Send oss en forespørsel, og vi vil komme tilbake til deg så fort som mulig." rows="7"/>
          </div>
          <span className="col-md-2 text-center"/>
        </div>
        <div className="form-group">
          <div className="col-md-8 col-md-offset-2 text-center">
            <button type="submit" className="btn btn-default btn-block" onClick={this.handleSubmit.bind(this)}>Send</button>
          </div>
        </div>
      </form>
    );
  }
}