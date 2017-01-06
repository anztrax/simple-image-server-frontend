import React from 'react';
import { SimpleImageViewer } from '../../../components/common/ImageViewer';

export default class ImagesPage extends React.Component{
  render(){
    return (
      <div>
        <h1>Images Page</h1>
        <SimpleImageViewer imageUrl={"#"} />
      </div>
    );
  }
}