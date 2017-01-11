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
        color: '#fff'
      };
      this.handleChangeComplete = this.handleChangeComplete.bind(this);
      this.setColorState = this.setColorState.bind(this);
      this.getColorState = this.getColorState.bind(this);
    }

    setColorState(colorHex){
      this.setState({color: colorHex});
    }

    getColorState(){
      return this.state.color;
    }

    handleChangeComplete = (color) => {
      const { onMouseDown } = this.props;
      this.setColorState(color.hex);
      onMouseDown(type, color.hex);
    };

    render() {
      return (
        <div style={{display : 'inline-block'}}>
          <SketchPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>
      )
    }
  }
}