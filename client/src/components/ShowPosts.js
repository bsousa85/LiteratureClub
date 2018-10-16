import React, { Component } from 'react';
import { Container, ListGroup} from 'reactstrap';
import Post from './Post';
import { connect } from 'react-redux'
import { getPosts, incrementLikes, decrementLikes, resetLiked } from '../actions/postActions';
import { addComment, getComments } from '../actions/commentActions';
import PropTypes from 'prop-types';

class ShowPosts extends Component {
    

  componentDidMount() {
      this.props.getPosts();
      this.props.getComments();
  }

    componentWillReceiveProps(nextProps) {
        if(this.props.comments.length !== nextProps.comments.length) {
            this.props.getComments();
        }
        if(this.props.post.liked.length !== nextProps.post.liked.length) {
            this.props.getPosts();
        } 
  }


  onChange = (e) => {
      this.setState({ [e.target.name] : e.target.value});
  }

  onSubmit = (ID) => {
      const comment = {
          user : this.props.user.username,
          text : this.state.text,
          post : ID
      }
      this.props.addComment(comment);
  }

  onLikeClick = (postID) => {
      const like = {
        likedBy : this.props.user.userID
      };
      this.props.incrementLikes(postID, like);
  }

  onDislikeClick = (postID) => {
    const like = {
        likedBy : this.props.user.userID
    };
    this.props.decrementLikes(postID, like);
  }

  render() {
    const { posts } = this.props.post;
    return (
      <Container id="post-container">
          <ListGroup>
                {posts.map((post) => (
                        <Container key={post._id}>
                            <Post posts={post} comments={this.props.comments} onDislikeClick={this.onDislikeClick} onLikeClick={this.onLikeClick} 
                                  user={this.props.user} onSubmit={this.onSubmit} onChange={this.onChange} 
                                  setPostId={this.setPostId} auth={this.props.auth} />
                            <br />
                            <br />
                        </Container>
                ))}
          </ListGroup>
      </Container>
    )
  }
}

ShowPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    addComment: PropTypes.func,
    post: PropTypes.object,
    user: PropTypes.object,
}

const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth,
    auth: state.auth.authenticated,
    comments: state.comment.comments
});


export default connect(mapStateToProps, { getPosts, addComment, incrementLikes, decrementLikes, getComments, resetLiked })(ShowPosts);
