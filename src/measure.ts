export type Size = ScrollbarSize & {
    width: number;
    height: number;

};

type ScrollbarSize = {
    scrollbarWidth: number;
    scrollbarHeight: number;
};

export function getScrollbarSize(): ScrollbarSize {
    const node = document.createElement('div');

    node.setAttribute('style', 'width: 100px; height: 100px; position: absolute; top: -1000000px; overflow: scroll;');
    document.body.appendChild(node);

    const scrollbarWidth    = node.offsetWidth - node.clientWidth;
    const scrollbarHeight   = node.offsetHeight - node.clientHeight;

    document.body.removeChild(node);

    return { scrollbarWidth, scrollbarHeight };
}

export function measure(element: HTMLElement): Size {
    return { width: element.offsetWidth, height: element.offsetHeight, ...getScrollbarSize() };
}

export function measureWindow(): Size {
    return { width: window.innerWidth, height: window.innerHeight, ...getScrollbarSize() };
}

export default measure;
