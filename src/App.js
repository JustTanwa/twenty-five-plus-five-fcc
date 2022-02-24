import React from 'react';
import Control from './components/Control';
import { Display } from './components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      curTimer: "Session",
      timeLeft: "25:00",
      start: true,
    }
    this.changeLength = this.changeLength.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.ticking = this.ticking.bind(this);
  }

  changeLength(e) {
    const btnClick = e.target.id;
    switch(btnClick) {
      case "break-increment":
        if (this.state.break >= 60) return;
        this.setState({
          break: this.state.break + 1,
        });
        break;
      case "break-decrement":
        if (this.state.break === 1) return;
        this.setState({
          break: this.state.break - 1,
        });
        break;
      case "session-increment":
        if (this.state.session >= 60) return;
        const incNum = this.state.session + 1;
        this.setState({
          session: incNum,
          timeLeft: incNum < 10 ? "0" + incNum + ":00" : incNum + ":00"
        });
        break;
      case "session-decrement":
        if (this.state.session === 1) return;
        const decNum = this.state.session - 1;
        this.setState({
          session: decNum,
          timeLeft: decNum < 10 ? "0" + decNum + ":00" : decNum + ":00"
        });
        break;
      default: 
        break;
    }
  }

  start() {
    this.setState({
      start: !this.state.start,
    })
    console.log(this.state.start);
    if (this.state.start) this.ticking();
    if (this.state.start) {
      const controlBtns = document.getElementsByClassName('control-btn');
      console.log(controlBtns);
    }
  }

  ticking() {
    const time = this.state.timeLeft.split(":");
    let minutes = parseInt(time[0]);
    let second = parseInt(time[1]);
    if (second == 0) {
      second = 59;
    } else {
      second -= 1;
    }
    console.log(minutes, second)
    const newTime = `${minutes}:${second}`
    this.setState({
      timeLeft: newTime,
    })
    setTimeout(this.ticking, 1000);
  }

  reset() {
    this.setState({
      break: 5,
      session: 25,
      curTimer: "Session",
      timeLeft: "25:00",
      playing: false,
    })
  }

  render() {
    return (
      <>
        <header className="App-header">
          25 + 5 Clock
        </header>
        <main>
          <Control 
            break={this.state.break} 
            session={this.state.session} 
            onClick={this.changeLength}
          />
          <Display 
            curTimer={this.state.curTimer}
            timeLeft={this.state.timeLeft}
          />
          <button id="start_stop" onClick={this.start}>{this.state.start ? "Play": "Pause"}</button>
          <button id="reset" onClick={this.reset}>Reset</button>
        </main>
        <footer> Coded by Tanwa Sripan </footer>
      </>
    );
  }
}

export default App;
