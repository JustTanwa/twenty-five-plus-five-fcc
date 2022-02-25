import React from 'react';
import Control from './components/Control';
import { Display } from './components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timer: 1500,
      curTimer: "Session",
      timeLeft: "25:00",
      start: true,
      intervalId: undefined,
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
          timer: this.state.timer + 60,
          timeLeft: incNum < 10 ? "0" + incNum + ":00" : incNum + ":00"
        });
        break;
      case "session-decrement":
        if (this.state.session === 1) return;
        const decNum = this.state.session - 1;
        this.setState({
          session: decNum,
          timer: this.state.timer - 60,
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
    const controlBtns = document.getElementsByClassName('control-btn');
    if (this.state.start) {
      controlBtns.forEach(btn => btn.disabled = true);
    } else {
      controlBtns.forEach(btn => btn.disabled = false);
    }
    if (this.state.start) {
      console.log("start");
      this.ticking();
      this.intervalId = setInterval(this.ticking, 1000);
    } else {
      console.log("pause")
      clearInterval(this.intervalId);
    }
  }

  ticking() {
    let timer;
    if (this.state.curTimer === "Session" && this.state.timer < 0) {
      this.setState({
        timer: this.state.break * 60,
        curTimer: "Break",
      });
    }
    if (this.state.curTimer === "Break" && this.state.timer < 0) {
      this.setState({
        timer: this.state.session * 60,
        curTimer: "Session",
      });
    }

    let seconds = this.state.timer % 60;
    let minutes = Math.floor(this.state.timer / 60) % 60;
    // formatting the numbers for leading zero
    if (seconds === 0 || seconds < 10) {seconds = `0${seconds}`};
    if (minutes < 10) {minutes = `0${minutes}`};
    this.setState({
      timer: this.state.timer - 1,
      timeLeft: `${minutes}:${seconds}`
    });
  }

  reset() {
    // if interval exists clear it
    if (this.intervalId) clearInterval(this.intervalId);
    // make all buttons works
    const controlBtns = document.getElementsByClassName('control-btn');
    controlBtns.forEach(btn => btn.disabled = false);
    // reset all states
    this.setState({
      break: 5,
      session: 25,
      timer: 1500,
      curTimer: "Session",
      timeLeft: "25:00",
      start: true,
      intervalId: undefined,
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
