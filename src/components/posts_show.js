import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, clearCurrentPost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    // pull the id off the URL and pass to fetchPost
    // fetchPost makes the backend request, it resolves with some data
    // then your reducer picks it up so it can show it below
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/">Blog List</Link>
        <button className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.clearCurrentPost();
  }
}



function mapStateToProps(state) {
  // currently selected post
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost, clearCurrentPost })(PostsShow);
