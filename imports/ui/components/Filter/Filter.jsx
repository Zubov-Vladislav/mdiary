/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, { useState, useEffect } from 'react';
import T from 'prop-types'

const Filter = ({onChangeFilter}) => {
  const [ hideCompleted, setHideCompleted ] = useState(false);
  
  useEffect(() => {
    onChangeFilter(hideCompleted)
  }, [onChangeFilter, hideCompleted])
  
  const handleCompleted = () => {
    setHideCompleted(h => !h)
  }
  
  return <nu-flex
    gap
    content='flex-end'
    items='center'
  >
    <nu-btn
      fill='hue(280 special)'
      color='special-text'
      onEventTap={handleCompleted}
    >
      {hideCompleted ? 'Show All' : 'Hide Completed'}
    </nu-btn>
  </nu-flex>
}


Filter.PropType = {
  onChangeFilter: T.func.isRequired
}

export default Filter
