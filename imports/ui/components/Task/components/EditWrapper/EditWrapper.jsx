
import React, {useState, useRef, useEffect, useCallback} from 'react';
import EditTask from "../EditTask";

const EditWrapper = (WrappedTask) => {
  return (props) => {
    const {task, onDeleteClick} = props;
    const [isEdit, setIsEdit] = useState(false);

    // useEffect(() => {
    //   console.log(props.task.text, isEdit)
    // }, [isEdit])

    const handleEdit = () => {
      setIsEdit(true)
    }
    const stopEdit = () => {
      setIsEdit(false)
    }

    if (isEdit) return <EditTask task={task} stopEdit={stopEdit} onDeleteClick={onDeleteClick}/>;


    return <WrappedTask onTaskClick={handleEdit} {...props}/>
  }

}


export default EditWrapper
