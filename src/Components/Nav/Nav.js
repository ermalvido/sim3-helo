import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component {
    constructor() {
        super();

        this.state = {}
    }

    render() {
        const {username, profilePicture} = this.props

        return (
            <div>
                <img src={profilePicture} alt='profile' />
                <h3>{username}</h3>
            <div className='navButtons'>
                <Link to='/dashboard'>
                    <button><img className='home' alt='Home Button' src='https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/home.png' /></button>
                </Link>
                <Link to='/new'>
                    <button><img className='newPost' alt='New Post Button' src='https://static.thenounproject.com/png/3318800-200.png' /></button>
                </Link>
                <Link to='/'>
                    <button><img className='logout' alt='Logout Button' src='https://icons-for-free.com/iconfiles/png/512/exit+logout+power+icon-1320183290717607792.png' /></button>
                </Link>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps)(Nav);