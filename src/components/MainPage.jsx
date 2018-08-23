import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, Button } from 'react-bootstrap';
import './MainPage.css';
import DetailedBlog from "./DetailedBlog";

class MainPage extends Component {
    constructor(props) {
        super(props);

        let nowDate = new Date();

        this.state = {
            openDetailedBlog: false,
            blogName: 'Blog name',
            author: 'RenameUser',
            textForBlogs: '',
            currentDate: '' + nowDate.getDate() + '.' + (nowDate.getMonth() + 1) + '.' + nowDate.getFullYear(),
            listBlogs: [],
            arrayTimeForMessage: [],
            messageData: []
        };

        this.updateListBlogs = this.updateListBlogs.bind(this);
        this.openDetailedBlog = this.openDetailedBlog.bind(this);
    }

    handleChangeTextBlogs = event => {
        this.setState({ textForBlogs: event.target.value });
    };

    removeCurrentText = (textIndexForListBlog) => {
        let freshListBlogs = this.state.listBlogs;

        freshListBlogs.map((data, index) => textIndexForListBlog === index ? freshListBlogs.splice(index, 1) : null);

        this.updateListBlogs(freshListBlogs);
    };

    updateListBlogs(data) {
        this.setState({listBlogs: data});
    }

    handleSubmitTextBlogs = event => {
        event.preventDefault();

        let freshListBlogs = this.state.listBlogs;
        let freshTimeForMessage = this.state.messageData;

        freshListBlogs.push(this.state.textForBlogs);
        freshTimeForMessage.push(this.state.currentDate);

        this.updateListBlogs(freshListBlogs);
        this.setState({arrayTimeForMessage: freshTimeForMessage});

        document.getElementsByClassName('textarea-for-text-blog')[0].value = '';
    };

    openDetailedBlog(blogName, author, date, text,) {
        let messageData = [];
        messageData.push(blogName);
        messageData.push(author);
        messageData.push(date);
        messageData.push(text);
        this.setState({openDetailedBlog: true, messageData: messageData});
    }

    render() {
        if(!this.state.openDetailedBlog) {
            return (
                <div className="main-page">
                    <h1>{this.state.blogName}</h1>
                    <form onSubmit={this.handleSubmitTextBlogs}>
                        <FormGroup>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl className="textarea-for-text-blog" componentClass="textarea"
                                         placeholder="Text" onChange={this.handleChangeTextBlogs}/>
                        </FormGroup>
                        <Button type="submit" bsStyle="success">Add</Button>
                    </form>

                    <ul className="list-blogs">
                        {
                            this.state.listBlogs.map((data, index) => <li key={index}>
                                <p><strong>{this.state.blogName}</strong> {this.state.currentDate}</p>
                                {
                                    <a onClick={() => this.openDetailedBlog(this.state.blogName, this.state.author, this.state.arrayTimeForMessage[index], data)}>{data}</a>
                                }
                                <p><strong>{this.state.author}</strong></p>
                                <Button bsStyle="danger" onClick={() => this.removeCurrentText(index)}>Delete</Button>
                            </li>)
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <DetailedBlog messageData={this.state.messageData}/>
                </div>
            )
        }
    }
}

export default MainPage;