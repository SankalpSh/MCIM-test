import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class Tooltip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }
  
  hideTooltip () {
    this.setState({displayTooltip: false})
    
  }
  showTooltip () {
    this.setState({displayTooltip: true})
  }

  render() {
    let message = this.props.message
    let position = this.props.position
    return (
      <span className='tooltip'
          onMouseLeave={this.hideTooltip}
        >
        {this.state.displayTooltip &&
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className='tooltip-message'>{message}</div>
        </div>
        }
        <span 
          className='tooltip-trigger'
          onMouseOver={this.showTooltip}
          >
          {this.props.children}
        </span>
      </span>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      items:[],
      isLoaded:false,
      isHovering:false
    };
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
      setTimeout(()=>{
        this.setState({
        isLoaded: true,
        items: json,
      });
      },1500)
      
    });
  }

  render() {
    var { isLoaded, items} = this.state;
    if(!isLoaded){
      return (
      <div>
          <h1>User(Loading)</h1>
      </div>
    );
    }
    else{
      return(
        <div>
        <h1>Users</h1>
        <div className="mainBorder">
        {
          items.map(item =>(
            <div key = {item.id}>
              <p><strong onMouseEnter={this.handleMouseHover}
                         onMouseLeave={this.handleMouseHover} 
                         className="name"><Tooltip message={this.state.isHovering &&
                 <span >
                  
                 <ul className="box">
                 
                  <li><strong className="dark">Street</strong> {item.address.street}</li>
                  <li><strong className="dark">Suite</strong> {item.address.suite}</li>
                  <li><strong className="dark">City</strong> {item.address.city}</li>
                  <li><strong className="dark">Zip</strong> {item.address.zipcode}</li>
                  </ul>
                  </span> 
              } position={'right'}>{item.name}</Tooltip> </strong><span className="username">({item.username})</span></p>
              
            </div>
          ))
        }
        </div>
      </div>
      );  
    }
  }
}

render(<App />, document.getElementById('root'));
