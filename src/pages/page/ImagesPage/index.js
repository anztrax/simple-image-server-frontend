import React from 'react';
import { SimpleImageViewer } from '../../../components/common/ImageViewer';

export default class ImagesPage extends React.Component{
  render(){
    return (
      <div>
        <SimpleImageViewer
          imageUrl={'#'}
        />
        <h1>Images Page</h1>
      </div>
    );
  }
}