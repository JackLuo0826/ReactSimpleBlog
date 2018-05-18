import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        // ES6 destructuring, grabing meta from field and touched, error from meta.
        // var meta = field.meta; var touched = meta.touched; error = meta.error;
        const { meta: { touched, error } } = field;
        const formClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
        // {...field.input} puts its own props(event handlers) inside input tag which is same as:
        // <input onChange={field.input.onChange} onFocus={field.input.onFocus} /> etc.
        return (
            <div className={formClassName}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            // .history is a helper function passed in by react-router
            this.props.history.push('/');
        });
    }

    render(){
        // same as var handleSubmit = this.props.handleSubmit;
        // handleSubmit is a function from reduxForm library, the function we pass
        // on to it will be called after reduxForm finishes its own tasks
        // like validation etc.
        const { handleSubmit } = this.props;

        return(
            // .bind(this) ensures we will be in the right scope when
            // this function is called in some distant future.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// console.log(values) -> { title: 'aaa', categories: 'bbb', content: 'ccc' }
function validate(values) {
    const errors = {};

    // Validate
    if (!values.title || values.title.length < 2) {
        errors.title = "Enter a title at least 2 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter categories!";
    }
    if (!values.content) {
        errors.content = "Enter content!";
    }

    // if erros is empty, form has no errors
    return errors;
}

export default reduxForm({
    validate,
    //form name, for multiple forms in one page, eg.sign up and log in form.
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);