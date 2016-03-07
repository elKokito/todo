'use strict';
import React from 'react';

class TaskInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type='text' className="form-control" placeholder='task' onBlur={this.props.onFocusLost} />
        )
    }
};

class TaskOutput extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <li className='list-group-item' >{this.props.task}<button className='btn btn-success btn-xs pull-right'>done</button></li>
        )
    }
};

export {TaskInput, TaskOutput};
