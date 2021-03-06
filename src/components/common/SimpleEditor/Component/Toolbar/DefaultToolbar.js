import React from 'react';
import { BoldMarkButton, ItalicMarkButton, StrikeThroughMarkButton, UnderlineMarkButton } from '../Buttons';
import {
  Header1BlockButton,
  Header2BlockButton,
  Header3BlockButton,
  Header4BlockButton,
  Header5BlockButton,
  Header6BlockButton,
  BulletedListBlockButton,
  NumberedListBlockButton,
  LinkInlineButton,
  ForegroundColorButton,
  BackgroundColorButton,
  CommentInlineButton
} from '../Buttons';

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

    this.BlockButtons = [
      Header1BlockButton,
      Header2BlockButton,
      Header3BlockButton,
      Header4BlockButton,
      Header5BlockButton,
      Header6BlockButton,
      BulletedListBlockButton,
      NumberedListBlockButton
    ];

    //view mode section
    this.viewModeText = this.props.viewMode.text;

    this.generateButtons = this.generateButtons.bind(this);
    this.generateBlockButton = this.generateBlockButton.bind(this);
    this.renderBlockButton = this.renderBlockButton.bind(this);
    this.renderInlineButton = this.renderInlineButton.bind(this);
    this.renderColorButton = this.renderColorButton.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleListBlock = this.handleListBlock.bind(this);
    this.handleLinkInline = this.handleLinkInline.bind(this);
    this.handleInlineComment = this.handleInlineComment.bind(this);
    this.handleColorMark = this.handleColorMark.bind(this);
  }

  handleMouseDown(){
    console.log('on mouse down');
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
          .unwrapBlock(numberedListBlockType);
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

  generateBlockButton(){
    const { getEditorState, setEditorState } = this.props;
    return (
      <span>
        {this.BlockButtons.map((BlockButton, index) => {
          return (
            <BlockButton
              key={index}
              onMouseDown={this.handleListBlock}
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

  handleLinkInline(isActive, inlineType){
    const { getEditorState, setEditorState } = this.props;
    let newState = getEditorState();
    if (isActive) {
      newState = newState
        .transform()
        .unwrapInline(inlineType)
        .apply();

    }else if (getEditorState().isExpanded) {
      const href = window.prompt('Enter the URL of the link:')
      newState = getEditorState()
        .transform()
        .wrapInline({
          type: inlineType,
          data: { href }
        })
        .collapseToEnd()
        .apply();

    }else {
      const href = window.prompt('Enter the URL of the link:')
      const text = window.prompt('Enter the text for the link:')
      newState = newState
        .transform()
        .insertText(text)
        .extendBackward(text.length)
        .wrapInline({
          type: inlineType,
          data: { href }
        })
        .collapseToEnd()
        .apply();
    }

    setEditorState(newState);
  }

  handleColorMark(markType, colorHex){
    const { getEditorState, setEditorState } = this.props;
    let newState = null;
    let oldColor = '';
    const isMarkActive = getEditorState().marks.some(mark => {
      if(mark.type == markType){
        oldColor = mark.data.get('color');
      }
      console.log('data : ',mark.data);
      return mark.type == markType;
    });

    if(isMarkActive){
      newState = getEditorState()
        .transform()
        .removeMark({
          type: markType,
          data: {
            color : oldColor
          }
        })
        .apply()
        .transform()
        .addMark({
          type: markType,
          data: {
            color : colorHex
          }
        })
        .apply();
    }else{
      newState = getEditorState()
        .transform()
        .addMark({
          type: markType,
          data: {
            color : colorHex
          }
        })
        .apply();
    }
    setEditorState(newState);
  }

  handleInlineComment(isActive, inlineType){
    const { getEditorState, setEditorState } = this.props;
    let newState = getEditorState();
    if(getEditorState().isExpanded) {
      const comment = window.prompt('enter your comment :');
      newState = getEditorState()
        .transform()
        .wrapInline({
          type: inlineType,
          data: { comment }
        })
        .collapseToEnd()
        .apply();
    }
    setEditorState(newState);
  }

  renderInlineButton(){
    const { getEditorState, setEditorState } = this.props;
    return (
      <span>
        <LinkInlineButton
          onMouseDown={this.handleLinkInline}
          icon={'icon'}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          buttonWrapperStyle={Style['button-wrapper']}
          buttonStyle={Style['button']}
          activeButtonStyle={Style['button-active']}
        />
        <CommentInlineButton
          onMouseDown={this.handleInlineComment}
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
    const generatedBlockButton = this.generateBlockButton();
    return (
      <span>
        {generatedBlockButton}
      </span>
    )
  }

  renderColorButton(){
    const { getEditorState, setEditorState } = this.props;
    return (
      <span>
        <ForegroundColorButton
          onMouseDown={this.handleColorMark}
          icon={'icon'}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
        />
        <BackgroundColorButton
          onMouseDown={this.handleColorMark}
          icon={'icon'}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
        />
      </span>
    )
  }

  render(){
    const generatedButtons = this.generateButtons();
    const blockButtons = this.renderBlockButton();
    const renderedInlineButtons =  this.renderInlineButton();
    const colorButtons = this.renderColorButton();
    return (
      <div>
        <span>View Mode : {this.viewModeText}</span>
        <div>Marks</div>
        {generatedButtons}
        {/** place node button here **/}
        <div>Blocks</div>
        {blockButtons}
        <div>Inlines</div>
        {renderedInlineButtons}
        <div>Colors</div>
        {colorButtons}
      </div>
    )
  }
}