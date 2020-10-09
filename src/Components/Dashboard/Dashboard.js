import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            search: '',
            showMyPosts: false
        }
        this.getPosts = this.getPosts.bind(this)
    }
    componentDidMount = () => {
        axios
        .get('/posts')
        .then(res => {
            this.props.getPosts(res.data)
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        const {showMyPosts, search} = this.state
        if(prevState.showMyPosts !== showMyPosts || prevState.search !== search) {
            this.getPosts()
        }
    }
    getPosts() {
        const {search, showMyPosts} = this.state
        axios
        .get(`/posts/${this.props.userId}?userpost=${showMyPosts}&search=${search}`)
        .then(res => {
            this.props.getPosts(res.data)
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    checkAddress = () => {
        const {showMyPosts} = this.state
        if(!showMyPosts){
            this.setState({
                showMyPosts: true
            })
        } else {
            this.setState({
                showMyPosts: false
            })
        }
    }
    reset = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        const {search, showMyPosts} = this.state
        const {posts} = this.props

        const mappedPosts = posts.map(post => {
            return (<Link className='postLink' to={`/post/${post.post_id}`} key={post.post_id} style={{textDecoration: 'none'}}>
                <div>
                    <h2 className='postTitle'>{post.title}</h2>
                    <h5 className='usernameDisplay'>By: {post.username}</h5>
                    <img src={post.profilePicture} alt='prof' className='profPic' />
                </div>
            </Link>)
        })

        return (
            <div>
                <input className='searchBar' placeholder='Search Posts' name='search' value={search} onChange={(e) => this.handleChange(e)} />
                <button className='reset' onClick={() => this.reset()}>Reset</button>
                <label>My Posts</label>
                <input type='checkbox' name='showMyPosts' id='checkAddress' checked={showMyPosts} onChange={this.checkAddress} />
                {mappedPosts}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        username: state.username,
        profilePicture: state.profilePicture,
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Dashboard);