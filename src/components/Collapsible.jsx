import { useRef, useState } from 'react';
import classNames from 'classnames';
import './Collapsible.css';

function Collapsible({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef();

  const toggle = (ev) => {
    ev.preventDefault();
    setOpen(!open);
  };

  const toggleClass = classNames({
    'toggle-button': true,
    'toggle-button_open': open,
    'toggle-button_closed': !open,
  });

  return (
    <div className="toggle-wrap">
      <button
        type="button"
        className={toggleClass}
        onClick={toggle}
        title={open ? 'Click to hide details' : 'Click to show details'}
      >
        {label}
      </button>
      <div
        className="content-parent"
        ref={contentRef}
        style={
          open
            ? {
                height: `${
                  contentRef.current
                    ? contentRef.current.scrollHeight + 'px'
                    : 'auto'
                }`,
              }
            : { height: '0px' }
        }
      >
        <div className="toggle content">{children}</div>
      </div>
    </div>
  );
}

export default Collapsible;
