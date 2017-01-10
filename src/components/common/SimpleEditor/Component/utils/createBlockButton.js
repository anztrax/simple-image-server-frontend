import React from 'react';
import classnames from 'classnames';

export default function createBlockButton(type,text){
  return class Blockbutton extends React.Component{
    static get blockType(){
      return type;
    }

    constructor(props) {
      super(props);
      this.state = {
        isHover : false
      };

      this.hasBlockType = this.hasBlockType.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    hasBlockType(){
      const { getEditorState } = this.props;
      return getEditorState().blocks.some(node => node.type == type);
    }

    handleMouseDown(event){
      event.preventDefault();
      const { onMouseDown } = this.props;
      const isTextHasBlockActive = this.hasBlockType();
      onMouseDown(isTextHasBlockActive, type);
    }

    handleMouseEnter(event){
      event.preventDefault();
      this.setState({ isHover : true });
    }

    handleMouseLeave(event){
      event.preventDefault()
      this.setState({ isHover : false });
    }

    render(){
      const { buttonWrapperStyle, buttonStyle, activeButtonStyle } = this.props;
      const isTextHasBlockActive = this.hasBlockType();
      const finalButtonStyle = classnames(buttonStyle,((isTextHasBlockActive) ? activeButtonStyle : ''), ((this.state.isHover) ? activeButtonStyle : ''));

      return (
        <span
          onMouseDown={this.handleMouseDown}
          title={text}
          className={buttonWrapperStyle}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <span className={finalButtonStyle}>
            {text}
            </span>
        </span>
      )
    }
  }
}