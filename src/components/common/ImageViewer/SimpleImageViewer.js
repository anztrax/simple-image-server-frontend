import React, { PropTypes } from 'react';
import Style from './Style.css';
import classnames from 'classnames';

export default class SimpleImageViewer extends React.Component{
  static get propTypes(){
    return {
      imageUrl : PropTypes.string.isRequired,
    }
  }

  constructor(props){
    super(props);
  }

  render(){
    const { imageUrl = '#', isShowMagnifier = false } = this.props;
    const magnifierShowedStyle = classnames(
      Style.magnifiedImage,
      (!isShowMagnifier ? Style['hide-magnifiedImage']: '')
    );

    return (
      <div>
        <div className={Style.thumbnailImage}>
          <img
            src={imageUrl}
            width="100"
            height="100"
          />
        </div>

        <div className={magnifierShowedStyle}>
          <img
            src={imageUrl}
            width="100"
            height="100"
          />
        </div>
      </div>
    )
  }
}