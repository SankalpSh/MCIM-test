import React, { Component } from 'react';
import { render } from 'react-dom';
import ContactAddress from './ContactAddress';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      items: [],
      isloaded: false,
      isHovering: false,
    }
    
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isloaded: true,
        items: json,
      })
    });
  }


  render() {
    var { isloaded, items,isHovering} = this.state;
    if(!isloaded)
    {
      return<div>
        <h1><strong>Users(Loading)</strong></h1>
      </div>
    }
    

    else {
      return (
        
      <div>
        <h1>Users</h1>
        <div onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover} className="mainBorder">
           {items.map(item => (
            <div key = {item.id}>
              <p><strong className="name">{item.name}</strong>
              <span>({item.username})</span>
              </p>
              <div>
                {
                 this.state.isHovering &&
                 <span style={{ border: '1px solid black'}}>
                  
                 <div className="box">
                 
                  <h4><strong className="dark">Street</strong> {item.address.street}</h4>
                  <h4><strong className="dark">Suite</strong> {item.address.suite}</h4>
                  <h4><strong className="dark">City</strong> {item.address.city}</h4>
                  <h4><strong className="dark">Zip</strong> {item.address.zipcode}</h4>
                  </div>
                  </span> 
                 }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    }
    
  }
}

render(<App />, document.getElementById('root'));
