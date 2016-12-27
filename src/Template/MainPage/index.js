import React from 'react';
import NavLink from '../../components/common/Navigation/NavLink';
import style from './style.css';

class MainPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={style.mainPageContainer}>
        <ul>
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/images">Images</NavLink></li>
          <li><NavLink to="/Editor">Editor</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default MainPage;