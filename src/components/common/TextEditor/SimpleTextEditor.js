import React from 'react';
import { Editor, Raw } from 'slate';
import Style from './Style.css';
import CodeNode from './Block/CodeNode';

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
}, { terse: true });

export default class SimpleTextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      state : initialState,
      schema : {
        nodes : {
          code : CodeNode
        }
      }
    },
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(state){
    this.setState({
      state
    });
  }

  handleKeyDown(event, data, state){
    if (!event.metaKey) return;

    // if(event.which != 55 || !event.shiftKey) return;
    //
    // const newState = state
    //   .transform()
    //   .insertText('and')
    //   .apply();

    if (event.which != 192 || !event.metaKey) return

    // Determine whether any of the currently selected blocks are code blocks.
    const isCode = state.blocks.some(block => block.type == 'code')

    // Toggle the block type depending on `isCode`.
    return state
      .transform()
      .setBlock(isCode ? 'paragraph' : 'code')
      .apply()
  }

  render(){
    return (
      <div className={Style.editorCon}>
        <div className={Style.editor}>
          <Editor
            schema={this.state.schema}
            onKeyDown={this.handleKeyDown}
            state={this.state.state}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}