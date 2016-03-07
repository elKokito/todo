'use strict';
var React = require('react');
var ReactDom = require('react-dom');
import NewTodoForm from './src/todo_form.js';
import TodoGrid from './src/todo_grid.js';

class TodoBox extends React.Component {

    onSubmitForm () {
        this.refs["grid"].refresh();
    }

    render() {
        return (
            <div>
                <NewTodoForm onSubmitForm={this.onSubmitForm.bind(this)} />
                <TodoGrid ref="grid" />
            </div>
        );
    }
}

ReactDom.render(
    <TodoBox />,
    document.getElementById('ili')
);
