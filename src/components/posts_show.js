import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';
 
class PostsShow extends Component {
    componentDidMount() {
        if (!this.props.post){
            // react-router function for accessing url wildcard values
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onClickDelete() {
        const { id } = this.props.match.params;

        // passing callback function to action creator for route redirection.
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/" className="btn">Home</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onClickDelete.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// taking state.posts as 1st param, ownProps === PostsShow.props
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);