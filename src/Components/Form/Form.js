import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            image: '',
            content: ''
        }
    }
    handleChanger = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createPost = () => {
        const {userId} = this.props
        const {title, image, content} = this.state
        const body = {
            title: title,
            image: image,
            content: content
        }
        axios
        .post(`/new/${userId}`, body)
        .then(res => {
            console.log(res.data)
            this.props.createPost(res.data)
            this.props.history.push('/dashboard')
        })
    }

    render() {
        const {image} = this.state
        return (
            <div>
                <h1>New Post</h1>
                <label>Title:</label>
                <input className='title' name='title' onChange={(e) => this.handleChanger(e)} />
                <label>Image URL:</label>
                <input className='image' name='image' onChange={(e) => this.handleChanger(e)} />
                <label>Content:</label>
                <input className='content' name='content' onChange={(e) => this.handleChanger(e)} />
                <button onClick={() => this.createPost()} className='createButton'>Post</button>
            <div className='imageHolder'>
                {!image ? <img src='https://static.thenounproject.com/png/2999524-200.png' alt='post' className='newPostImages'/>
                : <img src={image} alt='post' className='newPostImages' />}
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Form);