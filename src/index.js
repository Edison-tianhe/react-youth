import React from './react';
import ReactDOM from './react-dom';

const vNode = (
    <div className="box">
        <div style={{ color: 'red' }}>hello</div>
        <div style={{ color: 'green' }}>world</div>
    </div>
)

ReactDOM.render(vNode, document.querySelector('#custom'));