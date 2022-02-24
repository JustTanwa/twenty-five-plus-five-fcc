import React from 'react';

export const Display = (props) => {
    return (
        <section className="display">
            <p id="timer-label">{props.curTimer}</p>
            <p id="time-left">{props.timeLeft}</p>
        </section>
        
    )
}