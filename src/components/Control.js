import React from 'react';

export default function Control(props) {
    return (
        <section>
            <div>
                Break Length
                <button id="break-increment" onClick={props.onClick}>&#8593;</button>
                <p>{props.break}</p>
                <button id="break-decrement" onClick={props.onClick}>&#8595;</button>
            </div>
            <div>
                Session Length
                <button id="session-increment" onClick={props.onClick}>&#8593;</button>
                <p>{props.session}</p>
                <button id="session-decrement" onClick={props.onClick}>&#8595;</button>
            </div>
        </section>
    )
}