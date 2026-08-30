export function htmlToText(html) {
    if (!html) return '';
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim();
}

export function truncate(text, length = 160) {
    if (!text || text.length <= length) return text;
    return text.slice(0, length - 1).trimEnd() + '…';
}
