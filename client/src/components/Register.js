import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form, FormGroup, Label, Input, Button, Alert, Container, Col} from 'reactstrap';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

export class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false
    }
  }

  showAlert(message) {
      
      return (
        <div>
          <Alert color="primary">{message}</Alert>
        </div>
      )
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value})
    console.log(this.state);
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

  render() {
    const { message } = this.props.message;
    const alert = message === undefined ? <div> </div> : this.showAlert(message);
    
     //  if(this.state.redirect) {
    //    this.setState({ redirect: !this.state.redirect});
    //     return <Redirect to ="/" />
    //  } 

    return (
        <Container>
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
          <div>
            {alert}
          </div>
          </Container>
    )
  }
}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  message: PropTypes.object
}

const mapStateToProps = state => ({
    message: state.auth.message
});


export default connect(mapStateToProps, {registerUser})(Register);
