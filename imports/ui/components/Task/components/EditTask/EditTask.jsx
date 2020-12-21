/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import T from 'prop-types'
import TaskForm from "../../../TaskForm";
import useClickIn from "../../../../hooks/useClickIn";
import {Meteor} from "meteor/meteor";

const EditTask = ({task, stopEdit, onDeleteClick}) => {
  const refInput = useRef(null)
  const [newText, setNewText] = useState('');
  const [setRef, isIn] = useClickIn(refInput);

  const handleChange = useCallback(() => {
    const text = newText && newText.trim()
    if (text && text != task.text) {
      console.log('saved')
      Meteor.call('tasks.update', task, text);
    }
    stopEdit()
  }, [task, newText, stopEdit])


  useEffect(() => {
    console.log(isIn)
    if (!isIn) {
      handleChange()
    }
  }, [isIn])

  return (
    <nu-el
      width='100%'
    >
      <TaskForm
        setRef={setRef}
        task={task}
        setNewTextCb={setNewText}
        handleChange={handleChange}
        handleDelete={onDeleteClick}
      />
    </nu-el>)
}


EditTask.propTypes = {
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
  }).isRequired,
  stopEdit: T.func.isRequired,
  onDeleteClick: T.func.isRequired
}

export default EditTask
