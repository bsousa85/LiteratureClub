import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { loginUser } from '../actions/authActions';
import { checkUserStatus } from '../actions/authActions';


export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : ""
    }
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
  
  render() {
    return (
      <Container>
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

Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  checkUserStatus: PropTypes.func.isRequired,
  message: PropTypes.object,
}

const mapStateToProps = state => ({
  message: state.auth.message
});

export default connect(mapStateToProps, {loginUser, checkUserStatus})(Login);
