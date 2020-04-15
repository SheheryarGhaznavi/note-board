import React from 'react';
import ReactDraggable from 'react-draggable';
var createClass = require('create-react-class'); 

var Note = createClass({

    getInitialState() {
        return {
            editing : false,
        }
    },

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px')
        }
    },

    componentDidUpdate() {
        console.log("update");
        if (this.state.editing) {
            this.refs.text.focus();
            this.refs.text.select();
        }
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.children !== nextProps.children || this.state !== nextState;
    },

    randomBetween(x, y, s) {
        return (x + Math.ceil(Math.random() *  (y-x))) +s;
    },

    edit() {
        this.setState({ editing:true })
    },

    save() {
        this.props.onUpdate(this.refs.text.value, this.props.id);
        this.setState({ editing:false });
    },

    remove() {
        this.props.onRemove(this.props.id);
    },

    renderForm() {
        return (
            <div className="note" style={this.style}>
                <textarea ref="text" defaultValue={this.props.children}></textarea>
                <span>
                    <button onClick={this.save}>SAVE</button>
                </span>
            </div>
        )
    },

    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    },

    render() {
        return <ReactDraggable>{(this.state.editing) ? this.renderForm() : this.renderDisplay()}</ReactDraggable> 
    }
})

export default Note;