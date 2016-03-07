'use strict';
import React from 'react';
import {TaskInput} from './input_output/task.js';
import * as _ from 'lodash';
import request from 'superagent';
import c from '../config/config.json';
var config = JSON.parse(c);

class NewTodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], newtask: '', title: ''}
    }

    addTask(e) {
        var newtask = this.state.newtask;
        var key = this.state.tasks.length + 1;
        this.state.tasks.push({key: key, task: newtask});
        this.state.newtask = "";
        this.forceUpdate();
    }

    onFocusLost(e) {
        var id = e.target.getAttribute("data-reactid");
        this.state.newtask = e.target;
    }

    onTitle(e) {
        this.state.title = e.target.value;
        this.forceUpdate();
    }

    onTask(e) {
        this.state.newtask = e.target.value;
        this.forceUpdate();
    }

    onSubmit(e) {
        this.setState({tasks: [], newtask: '', title: ''});
        self = this;
        request
            .post(config.url)
            .send({title: this.state.title, tasks: this.state.tasks})
            .end(function(err, res) {
                if( err || !res.ok) {
                    console.error(err);
                    console.error(res);
                }
                console.log("sending task to server");
                self.props.onSubmitForm();
            });
    }
    render() {
        var tasks = _.map(this.state.tasks, function(obj) {
            return <li key={obj.key} >{obj.task}</li>;
        });

        return (
            <div className="newTodo">
                <button type="button" className="btn btn-sq-lg btn-block" data-toggle="modal" data-target="#todoModal">new todo</button>
                <div id="todoModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">new task</h4>
                            </div>
                            <div className="modal-body">
                                <form className="newTodoForm">
                                    <input type='text' className="form-control" placeholder='title' onChange={this.onTitle.bind(this)} value={this.state.title} />
                                    <ul>
                                        {tasks}
                                    </ul>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <input type='text' className="form-control" placeholder='task' onChange={this.onTask.bind(this)} value={this.state.newtask} />
                                <button className='btn' onClick={this.addTask.bind(this)}>add</button>
                                <button className='btn btn-default' data-dismiss="modal" onClick={this.onSubmit.bind(this)}>
                                    <span className="glyphicon glyphicon-ok" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewTodoForm;
