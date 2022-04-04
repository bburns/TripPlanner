// dialog-text
// show a dialog to enter multiline text

import React from 'react';
import Modal from 'react-modal';
import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; //. cool - adapt for markdown?
import './styles.css';


export default ({ isOpen, handleOkay, handleCancel, title = '', defaultValue = '', placeholder = '', rootName = 'root' }) => {

  const appElement = document.getElementById(rootName);

  // need to use this, else have to make your own class from scratch?
  const style = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) { // escape
      cancel();
    }
  };

  const okay = () => {
    const el = document.getElementById('modal-textarea');
    const text = el.value;
    handleOkay(text);
    // alert("done");
    // handleDone('');
  };

  const cancel = () => {
    handleCancel();
  }

  return (
    <Modal
      isOpen={isOpen}
      appElement={appElement}
      style={style}
    >
      <div className="dialog-text-header">
        {title}
        <button onClick={okay}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </div>
      <textarea
        name="text"
        id="modal-textarea"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      {/* editorState={editorState} */}
      {/* onEditorStateChange={this.onEditorStateChange} */}
      {/* <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      /> */}
    </Modal>
  );
};
