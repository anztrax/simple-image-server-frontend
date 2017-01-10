import React from 'react';
import classnames from 'classnames';

export default function createInlineButton(type,text){
  return class InlineButton extends React.Component{
    static get blockType(){
      return type;
    }

    constructor(props) {
      super(props);
      this.state = {
        isHover : false
      };

      this.hasInlineType = this.hasInlineType.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    hasInlineType(){
      const { getEditorState } = this.props;
      return getEditorState().inlines.some(inline => inline.type == type);
    }

    handleMouseDown(event){
      event.preventDefault();
      const { onMouseDown } = this.props;
      const isTextHasInlineActive = this.hasInlineType();
      onMouseDown(isTextHasInlineActive, type);
    }

    handleMouseEnter(event){
      event.preventDefault();
      this.setState({ isHover : true });
    }

    handleMouseLeave(event){
      event.preventDefault();
      this.setState({ isHover : false });
    }

    render(){
      const { buttonWrapperStyle, buttonStyle, activeButtonStyle } = this.props;
      const isTextHasInlineActive = this.hasInlineType();
      const finalButtonStyle = classnames(buttonStyle,((isTextHasInlineActive) ? activeButtonStyle : ''), ((this.state.isHover) ? activeButtonStyle : ''));

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