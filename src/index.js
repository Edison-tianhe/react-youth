import React from './react';
import ReactDOM from './react-dom';

// const vNode = (
//     <div className="box">
//         <div style={{ color: 'red' }}>hello</div>
//         <div style={{ color: 'green' }}>world</div>
//     </div>
// )

// const Home = ({ name }) => {
//     return (
//         <div className="box">
//             <div style={{ color: 'red' }}>{name}</div>
//             <div style={{ color: 'green' }}>world</div>
//         </div>
//     )
// }

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'hello'
        }
    }

    render () {
        return (
            <div className="box">
                <div style={{ color: 'red' }}>{this.state.title}</div>
                <div style={{ color: 'green' }}>world</div>
            </div>
        )
    }
}

ReactDOM.render(<Home name="hello" />, document.querySelector('#custom'));