import { getType } from './utils';
import React from '../react';

const setAttribute = (dom, key, value) => {
    if (key === 'className') {
        dom.setAttribute('class', value);
        return false;
    }

    if (/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = value || '';
        return false;
    }

    if (key === 'style') {
        if (!value || getType(value) === 'String') {
            dom.style.cssText = value || '';
        } else if (value && getType(value) === 'Object') {
            for (let k in value) {
                if (getType(value[k]) === 'Number') {
                    dom.style[k] = value[k] + 'px';
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
        return false;
    }

    if (key in dom) {
        dom[key] = value || '';
        return false;
    }

    if (value) {
        dom.setAttribute(key, value);
    } else {
        dom.removeAttribute(key);
    }
}


const setVNodeAttrs = (vNode, attrs) => {
    Object.keys(attrs).forEach((key) => {
        const value = attrs[key];
        setAttribute(vNode, key, value);
    })
}

const render = (vNode, container) => {
    return container.appendChild(_render(vNode));
}

export const renderComponent = (com) => {
    // *储存当前render出来的dom节点
    let $node = null;
    
    const initRender = com.render();
    $node = _render(initRender);
    if (!com.$node && com.componentDidMount) {
        com.componentDidMount();
    }
    // *state更新 替换节点
    if (com.$node && com.$node.parentNode) {
        com.$node.parentNode.replaceChild($node, com.$node);
        if (com.componentDidUpdate) {
            com.componentDidUpdate();
        }
    }
    com.$node = $node;
    return com;
}

const createComponent = (com, props) => {
    let init = null;
    if (com.prototype?.render) { // * 类组件
        init = renderComponent(new com(props));
    } else { // *函数组件
        init = new React.Component(props);
        init.constructor = com;
        init.render = () => init.constructor(props);
        init.$node = _render(init.render())
    }
    return init;
}

const _render = (vNode) => {
    // *过滤字符串或者数字
    if (getType(vNode) === 'Number' || getType(vNode) === 'String') {
        return document.createTextNode(vNode);
    }
    // *过滤空节点
    if (!vNode) {
        return false;
    }
    // *过滤函数组件
    if (getType(vNode.tag) === 'Function') {
        return createComponent(vNode.tag, vNode.attrs).$node
    }

    const { tag, attrs, children } = vNode;

    if (tag) {
        const node = document.createElement(tag);
        if (attrs) {
            setVNodeAttrs(node, attrs);
        }
        children.forEach((child) => render(child, node));
        return node;
    }

    return document.createTextNode('[Object Object]');
}

export default {
    render(vnode,container) {
        container.innerHTML = '';
        render(vnode,container);
    }
}