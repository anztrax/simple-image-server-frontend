import React from 'react';
import { Editor, Plain } from 'slate';
import DefaultToolbar from './Component/Toolbar/DefaultToolbar';
import Schema from './Schema/Schema';
import editorPlugin from './editorPlugin';

const emptyState = '';

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
    const editorCustomStyle = {
      lineHeight : '1.4em'
    };
    const { viewMode } = this.props;
    return (
      <div>
        <DefaultToolbar
          viewMode={viewMode}
          setEditorState={this.setEditorState}
          getEditorState={this.getEditorState}
        />
        <Editor
          readOnly={!viewMode.value.isEdit}
          style={editorCustomStyle}
          plugins={editorPlugin(viewMode)}
          schema={this.state.schema}
          state={this.state.editorState}
          onChange={this.handleOnChange}
        />
      </div>
    )
  }
}