export function scrollToHash(hash, behavior) {
    if (behavior === void 0) { behavior = 'smooth'; }
    if (typeof window === 'undefined')
        return;
    var normalizedHash = hash.startsWith('#') ? hash : "#".concat(hash);
    var element = document.querySelector(normalizedHash);
    if (!element)
        return;
    window.requestAnimationFrame(function () {
        element.scrollIntoView({ behavior: behavior, block: 'start' });
        if (window.location.hash !== normalizedHash) {
            window.history.replaceState(null, '', normalizedHash);
        }
    });
}
export function navigateToHref(navigate, href, onComplete) {
    if (href.startsWith('mailto:')) {
        window.location.href = href;
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        return;
    }
    if (href.startsWith('/#')) {
        var _a = href.split('#'), _b = _a[1], hash = _b === void 0 ? '' : _b;
        navigate("/".concat(hash ? "#".concat(hash) : ''));
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        return;
    }
    if (href.startsWith('#')) {
        scrollToHash(href);
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        return;
    }
    navigate(href);
    onComplete === null || onComplete === void 0 ? void 0 : onComplete();
}
export function normalizeWebsite(value) {
    var trimmedValue = value.trim();
    if (!trimmedValue)
        return '';
    if (/^https?:\/\//i.test(trimmedValue)) {
        return trimmedValue;
    }
    return "https://".concat(trimmedValue);
}
