/** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template */
export function createElement(html: string, ...childNodes: HTMLElement[]) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    const res = template.content.firstChild as HTMLElement;
    if (childNodes) {
        res.append(...childNodes);
    }
    return res;
}

export function createElementByTag(
    tag: string,
    ...classes: string[]
): HTMLElement {
    const elem = document.createElement(tag);
    elem.classList.add(...classes);
    return elem;
}
