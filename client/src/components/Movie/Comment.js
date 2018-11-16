import React, { Component } from 'react';
import axios from 'axios';
import Cmt from './Cmt';
import { withCredentials } from '../../utils/headers';

class Comment extends Component {

    state = {
        comment: "",
        comments: []
    }

    async componentDidMount() {
        console.log("IN DID MOUNT", withCredentials())
        const response = await axios.post("http://localhost:8080/api/comment/all", {
            imdbid: this.props.imdbid
        }, withCredentials()
    )

        console.log("COMMENTS", response.data)
        this.setState({comments: response.data})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("test")
        if (this.state.comment === "") {
            this.props.isTyping(false);
            return ;
        }
        console.log("U", this.props.userid)
        this.setState({comments: [...this.state.comments, {id: this.props.userid, imdbid: this.props.imdbid, username: "Just added by me", message: this.state.comment, date: Date.now()}]})
        const response = await axios.post("http://localhost:8080/api/comment/add", {
            imdbid: this.props.imdbid,
            username: "test",
            message: this.state.comment
        },withCredentials())

        this.setState({comment: ""})
        this.props.isTyping(false);
        console.log(response)
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.isTyping(true);
    }

    goToProfile = (userid) => {
        console.log("goto")
        this.props.history.push(`/user/${userid}`)
    }

    render () {
        return (
            <div>
                <h2> Comments: </h2>
                {
                    this.state.comments.map(c => {
                        return (
                            <Cmt key={`${c.username}-${c.date}}`} goToProfile={this.goToProfile} userid={c.id} username={c.username} message={c.message} date={c.date} />
                        )
                    })
                }
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea className="comment-area" name="comment" onChange={this.handleChange} rows="4" cols="50" value={this.state.comment}> </textarea>
                    </div>
                    <div>
                        <button type="submit" className="add-comment"> Add a comment </button>
                    </div>                
                </form>
            </div>
        )
    }
}

export default Comment;