import React from './react';
import ReactDOM from './react-dom';

const Life = (
    <ul>
        <li>吃饭</li>
        <li>睡觉</li>
        <li>打豆豆</li>
    </ul>
);

const Game = ({ game1, game2 }) => {
    return (
        <ul>
            <li>{game1}</li>
            <li>{game2}</li>
        </ul>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }

    componentDidMount() {
        console.log('组件加载完成');
    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate() {
        console.log('组件更新完成')
    }

    render() {
        return (
            <div className="box">
                <div style={{ color: 'green' }}>{this.props.title}</div>
                <div style={{ color: 'red' }}>{this.state.num}</div>
                <button onClick={this.handleClick}>点我</button>
                {Life}
                <Game game1="崩坏3" game2="原神" />
            </div>
        )
    }
}

ReactDOM.render(<Home title="hello React" />, document.querySelector('#custom'));