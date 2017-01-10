import React from 'react';
import classnames from 'classnames';

export default function createMarkButton({ type, text }){
  return class MarkButton extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isHover : false
      };
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.hasMark = this.hasMark.bind(this);
    }

    handleMouseDown(event) {
      const {onMouseDown, setEditorState, getEditorState} = this.props;
      const newEditorState = getEditorState()
        .transform()
        .toggleMark(type)
        .apply();

      setEditorState(newEditorState);
      onMouseDown(event);
    }

    handleMouseEnter(event){
      event.preventDefault();
      this.setState({ isHover : true });
    }

    handleMouseLeave(event){
      event.preventDefault();
      this.setState({ isHover : false });
    }

    hasMark(){
      const { getEditorState } = this.props;
      return getEditorState().marks.some(mark => mark.type == type);
    }

    render(){
      const {  buttonWrapperStyle, buttonStyle, activeButtonStyle } = this.props;
      const isTextHasMarkActive = this.hasMark();
      const finalButtonStyle = classnames(buttonStyle,((isTextHasMarkActive) ? activeButtonStyle : ''), ((this.state.isHover) ? activeButtonStyle : ''));
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