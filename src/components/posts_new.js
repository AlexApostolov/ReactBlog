import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // access data from routes.js without explicitly calling it by using contextTypes property
  static contextTypes = {
    router: PropTypes.object
  };

  // helper function
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    // whenever the form tries to submit call "handleSubmit"
    // helpers available on a provided "fields" object from redux-form
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {/* don't scold user if form hasn't been touched yet */}
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

// use "reduxForm" function to wrap "PostsNew" component:
// similiar to the "connect" function from the react-redux library
export default reduxForm({
  // name the form
  form: 'PostsNewForm',
  // declare the fields contained by the form
  fields: ['title', 'categories', 'content'],
  // make redux-form use the "validate" function above
  validate
// reduxForm replaces "connect", 1st is form config
// 2nd is mapStateToProps (which we don't need, so null), 3rd is mapDispatchToProps
// (so we have access to this.props.createPost)
}, null, { createPost })(PostsNew);
