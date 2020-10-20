import Component from './Component';

const createElement = (tag, attrs, ...children) => {
    return {
        tag,
        attrs,
        children
    }
}

export default {
    createElement,
    Component
}