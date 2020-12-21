import React, {useState, useEffect, useRef} from 'react';
import {Meteor} from "meteor/meteor";
import FormField from "../FormField";
import '/imports/api/methods/tasksMethods';
import T from "prop-types";

const TaskForm = ({task, setNewTextCb, handleChange, handleDelete, setRef}) => {
  const inputRef = useRef(null);
  // const elementRef = useRef(null);
  const [text, setText] = useState(task?.text);

  const submitHandler = () => {
    if (text && text.trim()) {
      Meteor.call('tasks.insert', text);
    }
    setText('');
  }
  const handler = task ? handleChange : submitHandler;

  useEffect(() => {
    if (task && setNewTextCb) setNewTextCb(text);
  }, [text])

  useEffect(() => {
    if (inputRef.current && inputRef.current.nuRef) {
      const input = inputRef.current.nuRef

      const toggleFocusClass = () => {
        input.classList.toggle('focusing');
      }
      input.onfocus = toggleFocusClass;
      input.onblur = toggleFocusClass;
      console.log(input.classList, input.classList.contains('focusing'))
      if(!input.classList.contains('focusing')) inputRef.current.nuRef.focus();
    }
  }, [inputRef.current])


  return <nu-card
    ref={setRef}
    padding='0'
    gap
    border='none'
    // fill='hue(80)'
  >
    <nu-flex
      gap
      content='space-between'
      items='center'
      width='100%'
    >
      <nu-el
        width='80%'
      >
        <FormField
          ref={inputRef}
          value={text}
          onInput={(e) => setText(e.target.value)}
          placeholder='Type task...'
          border='none'
          fill='transparent'
          color='special'
          outline='none'
          padding='0'
          onEnter={handler}
        />
      </nu-el>
      {
        text && (task ?
          <nu-icon onClick={() => handleDelete(task)} name='trash-2'/> :
          <nu-icon onClick={submitHandler} name='plus'/>)
      }

    </nu-flex>
  </nu-card>
}
TaskForm.propTypes = {
  task: T.shape({
    _id: T.oneOfType([
      T.string,
      T.number
    ]),
    checked: T.bool,
    text: T.string,
    userId: T.oneOfType([
      T.string,
      T.number
    ]),
  }),
  setNewTextCb: T.func,
  handleChange: T.func,
  handleDelete: T.func,
  setRef: T.func,
}

TaskForm.defaultProps = {
  setNewTextCb: () => {
  },
  handleChange: () => {
  },
  handleDelete: () => {
  },
  setRef: () => {
  },
}
export default TaskForm
