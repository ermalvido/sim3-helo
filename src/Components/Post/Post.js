import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        axios
        .get(`/post/${this.props.match.params.post_id}`)
        .then(res => {
            this.props.singlePost(res.data[0])
        })
    }
    delete = () => {
        const {post} = this.props

        axios
        .delete(`/post/delete/${post.post_id}`)
        .then(res => {
            this.props.getPosts(res.data)
            this.props.history.push('/dashboard')
        })
    }

    render() {
        const {post, userId} = this.props
        return (
            <div>
                <h1>{post.title}</h1>
                <h5>By: {post.username}</h5>
                <img src={post.profilePicture} alt='RoboHash' className='roboPic' />
                <h5 className='postBody'>{post.post_content}</h5>

            <div className='postImageHolder'>
                {!post.image ? <img src='https://static.thenounproject.com/png/2999524-200.png' alt='post' className='postImage' />
                : <img src={post.image} alt='post' className='postImage' />}
                {userId === post.author_id ? <button className='deleteButtonPlaceHolder' onClick={() => this.delete()}>Delete Post</button> : <div className='deleteButtonPlaceHolder'>Cannot Delete Post's That Are Not Yours.</div>}
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.post,
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Post);