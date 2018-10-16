import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form, FormGroup, Label, Input, Button, Alert, Container, Col} from 'reactstrap';
import { registerUser, resetErrorMessage, resetMessage, resetRedirect } from '../actions/authActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import '../Styles/my-form.css';

export class Register extends Component {

  componentDidMount() {
    this.setState({
      username: "",
      password: "",
      email: "",
    });
    this.props.errorMessage !== '' ? this.props.resetErrorMessage() : null;
    this.props.message !== '' ? this.props.resetMessage() : null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username : this.state.username,
      password : this.state.password,
      email : this.state.email
    };
  
    this.props.registerUser(newUser);
  };

  showMessage = () => {
    if(this.props.message && this.props.redirect) {
      return(
        <div>
          <Alert color="success">{this.props.message}</Alert>
          {this.props.resetRedirect()}
          {this.props.resetMessage()}
          {this.props.errorMessage !== '' ? this.props.resetErrorMessage() : null}
          <Redirect to="/Login" />
        </div>
      )
    }
    else if(this.props.errorMessage && (!this.props.redirect)) {
      return(
        <div>
          <Alert color="danger">{this.props.errorMessage}</Alert>
        </div>
      )
    }
    else {
      return null;
    }
  }

  render() {
    return (
        <Container className="my-form">
          {this.showMessage()}
          <h3>Sign Up</h3>
          <Form className="form" onSubmit={this.onSubmit}>
            <Col>
              <FormGroup>
                  <Label>Username</Label>
                  <Input type="username" name="username" onChange={this.onChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" onChange={this.onChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" onChange={this.onChange} />
              </FormGroup>
            </Col>
            <Button>Register</Button>
          </Form>
          </Container>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func,
  resetMessage: PropTypes.func,
  resetErrorMessage: PropTypes.func,
  resetRedirect: PropTypes.func,
  message: PropTypes.string,
  ErrorMessage: PropTypes.message,
  redirect: PropTypes.bool
}

const mapStateToProps = state => ({
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    redirect: state.auth.redirect
});


export default connect(mapStateToProps, {registerUser, resetMessage, resetErrorMessage, resetRedirect})(Register);
