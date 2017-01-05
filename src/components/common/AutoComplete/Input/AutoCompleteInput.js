import React from 'react';
import Style from './Style.css';

export default class AutoCompleteInput extends React.Component{
  constructor(props){
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  keyDownHandlers(event){
    return {
      ArrowDown: (event)=>{
        event.preventDefault();
        const { getIsOpen } = this.props;

        if(getIsOpen() === false){
          return;
        }
      },
      ArrowUp: (event)=>{
        event.preventDefault();
        const { getIsOpen } = this.props;
      },
      Enter: (event)=>{

      },
      Escape : (event)=>{
        const { setIsOpen } = this.props;
        setIsOpen(false);
      }
    }
  };


  handleKeyDown(event){
    const { setIsOpen } = this.props;
    const keydownHandlersResult = this.keyDownHandlers();
    if(keydownHandlersResult[event.key]){
      keydownHandlersResult[event.key](event);
    }else{
      setIsOpen(true);
    }
  }

  handleInputFocus(event){
    const { setIsOpen, getIgnoreBlur, setIgnoreBlur } = this.props;

    if (getIgnoreBlur()) {
      setIgnoreBlur(false);
      return
    }

    setIsOpen(true);
  }

  handleInputBlur(event){
    const { setIsOpen, getIgnoreBlur } = this.props;
    if (getIgnoreBlur()) return;

    setIsOpen(false);
  }

  handleKeyUp(event){

  }

  handleKeyPress(event){
  }

  handleOnChange(event){
    const { onChange } = this.props;
    const value = event.target.value;
    onChange(value);
  }

  render(){
    return (
      <input
        onFocus={this.handleInputFocus}
        onBlur={this.handleInputBlur}
        onKeyPress={this.handleKeyPress}
        onChange={this.handleOnChange}
        className={Style.autoCompleteInput}
        value={this.props.value}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      />
    )
  }
}