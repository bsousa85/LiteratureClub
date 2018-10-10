import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../actions/postActions';

class createPost extends Component {


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

    render() {
        return(
                <Container>
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

createPost.PropTypes = {
    addPost : PropTypes.func,
    message : PropTypes.object,
}

const mapStateToProps = state => ({
    message: state.comment.message,
    user: state.auth.username
});

export default connect(mapStateToProps, {addPost})(createPost);