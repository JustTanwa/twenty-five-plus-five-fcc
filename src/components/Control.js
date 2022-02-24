import React from 'react';

export default function Control(props) {
    return (
        <section>
            <div>
                <p id="break-label">Break Length</p>
                <button id="break-increment" className="control-btn" onClick={props.onClick}>&#8593;</button>
                <p id="break-length">{props.break}</p>
                <button id="break-decrement" className="control-btn" onClick={props.onClick}>&#8595;</button>
            </div>
            <div>
                <p id="session-label">Session Length</p>
                <button id="session-increment" className="control-btn" onClick={props.onClick}>&#8593;</button>
                <p id="session-length">{props.session}</p>
                <button id="session-decrement" className="control-btn" onClick={props.onClick}>&#8595;</button>
            </div>
        </section>
    )
}