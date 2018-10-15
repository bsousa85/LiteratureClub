import React, { Component } from 'react';
import { Container, ListGroup} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
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
            console.log("AA");
            this.props.getComments();
        }
        if(this.props.post.liked !== nextProps.post.liked) {
            console.log("BB");
            this.props.getPosts();
            this.props.resetLiked();
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
              <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition  timeout={500} classNames="fade">
                        <Container>
                            <Post posts={post} comments={this.props.comments} onDislikeClick={this.onDislikeClick} onLikeClick={this.onLikeClick} 
                                  user={this.props.user} onSubmit={this.onSubmit} onChange={this.onChange} 
                                  setPostId={this.setPostId} auth={this.props.auth} />
                            <br />
                            <br />
                        </Container>
                    </CSSTransition>
                ))}
              </TransitionGroup>
          </ListGroup>
      </Container>
    )
  }
}

ShowPosts.PropTypes = {
    getPosts: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    addComment: PropTypes.func,
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    commentMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth,
    auth: state.auth.authenticated,
    //comment: state.comment.comments,
    comments: state.comment.comments
});


export default connect(mapStateToProps, { getPosts, addComment, incrementLikes, decrementLikes, getComments, resetLiked })(ShowPosts);
