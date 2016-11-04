import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  handleDelete() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
      // blog post created navigate to index page
      this.context.router.push('/')
    });
  }
  render() {
    if (!this.props.post) {
      return(
        <div>Loading ...</div>
      );
    }
    return (
      <div>
        <Link to='/'>Back to Index Page</Link>
        <button
          onClick={this.handleDelete.bind(this)}
          className="btn btn-danger pull-xs-right">Delete</button>
        <h3>{this.props.post.title}</h3>
        <h6>Categories: {this.props.post.categories}</h6>
        <p>{this.props.post.content}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
