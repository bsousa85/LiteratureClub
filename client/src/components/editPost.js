import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost, resetPostRedirect, resetPostMessage, resetPostErrorMessage } from '../actions/postActions';
import { Redirect } from 'react-router';

class editPost extends Component {


    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.location.state.postInfo._id;
        const editedPost = {
            title : this.state.title,
            category : this.state.category,
            text : this.state.content
        }
        this.props.updatePost(id, editedPost);
    }

    showMessage = () => {
        console.log("message : " + this.props.message);
        console.log("redirect : " + this.props.redirect);
        if(this.props.message && this.props.redirect) {
          return(
            <div>
              <Alert color="success">{this.props.message}</Alert>
              {this.props.resetPostRedirect()}
              {this.props.resetPostMessage()}
              {this.props.errorMessage !== '' ? this.props.resetPostErrorMessage() : null}
              <Redirect to="/userPage" />
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
        const { postInfo } = this.props.location.state;
        return(
                <Container>
                    {this.showMessage()}
                    <h3>Edit your Post</h3>
                    <Form className="form" onSubmit={this.onSubmit}>
                        <Col>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" name="title" onChange={this.onChange} defaultValue={postInfo.title} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input type="text" name="category" onChange={this.onChange} defaultValue={postInfo.category} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Content</Label>
                                <Input type="textarea" name="content" onChange={this.onChange} defaultValue={postInfo.text}></Input>
                            </FormGroup>
                        </Col>
                        <Button>Edit Post</Button>
                    </Form>
                </Container>
        )
    }
}

editPost.PropTypes = {
    addPost : PropTypes.func,
    resetPostErrorMessage: PropTypes.func,
    resetPostMessage: PropTypes.func,
    resetPostRedirect: PropTypes.func,
    message : PropTypes.object,
    errorMEssage: PropTypes.object,
    user : PropTypes.object
}

const mapStateToProps = state => ({
    message: state.post.message,
    errorMessage: state.post.errorMessage,
    user: state.auth.username,
    redirect: state.post.redirect
});

export default connect(mapStateToProps, { updatePost, resetPostErrorMessage, resetPostMessage, resetPostRedirect })(editPost);