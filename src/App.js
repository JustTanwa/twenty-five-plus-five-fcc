import React from 'react';
import Control from './components/Control';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
    }
    this.changeLength = this.changeLength.bind(this);

  }

  changeLength(e) {
    const btnClick = e.target.id;
    switch(btnClick) {
      case "break-increment":
        this.setState({
          break: this.state.break + 1,
        });
        break;
      case "break-decrement":
        this.setState({
          break: this.state.break - 1,
        });
        break;
      case "session-increment":
        this.setState({
          session: this.state.session + 1,
        });
        break;
      case "session-decrement":
        this.setState({
          session: this.state.session - 1,
        });
        break;

    }
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
       25 + 5 Clock
      </header>
      <Control 
        break={this.state.break} 
        session={this.state.session} 
        onClick={this.changeLength}
      />
    </div>
  );
    }
}

export default App;
