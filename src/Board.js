import React from 'react';
import './App.css';
import Note from './Note';
var createClass = require('create-react-class');

var Board = createClass({

  propTypes: {
      count: function (props, propName) {
          if (typeof props[propName] !== "number") {
              return new Error('Please enter a number')
          }

          if (props[propName] > 100) {
              return new Error('below 100')
          }
      }
  },

  getInitialState() {
      return {
          notes: []
      }
  },

  componentWillMount() {
      if (this.props.count) {
          var url = `https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
          fetch(url)
              .then(results => results.json())
              .then(array => array[0])
              .then(text => text.split('. '))
              .then(array => array.forEach(
                      sentence => this.add(sentence)))
              .catch(function(err) {
                  console.log("Didn't connect to the API", err)
              })
      }
  },

  nextId() {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  },

  add(text) {
      var notes = [
          ...this.state.notes,
          {
              id: this.nextId(),
              note: text
          }
      ]
      this.setState({notes});
  },

  update(text, id) {
      var notes = this.state.notes.map(
          note => ( (note.id !== id) ? note : { ...note , note: text } )
      );
      this.setState({notes});
  },

  remove(id) {
      var notes = this.state.notes.filter(note => note.id !== id);
      this.setState({notes});
  },

  createNote(value) {
      return (<Note 
                  key={value.id}
                  id={value.id}
                  onUpdate={this.update}
                  onRemove={this.remove} >
                  {value.note}
              </Note>);
  },

  render() {
      return (
          
          <div className="board">
          
              {this.state.notes.map(this.createNote)}  {/* Displaying Notes */}

              <button onClick={() => this.add("My note")}>+</button>  {/* For Adding New Notes */}
          </div>
      )
  }
})


export default Board;
