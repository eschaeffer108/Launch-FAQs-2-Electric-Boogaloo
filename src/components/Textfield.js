import React, {Component} from 'react';

const Textfield = (props) => {
  return(
    <label>{props.label}:
      <input
        name={props.name}
        type='text'
        value={props.content}
        onChange={props.handlerFunction}
      />
    </label>
  )
}


export default Textfield;
