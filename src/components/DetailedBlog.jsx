import React, { Component } from 'react';
import './DetailedBlog.css';

class DetailedBlog extends Component {
    render() {
        return (
            <div className="detailed-blog">
                <h2>{this.props.messageData[0]}</h2>
                <p><strong>Author: </strong>{this.props.messageData[1]}</p>
                <p><strong>Date: </strong>{this.props.messageData[2]}</p>
                <p><strong>Text: </strong>{this.props.messageData[3]}</p>
            </div>
        )
    }
}

export default DetailedBlog;