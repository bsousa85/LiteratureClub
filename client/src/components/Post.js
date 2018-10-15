import React, { Component } from 'react'
import '../Styles/post.css';
import { Card, CardSubtitle, CardBody, CardTitle, CardText} from 'reactstrap';


export class Post extends Component {


  onClick = () => {
    this.props.onSubmit(this.props.posts._id);
  }

  checkLike = () => {
    if(this.props.posts._id === null) {
      return true;
    }
    const { likedBy } = this.props.posts;
    const { userID } = this.props.user;
    var equal;
    likedBy.map(like => {
      if(like._id === userID) {
        equal = true
      }
    });
    if(equal) {
      return true;
    } 
    return false; 
  } 

  showAddComment = () => {
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

  showLikeButton = () => {
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

  formatDate = () => {
    var { time } = this.props.posts;
    const year = time.substr(0, 4);
    const month = time.substr(5, 2);
    const day = time.substr(8, 2);
    const hours = time.substr(11, 2);
    var aux = parseInt(hours);
    aux++;
    var newhours = aux.toString();
    const minutes = time.substr(14, 2);
    const seconds = time.substr(17, 2);
    const formattedTime = day + "/" + month + "/" + year + " at " + newhours + ':' + minutes + ":" + seconds;
    return formattedTime;
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
                <p id="time">posted on, {this.formatDate()}</p>
              </div>
                {this.props.comments.map(({user, text, post}) => (
                  post._id === this.props.posts._id ? 
                  <div className="comment-section">
                    <p id="comment-user">{user} : </p>
                    <p id="comment-text">{text}</p>
                  </div> : null
                ))}
                {this.showAddComment()}
            </Card>
          </div>
    )
  }
}

export default Post;
