import React from 'react';
import { SketchPicker } from 'react-color';

export default function createColorButton(type,text) {
  return class ColorButton extends React.Component {
    static get markType(){
      return type;
    }

    constructor(props) {
      super(props);
      this.state = {
        background: '#fff'
      };
    }

    handleChangeComplete = (color) => {
      this.setState({background: color.hex});
    };

    render() {
      return (
        <div style={{display : 'inline-block'}}>
          <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>
      )
    }
  }
}