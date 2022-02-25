import React from 'react';

export default function Control(props) {
    return (
        <section className="top-controls">
            <div className="break-container">
                <p id="break-label">Break Length</p>
                <button id="break-increment" className="control-btn" onClick={props.onClick}><i className="fas fa-angle-up fa-lg"></i></button>
                <p id="break-length">{props.break}</p>
                <button id="break-decrement" className="control-btn" onClick={props.onClick}><i className="fas fa-angle-down fa-lg"></i></button>
            </div>
            <div className="session-container">
                <p id="session-label">Session Length</p>
                <button id="session-increment" className="control-btn" onClick={props.onClick}><i className="fas fa-angle-up fa-lg"></i></button>
                <p id="session-length">{props.session}</p>
                <button id="session-decrement" className="control-btn" onClick={props.onClick}><i className="fas fa-angle-down fa-lg"></i></button>
            </div>
        </section>
    )
}