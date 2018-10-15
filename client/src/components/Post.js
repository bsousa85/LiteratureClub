import React, { Component } from 'react'
import '../Styles/post.css';
import { Card, CardSubtitle, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';


export class Post extends Component {
  
  onClick = () => {
    this.props.onSubmit(this.props.posts._id);
  }

  checkLike = () => {
    const { likedBy } = this.props.posts;
    const { userID } = this.props.user;
    var equal;
    likedBy.map(like => {
      if(like._id === userID) {
        equal = true;
      }
    });
    if(equal) {
      return true;
    }
    return false;

  }

  showAddComment() {
    if(this.props.auth) {
      return (
                <div >
                    <p id="comment-user">{this.props.user.username}</p>
                    <textarea onChange={this.props.onChange} name="text" placeholder="Write some feedback!" />
                    <button onClick={this.onClick}>Submit</button>
                </div>
      )
    }
  }

  showLikeButton() {
    if(this.props.auth && (!this.checkLike())) {
      return (
        <a onClick={() => {this.props.onLikeClick(this.props.posts._id)}}>
          <img className="like" src="images/likebtn.png" height="30" width="30" />
        </a>
      )
    }
    if(this.props.auth && (this.checkLike())) {
      return (
        <a onClick={() => {this.props.onDislikeClick(this.props.posts._id)}}>
          <img className="like" src="images/dislikebtn.png" height="30" width="30" />
        </a>
      )
    }
  }

  render() {
    return (
          <div className="post">
            <Card>
              <CardBody>
                <CardTitle>{this.props.posts.title}</CardTitle>
                <CardSubtitle >{this.props.posts.category}</CardSubtitle>
                <CardSubtitle className="author">Author : {this.props.posts.author}</CardSubtitle>
              </CardBody>
              <CardBody>
                <CardText className="content">{this.props.posts.text}</CardText>
              </CardBody>
              <div className="like-section">
                {this.showLikeButton()}
                <p id="votes">{this.props.posts.likes} people like this post</p>
                <p id="time">posted on, {this.props.posts.time}</p>
              </div>
                {this.props.posts.comment.map(({user, text}) => (
                  <div className="comment-section">
                      <p id="comment-user">{user} : </p>
                      <p id="comment-text">{text}</p>
                  </div>
                ))}
                {this.showAddComment()}
            </Card>
          </div>
    )
  }
}

export default Post;
