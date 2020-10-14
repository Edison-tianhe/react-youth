const render = (vNode, container) => {
    const { tag, children } = vNode;
    const node = document.createElement(tag);
    node.innerText = children;
    container.appendChild(node);
}

export default {
    render
}