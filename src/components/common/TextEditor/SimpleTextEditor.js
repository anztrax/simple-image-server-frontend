import React from 'react';
import { Editor, Raw, Plain, Selection, Node } from 'slate';
import Style from './Style.css';
import classnames from 'classnames';

import CodeNode from './Nodes/CodeNode';
import ParagraphNode from './Nodes/ParagraphNode';
import linkNode from './Nodes/LinkNote';
import CommentNode from './Nodes/CommentNode/CommentNode';
import SetInline from './Nodes/SetInline';

import BoldMark from './Mark/BoldMark';
import ItalicMark from './Mark/ItalicMark';
import StrikethroughMark from './Mark/StrikethroughMark';
import UnderlineMark from './Mark/UnderlineMark';

import MarkButton from './Mark/Button/MarkButton';

import isUrl from 'is-url';
import MarkHotKeys from './Plugins/MarkHotKeys';

import Portal from 'react-portal';
import position from 'selection-position';

const boldPlugin = MarkHotKeys({
  type : 'bold',
  code : 66
});

const plugins = [
  MarkHotKeys({ type : 'bold', key : 'b'}),
  MarkHotKeys({ type : 'italic', key : 'i'}),
  MarkHotKeys({ type : 'strikethrough', key : 'd'}),
  MarkHotKeys({ type : 'underline', key : 'u'}),
];

export default class SimpleTextEditor extends React.Component{
  constructor(props){
    super(props);

    this.initialContent = (
      (typeof window !== 'undefined') ? window.localStorage.getItem('content') : '' ||
      'The initial string of content!'
    );

    this.state = {
      state : Plain.deserialize(this.initialContent),
      schema : {
        nodes : {
          code : CodeNode,
          paragraph : ParagraphNode,
          link : linkNode,
          comment : CommentNode
        },
        marks: {
          bold: BoldMark,
          italic : ItalicMark,
          strikethrough : StrikethroughMark,
          underline : UnderlineMark,
          SetInline : SetInline
        }
      }
    };

    this.hoveringMenuItems = [
      { type : 'bold', icon : 'b'},
      { type : 'italic' , icon : 'i'},
      { type : 'underline', icon : 'u'},
      { type : 'strikethrough', icon : 's'},
    ];


    this.handleChange = this.handleChange.bind(this);
    this.onDocumentChange = this.onDocumentChange.bind(this);
    this.onClickMarkButton = this.onClickMarkButton.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.hasLinks = this.hasLinks.bind(this);
    this.hasComments = this.hasComments.bind(this);
    this.hasMark = this.hasMark.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  componentDidMount(){
    this.updateMenu();
  }

  componentDidUpdate(){
    this.updateMenu();
  }

  onDocumentChange(document, state){
    const content = Plain.serialize(state);
    window.localStorage.setItem('content',content);
  }

  updateMenu(){
    const { menu, state } = this.state;
    if(!menu) return;

    if (state.isBlurred || state.isCollapsed) {
      menu.removeAttribute('style')
      return
    }

    const rect = position()
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.scrollY - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2}px`;
  }
  //we must pass data from it, so we check and get the data of commented text if the data is same then apply new comment style ? , yes it is

  handleChange(state){
    //check if current cursor
    // const focusKey = state.selection.focusKey;
    // let currentTypeIsComment = false;
    // // const inlineRange =  Node.getInlinesAtRange(state.selection);
    // const inlinesList = state.inlines;
    // const focusElement = inlinesList.find(inline => {
    //   return inline === inline.getParent(focusKey);
    //   console.log(inline.getChild(focusKey));
    // });
    // if(typeof focusElement !== 'undefined'){
    //   currentTypeIsComment = focusElement.type == 'comment';
    // }
    //
    // if(currentTypeIsComment){
    //   const newState = state.transform().wrapInlineByKey({
    //     key : focusElement.key,
    //     type : 'setInline',
    //   });
    //
    //   this.setState({
    //     state : newState
    //   })
    // }


    // console.log('focus key : ',focusKey);
    // console.log('inline range : ',inlineRange);
    // console.log('inline list : ',inlinesList);


    this.setState({
      state
    });
  }

  hasLinks(){
    const { state } = this.state;
    return state.inlines.some(inline => inline.type == 'link');
  }

  hasMark(type){
    const { state } = this.state;
    return state.marks.some(mark => mark.type == type);
  }

  hasComments(type){
    const {state} = this.state;
    return state.inlines.some(inline => inline.type == 'comment')
  }

  onClickComment(event){
    event.preventDefault();
    let { state } = this.state;
    const hasComment = this.hasComments();
    if(hasComment){
      const userId = window.prompt('Enter the comment :')
      state = state
        .transform()
        .wrapInline({
          type: 'comment',
          data: { userId }
        })
        .collapseToEnd()
        .apply();
    }else if(state.isExpanded){
      const userId = window.prompt('Enter the comment :')
      state = state
        .transform()
        .wrapInline({
          type: 'comment',
          data: { userId }
        })
        .collapseToEnd()
        .apply();
    }

    this.setState({ state });
  }

  onClickLink(event){
    event.preventDefault();
    let { state }  = this.state;
    const hasLinks  = this.hasLinks();
    if(hasLinks){
      state = state
        .transform()
        .unwrapInline('link')
        .apply();
    }else if(state.isExpanded){
      const href = window.prompt('Enter the URL of the link:')
      state = state
        .transform()
        .wrapInline({
          type: 'link',
          data: { href }
        })
        .collapseToEnd()
        .apply();
    }else{
      const href = window.prompt('Enter the URL of the link:')
      const text = window.prompt('Enter the text for the link:')
      state = state
        .transform()
        .insertText(text)
        .extendBackward(text.length)
        .wrapInline({
          type: 'link',
          data: { href }
        })
        .collapseToEnd()
        .apply();
    }

    this.setState({ state });
  }

  onOpen(portal){
    this.setState({
      menu : portal.firstChild
    });
  }

  handlePaste(event, data, state){
    if (state.isCollapsed) return;
    if (data.type != 'text' && data.type != 'html') return;

    if (!isUrl(data.text)) return;

    let transform = state.transform();
    if (this.hasLinks()) {
      transform.unwrapInline('link')
    }

    return transform
      .wrapInline({
        type: 'link',
        data: {
          href: data.text
        }
      })
      .collapseToEnd()
      .apply();
  }

  renderToolbar(){
    const hasLinks = this.hasLinks();
    const hasComments = this.hasComments();

    return (
      <div className={Style.editorToolbar}>
        <span onMouseDown={this.onClickLink} data-active={hasLinks}>
          <span>link</span>
        </span>
        <span onMouseDown={this.onClickComment} data-active={hasComments}>
          <span>comment</span>
        </span>
      </div>
    );
  }

  onClickMarkButton(type,event){
    event.preventDefault();
    let { state } = this.state;

    state = state
      .transform()
      .addMark(type)
      .apply();

    this.setState({ state })
  }

  renderMenu(){
    const menuStyle = classnames(Style.menu, Style.hoverMenu);
    return (
      <Portal isOpened onOpen={this.onOpen}>
        <div className={menuStyle}>
          {
            this.hoveringMenuItems.map((hoveringMenuItem,index) => {
              const type = hoveringMenuItem.type;
              const isActive = this.hasMark(type);
              return (
                <MarkButton key={index} icon={hoveringMenuItem.icon} isActive={isActive} onClickMark={this.onClickMarkButton.bind(this,type)} />
              );
            })
          }
        </div>
      </Portal>
    );
  }

  render(){
    const Toolbar = this.renderToolbar();
    const hoverMenu = this.renderMenu();

    return (
      <div className={Style.editorCon}>
        <div className={Style.editor}>
          {Toolbar}
          {hoverMenu}
          <Editor
            plugins={plugins}
            schema={this.state.schema}
            state={this.state.state}
            onChange={this.handleChange}
            onPaste={this.handlePaste}
            onDocumentChange={this.onDocumentChange}
          />
        </div>
      </div>
    );
  }
}