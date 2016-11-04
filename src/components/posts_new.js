import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';


class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post created navigate to index page
        this.context.router.push('/')
      });
  }
  render() {
    const { fields:{ title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create a New Blog Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label className="form-control-label">Title</label>
          <input className="form-control" type="text" {...title } />
          <div className="form-control-feedback">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label className="form-control-label">Categories</label>
          <input className="form-control" type="text" {...categories } />
            <div className="form-control-feedback">
              {categories.touched ? categories.error : ''}
            </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label className="form-control-label">Content</label>
          <textarea className="form-control" {...content } />
            <div className="form-control-feedback">
              {content.touched ? content.error : ''}
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a Title";
  }
  if (!values.categories) {
    errors.categories = "Enter at least one category"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }
  return errors;
}

export default reduxForm({
  form:'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
},null, { createPost })(PostsNew);
