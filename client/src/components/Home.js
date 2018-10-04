import React, { Component } from 'react';
import ShowPosts from './ShowPosts';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  render() {
    return (
        <div className="App">
          <ShowPosts />
        </div>
    );
  }
}

export default Home;
