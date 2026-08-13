var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function trackChatEvent(event, payload) {
    // Safe console logging in dev only — uses Vite's import.meta.env (browser-safe, no process.env)
    if (import.meta.env.DEV) {
        console.log("[BuzzleMax Analytics] Event: ".concat(event), payload !== null && payload !== void 0 ? payload : {});
    }
    try {
        if (typeof window !== 'undefined') {
            var windowObj = window;
            if (typeof windowObj.gtag === 'function') {
                ;
                windowObj.gtag('event', "chat_".concat(event), __assign({ event_category: 'AI Chatbot' }, payload));
            }
        }
    }
    catch (_a) {
        // Silently ignore analytics dispatcher errors
    }
}
