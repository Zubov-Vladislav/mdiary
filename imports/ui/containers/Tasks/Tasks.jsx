import React, {useState, useMemo, useEffect} from 'react';
import {Meteor} from 'meteor/meteor'
import Task from '../../components/Task/components/Task';
import {useTracker} from 'meteor/react-meteor-data';
import TaskCollection from '../../../db/collections/TaskCollection';
import TaskForm from "../../components/TaskForm";
import Filter from "../../components/Filter";
import Button from "../../components/Button";

const toggleChecked = ({_id, checked}) => {
  Meteor.call('tasks.setChecked', _id, !checked)
}
const handleDelete = ({_id}) => {
  Meteor.call('tasks.remove', _id)
}

const hideCompletedFSelector = (isHidden) => isHidden ? {checked: {$ne: true}} : {};

const Tasks = () => {
  const [isHidden, setHidden] = useState(false)

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? {userId: user._id} : {};

  const pendingOnlyFilter = useMemo(() => (
    {
      ...hideCompletedFSelector(isHidden),
      ...userFilter
    }
  ), [isHidden, userFilter]);


  const {tasks, pendingTasksCount, isLoading} = useTracker(() => {
    const noDataAvailable = {tasks: [], pendingTasksCount: 0};
    if (!Meteor.user) return noDataAvailable;

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return {...noDataAvailable, isLoading: true}
    }

    const tasks = TaskCollection.find(
      pendingOnlyFilter,
      {
        sort: {checked: 1, createdAt: -1}
      }
    ).fetch()


    const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count()

    return {tasks, pendingTasksCount}
  })

  const tasksCount = useTracker(() => {
    if (!user) return 0

    return TaskCollection.find(userFilter, {sort: {createdAt: -1}}).count();
  })

  const logout = () => Meteor.logout();

  return <nu-flex
    flow='column'
    content='center'
    items='center'
    width='100%'
  >
    <nu-main
      padding='3x 2x||1x 2x'
      gap
      width='10x 100% 80x'
    >
      {/*<nu-theme name='progress' hue="272" saturation="60"/>*/}
      {isLoading && <nu-progressbar hue="272" value='100'/>}
      {/*{!!tasksCount && <Filter onChangeFilter={setHidden}/>}*/}
      <nu-flex
        content='center space-between'
      >
        <nu-h5>All</nu-h5>
        <Button
          padding='0 2x'
          onClick={logout}
          special
        >Logout</Button>
      </nu-flex>
      <nu-attrs for='card' fill='transparent' border='none'/>
      <TaskForm/>
      <nu-flow
        flow='column'
        gap
      >
        {
          tasks.map(task => {
            return <Task
              key={task._id}
              onCheckboxClick={toggleChecked}
              onDeleteClick={handleDelete}
              task={task}
            />
          })
        }
      </nu-flow>

    </nu-main>
  </nu-flex>
}

export default Tasks
