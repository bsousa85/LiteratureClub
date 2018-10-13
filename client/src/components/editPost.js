import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost } from '../actions/postActions';

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

    render() {
        const { postInfo } = this.props.location.state;
        return(
                <Container>
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
    message : PropTypes.object,
}

const mapStateToProps = state => ({
    message: state.comment.message,
    user: state.auth.username
});

export default connect(mapStateToProps, {updatePost})(editPost);