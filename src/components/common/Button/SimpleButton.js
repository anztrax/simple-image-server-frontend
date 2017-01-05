import React from 'react'

export default class SimpleButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { text } = this.props;
    return (
      <button>
        {text}
      </button>
    )
  }
}