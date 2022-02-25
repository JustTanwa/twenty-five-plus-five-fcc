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
      intervalId: undefined
    }
    this.changeLength = this.changeLength.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.ticking = this.ticking.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  
  // select the audio element when component is mounted
  componentDidMount() {
    this.setState({
      audio: document.getElementById("beep"),
    });
  }

  changeLength(e) {
    const btnClick = e.target.id;
    // implementing increase and decrease of length of session and break
    switch(btnClick) {
      case "break-increment":
        // max num and min num condition checks
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
    // set start state - toggling
    this.setState({
      start: !this.state.start,
    });
    // selecting, enabling and disabling increment and decrement button while clock is ticking
    const controlBtns = document.getElementsByClassName('control-btn');
    if (this.state.start) {
      controlBtns.forEach(btn => btn.disabled = true);
    } else {
      controlBtns.forEach(btn => btn.disabled = false);
    }
    // if state is start when button was clicked, start the clock
    if (this.state.start) {
      this.ticking();
      this.intervalId = setInterval(this.ticking, 1000);
    } else {
      clearInterval(this.intervalId);
    }
  }

  ticking() {
    // switching between session and break
    if (this.state.curTimer === "Session" && this.state.timer < 0) {
      this.playSound();
      this.setState({
        timer: this.state.break * 60,
        curTimer: "Break",
      });
    }
    if (this.state.curTimer === "Break" && this.state.timer < 0) {
      this.playSound();
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
    // return functionality for control buttons when reset
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
    });
    // reset audio
    try {
      this.state.audio.pause();
      this.state.audio.currentTime = 0;
    } 
    catch (error) {
      console.log("this is the error: "+ error);
    }
    
  }

  playSound() {
    // play the audio element
    this.state.audio.play();
    // stop sound after 2.5 seconds
    setTimeout(()=>{
      this.state.audio.pause();
      this.state.audio.currentTime = 0;
    }, 2500);
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
          <section className="bottom-controls">
            <button id="start_stop" onClick={this.start}>{this.state.start ? "Play": "Pause"}</button>
            <button id="reset" onClick={this.reset}>Reset</button>
          </section>
          <audio volume="0.5" id="beep" src="https://www.fesliyanstudios.com/play-mp3/4384"></audio>
        </main>
        <footer> Coded by Tanwa Sripan </footer>
      </>
    );
  }
}

export default App;
