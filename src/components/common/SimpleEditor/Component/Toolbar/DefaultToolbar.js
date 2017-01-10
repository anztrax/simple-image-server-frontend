import React from 'react';
import { BoldMarkButton, ItalicMarkButton, StrikeThroughMarkButton, UnderlineMarkButton } from '../Buttons';
import { Header1BlockButton, Header2BlockButton, Header3BlockButton, Header4BlockButton, Header5BlockButton, Header6BlockButton, BulletedListBlockButton, NumberedListBlockButton } from '../Buttons';
import { UnorderedListNode, OrderedListNode, ListitemNode } from '../../Schema/Blocks';
import { hasBlockType } from '../utils/checkType';
import Style from './Style.css';

const DEFAULT_NODE = 'paragraph';

export default class DefaultToolbar extends React.Component{
  constructor(props){
    super(props);

    this.buttons = [
      BoldMarkButton,
      ItalicMarkButton,
      StrikeThroughMarkButton,
      UnderlineMarkButton
    ];

    this.headerBlockButtons = [
      Header1BlockButton,
      Header2BlockButton,
      Header3BlockButton,
      Header4BlockButton,
      Header5BlockButton,
      Header6BlockButton
    ];

    this.generateButtons = this.generateButtons.bind(this);
    this.generateHeaderBlockButton = this.generateHeaderBlockButton.bind(this);
    this.renderBlockButton = this.renderBlockButton.bind(this);
    this.renderListButton = this.renderListButton.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleHeaderBlock = this.handleHeaderBlock.bind(this);
    this.handleListBlock = this.handleListBlock.bind(this);
  }

  handleMouseDown(){
    console.log('on mouse down');
  }

  handleHeaderBlock(isActive, blockType){
    const { getEditorState, setEditorState } = this.props;
    const newEditorState = getEditorState()
      .transform()
      .setBlock(isActive ? DEFAULT_NODE : blockType)
      .apply();

    setEditorState(newEditorState);
  }

  handleListBlock(isActive, blockType) {
    const { getEditorState, setEditorState } = this.props;
    const { document, blocks } = getEditorState();
    let transform = getEditorState().transform();

    const bulletedListBlockType = UnorderedListNode.nodeType;
    const numberedListBlockType = OrderedListNode.nodeType;
    const listItemBlockType = ListitemNode.nodeType;

    if(blockType != bulletedListBlockType && blockType != numberedListBlockType){
      const isList = hasBlockType(getEditorState(), listItemBlockType);
      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : blockType)
          .unwrapBlock(bulletedListBlockType)
          .unwrapBlock(numberedListBlockType)
      }

      else {
        transform
          .setBlock(isActive ? DEFAULT_NODE : blockType)
      }
    }

    // Handle the extra wrapping required for list buttons.
    else {
      const isList = hasBlockType(getEditorState(), listItemBlockType);
      const isType = blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == blockType)
      });

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock(bulletedListBlockType)
          .unwrapBlock(NumberedListBlockButton)
      } else if (isList) {
        transform
          .unwrapBlock(blockType == bulletedListBlockType ? NumberedListBlockButton : bulletedListBlockType)
          .wrapBlock(blockType)
      } else {
        transform
          .setBlock(listItemBlockType)
          .wrapBlock(blockType)
      }
    }

    const newEditorState = transform.apply();
    setEditorState(newEditorState);
  }

  generateButtons(){
    const {setEditorState, getEditorState} = this.props;
    return this.buttons.map((Component,index)=>{
      return (
        <Component
          key={index}
          icon={'icon'}
          setEditorState={setEditorState}
          getEditorState={getEditorState}
          onMouseDown={this.handleMouseDown}
          buttonWrapperStyle={Style['button-wrapper']}
          buttonStyle={Style['button']}
          activeButtonStyle={Style['button-active']}
        />
      )
    });
  }

  generateHeaderBlockButton(){
    const { getEditorState, setEditorState } = this.props;
    return (
      <span>
        {this.headerBlockButtons.map((BlockButton, index) => {
          return (
            <BlockButton
              key={index}
              onMouseDown={this.handleHeaderBlock}
              icon={'icon'}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              buttonWrapperStyle={Style['button-wrapper']}
              buttonStyle={Style['button']}
              activeButtonStyle={Style['button-active']}
            />
          )
        })}
      </span>
    );
  }

  renderListButton(){
    const { getEditorState, setEditorState } = this.props;
    return (
      <span>
        <BulletedListBlockButton
          onMouseDown={this.handleListBlock}
          icon={'icon'}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          buttonWrapperStyle={Style['button-wrapper']}
          buttonStyle={Style['button']}
          activeButtonStyle={Style['button-active']}
        />
        <NumberedListBlockButton
          onMouseDown={this.handleListBlock}
          icon={'icon'}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          buttonWrapperStyle={Style['button-wrapper']}
          buttonStyle={Style['button']}
          activeButtonStyle={Style['button-active']}
        />
      </span>
    )
  }

  renderBlockButton(){
    const generatedHeaderBlockButton = this.generateHeaderBlockButton();
    const renderedListButton = this.renderListButton();
    return (
      <span>
        {generatedHeaderBlockButton}
        {renderedListButton}
      </span>
    )
  }

  render(){
    const generatedButtons = this.generateButtons();
    const blockButtons = this.renderBlockButton();
    return (
      <div>
        <div>Marks</div>
        {generatedButtons}
        {/** place node button here **/}
        <div>Blocks</div>
        {blockButtons}
      </div>
    )
  }
}