/** @jsx jsx */
import React from 'react';
import T from 'prop-types';
import jsx from 'jsx-native-events';

import {attrs, insertText} from '../../../../helpers/attrebutes';

const FormField = React.forwardRef((
  {
    onInput,
    onEnter,
    label,
    type,
    ...props
  }, ref
) => {

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter()
    }
  }

  const inputProps = {
    onEventInput: onInput,
    onKeyDown: onEnter ? onKeyDown : null,
    ...attrs(props)
  }


  return <nu-field
  >
    {label && <nu-label padding='0 0 1x 0' {...insertText(label)}/>}
    {
      type === 'password' ?
        <nu-password ref={ref}  {...inputProps}  />
        :
        <nu-input ref={ref} {...inputProps}/>
    }
  </nu-field>
})

FormField.propTypes = {
  onInput: T.func,
  onEnter: T.func,
  label: T.string,
  type: T.oneOf(['password', null, undefined])
};
export default FormField
