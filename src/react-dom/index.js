import { getType } from './utils';

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

const _render = (vNode) => {
    // *过滤空节点
    if (!vNode) {
        return false;
    }
    // *过滤字符串或者数字
    if (getType(vNode) === 'Number' || getType(vNode) === 'String') {
        return document.createTextNode(vNode);
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