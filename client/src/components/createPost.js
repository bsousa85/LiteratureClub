import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost, resetPostRedirect, resetPostMessage, resetPostErrorMessage } from '../actions/postActions';
import { Redirect } from 'react-router';

class createPost extends Component {

    componentDidMount() {
        this.setState({
            title: "",
            category: "",
            text: ""
        });
        this.props.errorMessage !== '' ? this.props.resetPostErrorMessage() : null;
        this.props.message !== '' ? this.props.resetPostMessage() : null;
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title : this.state.title,
            category : this.state.category,
            text : this.state.content,
            author : this.props.user
        }
        this.props.addPost(newPost);
    }

    showMessage = () => {
        if(this.props.message && this.props.redirect) {
            return(
              <div>
                <Alert color="success">{this.props.message}</Alert>
                {this.props.resetPostRedirect()}
                {this.props.resetPostMessage()}
                {this.props.errorMessage !== '' ? this.props.resetPostErrorMessage() : null}
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
        return(
                <Container>
                    {this.showMessage()}
                    <h3>Create your own Post!</h3>
                    <Form className="form" onSubmit={this.onSubmit}>
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" name="title" onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input type="text" name="category" onChange={this.onChange} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Content</Label>
                                <Input type="textarea" name="content" onChange={this.onChange}></Input>
                            </FormGroup>
                        </Col>
                        <Button>Create Post</Button>
                    </Form>
                </Container>
        )
    }
}

createPost.propTypes = {
    addPost : PropTypes.func,
    resetPostMessage: PropTypes.func,
    resetPostErrorMessage: PropTypes.func,
    resetPostRedirect: PropTypes.func,
    message : PropTypes.string,
    errorMessage: PropTypes.string,
    user: PropTypes.string,
    redirect: PropTypes.bool
}

const mapStateToProps = state => ({
    message: state.post.message,
    errorMessage: state.post.errorMessage,
    user: state.auth.username,
    redirect: state.post.redirect
});

export default connect(mapStateToProps, { addPost, resetPostErrorMessage, resetPostMessage, resetPostRedirect })(createPost);