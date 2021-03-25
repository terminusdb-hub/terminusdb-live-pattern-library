import React from 'react';
import ReactDOM from 'react-dom';
import PrettyPrintComponent from './prettyPrintComponent';

const PrettyPrintComponentDemo = () => (
  <div>
    <h1>React Component Demo</h1>
    <PrettyPrintComponent title="Hello" />
  </div>
);


/*
render(<const PrettyPrintComponentDemo = () => (
 />, document.getElementById('root'));   */



ReactDOM.render(<PrettyPrintComponentDemo />, document.getElementById('root'))
