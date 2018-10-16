import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { loginUser, resetRedirect, resetErrorMessage, resetMessage } from '../actions/authActions';
import { Redirect } from 'react-router';


export class Login extends Component {

  componentDidMount() {
    this.setState( {
      username: "",
      password: ""
    });
    this.props.errorMessage !== '' ? this.props.resetErrorMessage() : null;
    this.props.message !== '' ? this.props.resetMessage() : null;
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username : this.state.username,
      password : this.state.password
    }
    this.props.loginUser(user);
  }

  showMessage = () =>{
    if(this.props.message && this.props.redirect) {
      return(
        <div>
          <Alert color="success">{this.props.message}</Alert>
          {this.props.resetRedirect()}
          {this.props.resetMessage()}
          {this.props.errorMessage !== '' ? this.props.resetErrorMessage() : null}
          <Redirect to="/" />
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
      <Container>
        {this.showMessage()}
        <h3>Sign In</h3>
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
          <Button>Login</Button>
        </Form>
      </Container>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  resetRedirect: PropTypes.func,
  resetMessage: PropTypes.func,
  resetErrorMessage: PropTypes.func,
  message: PropTypes.string,
  errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
  message: state.auth.message,
  errorMessage: state.auth.errorMessage,
  redirect: state.auth.redirect
});

export default connect(mapStateToProps, {loginUser, resetRedirect, resetMessage, resetErrorMessage})(Login);
