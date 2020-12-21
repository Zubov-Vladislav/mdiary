/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {trueAttrs} from "../../../../../../helpers/attrebutes";
import T from 'prop-types'
import TaskForm from "../../../TaskForm";
import useClickIn from "../../../../hooks/useClickIn";
import {Meteor} from "meteor/meteor";
import EditWrapper from "../EditWrapper";

const Task = ({task, onCheckboxClick, onTaskClick}) => {

  return (
    <nu-el
      width='100%'
    >
      <nu-flex
        gap
        content='space-between'
        items='center'
      >
        <nu-flex
          gap='1x'
          items='center'
          content='flex-start'
          width='100%'
        >
          <nu-el
            text={`${task.checked && 'del'} wrap`}
            width='80%'
            onClick={onTaskClick}
          >{task.text}</nu-el>
        </nu-flex>
        {
          task.checked ?
            <nu-icon onClick={() => onCheckboxClick(task)} name='check'/> :
            <nu-icon onClick={() => onCheckboxClick(task)} name='circle'/>
        }
      </nu-flex>
    </nu-el>

  );
}


Task.propTypes = {
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
  onCheckboxClick: T.func.isRequired,
  onDeleteClick: T.func.isRequired,
  onTaskClick: T.func
}
Task.defaultProps = {
  onTaskClick: () => {}
}
export default EditWrapper(Task);
