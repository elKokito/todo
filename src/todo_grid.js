'use strict';
import React from 'react';
import {TaskOutput} from './input_output/task.js';
import request from 'superagent';
import * as _ from 'lodash';
import c from '../config/config.json';
var config = JSON.parse(c);

class TodoGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []};
        self = this;
        request
            .get(config.url)
            .end(function(err, res) {
                self.setState({tasks: res.body});
            });
    }

    refresh() {
        self = this;
        request
            .get(config.url)
            .end(function(err, res) {
                self.setState({tasks: res.body});
            });
    }

    render() {
        var tasks = _.map(this.state.tasks, function(obj) {
            return (<TodoModal key={obj.id} {...obj} />);
        });

        return (
            <div className="container">
                <div className="row text-center">
                    {tasks}
                </div>
            </div>
        )
    }
}

class TodoModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var tasks = _.map(this.props.tasks, function(task) {
            return <TaskOutput {...task} />;
        });

        var target = "#" + this.props.id;

        return (
            <div className="col-xs-3">
                <button type="button" className="btn brn-sq-lg btn-block" data-toggle="modal" data-target={target} >{this.props.title}</button>
                <div id={this.props.id} className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group">
                                    {tasks}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoGrid;
