import React from 'react';
import { SketchPicker } from 'react-color';

export default function createColorMarkButton(type,text) {
  return class ColorMarkButton extends React.Component {
    static get markType(){
      return type;
    }

    constructor(props) {
      super(props);
      this.state = {
        color: '#fff'
      };
      this.handleChangeComplete = this.handleChangeComplete.bind(this);
      this.hasColorMark = this.hasColorMark.bind(this);
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
      const isTextHasColorMarkActive = this.hasColorMark();
      this.setColorState(color.hex);
      onMouseDown(isTextHasColorMarkActive, type, color.hex);
    };

    hasColorMark(){
      const { getEditorState } = this.props;
      return getEditorState().marks.some(mark => mark.type == type);
    }

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