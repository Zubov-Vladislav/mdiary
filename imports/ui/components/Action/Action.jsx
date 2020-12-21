/** @jsx jsx */
import React from 'react';
import T from 'prop-types';
import jsx from 'jsx-native-events';
import NativeLink from '../NativeLink';

const ROLE_MAP = {
  'nu-btn': 'button',
  'nu-link': 'link',
  'nu-cardbtn': 'button',
};

export default function Action(props) {
  const { tag, big, purple, pink, onTap, onKey, onInput, to, children, label, ...otherProps } = props;
  const Tag = tag || 'nu-action';
  
  
  const onKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      onKey()
    }
  }
  
  return <Tag
    role={!to ? (ROLE_MAP[tag] || 'button') : null}
    to={to}
    is-big={big || null}
    is-purple={purple || null}
    is-pink={pink || null}
    label={label}
    onKeyDown={onKey && onKeyDown}
    onEventTap={onTap}
    onEventInput={(event) => onInput && onInput(event.detail)}
    {...otherProps}>
    {children}
    { NativeLink({ to, label, children }) }
  </Tag>
}

Action.propTypes = {
  onKey: T.func,
  onTap: T.func,
  big: T.bool,
  purple: T.bool,
  to: T.string,
};
