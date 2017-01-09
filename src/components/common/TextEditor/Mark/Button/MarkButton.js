import React from 'react';
import Style from './Style.css';

export default class MarkButton extends React.Component{
  constructor(props){
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(event){
    const { onClickMark } = this.props;
    onClickMark(event);
  }

  render(){
    const { isActive, icon } = this.props;
    return (
      <span
        className={Style.button}
        onMouseDown={this.handleMouseDown}
        data-active={isActive}
      >
        <span className={Style.materialIcons}>{icon}</span>
      </span>
    )
  }
}