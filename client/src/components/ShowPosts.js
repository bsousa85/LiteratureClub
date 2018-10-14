import React, { Component } from 'react';
import { Container, ListGroup} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Post from './Post';
import { connect } from 'react-redux'
import { getPosts, incrementLikes, decrementLikes } from '../actions/postActions';
import { addComment } from '../actions/commentActions';
import PropTypes from 'prop-types';

class ShowPosts extends Component {
    

  componentDidMount() {
      this.props.getPosts();
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
      //this.forceUpdate();
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
      <Container>
          <ListGroup>
              <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition  timeout={500} classNames="fade">
                        <Container>
                            <Post posts={post}  onDislikeClick={this.onDislikeClick} onLikeClick={this.onLikeClick} user={this.props.user} onSubmit={this.onSubmit} onChange={this.onChange} setPostId={this.setPostId} auth={this.props.auth} />
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
    addComment: PropTypes.func,
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    commentMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth,
    auth: state.auth.authenticated,
    commentMessage: state.comment.message
});


export default connect(mapStateToProps, { getPosts, addComment, incrementLikes, decrementLikes })(ShowPosts);
