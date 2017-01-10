import React from 'react';
import { Editor, Plain } from 'slate';
import DefaultToolbar from './Component/Toolbar/DefaultToolbar';
import Schema from './Schema/Schema';
import { DefaultShortcut } from './Plugins';

const emptyState = '';
const plugins = [].concat(DefaultShortcut);

export default class SimpleEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editorState : Plain.deserialize(emptyState),
      schema : Schema
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.setEditorState = this.setEditorState.bind(this);
    this.getEditorState = this.getEditorState.bind(this);
    // console.log('default shortcut : ',DefaultShortcut);
  }

  handleOnChange(newEditorState){
    this.setState({
      editorState : newEditorState
    })
  }

  getEditorState(){
    return this.state.editorState;
  }

  setEditorState(newEditorState){
    this.handleOnChange(newEditorState);
  }

  render(){
    return (
      <div>
        <DefaultToolbar
          setEditorState={this.setEditorState}
          getEditorState={this.getEditorState}
        />
        <Editor
          plugins={plugins}
          schema={this.state.schema}
          state={this.state.editorState}
          onChange={this.handleOnChange}
        />
      </div>
    )
  }
}