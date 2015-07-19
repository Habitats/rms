import React from 'react';

export default class ContactForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="form-horizontal" method="post">
        <div className="form-group">
          <span className="col-md-2 text-center"><i className="fa fa-user fa-2x"></i></span>

          <div className="col-md-10">
            <input name="name" type="text" placeholder="Navn" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-2 text-center"><i className="fa fa-envelope-o fa-2x"></i></span>

          <div className="col-md-10">
            <input name="email" type="text" placeholder="Epost" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-2 text-center"><i className="fa fa-phone-square fa-2x"></i></span>

          <div className="col-md-10">
            <input name="phone" type="text" placeholder="Telefon" className="form-control"/>
          </div>
        </div>
        <div className="form-group">
      <span className="col-md-2 text-center">
      <i className="fa fa-pencil-square-o fa-2x"></i>
      </span>

          <div className="col-md-10">
         <textarea className="form-control" id="message" name="message" placeholder="Skriv en meldingen din her." rows="7">
         </textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
