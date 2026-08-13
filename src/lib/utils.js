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
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
export function formatCurrency(amount, currency) {
    if (currency === void 0) { currency = 'USD'; }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
export function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}
export function formatDate(date, options) {
    var d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', __assign({ month: 'short', day: 'numeric', year: 'numeric' }, options)).format(d);
}
export function formatRelativeTime(date) {
    var d = typeof date === 'string' ? new Date(date) : date;
    var now = new Date();
    var diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffInSeconds < 60)
        return 'just now';
    if (diffInSeconds < 3600)
        return "".concat(Math.floor(diffInSeconds / 60), "m ago");
    if (diffInSeconds < 86400)
        return "".concat(Math.floor(diffInSeconds / 3600), "h ago");
    if (diffInSeconds < 604800)
        return "".concat(Math.floor(diffInSeconds / 86400), "d ago");
    return formatDate(d);
}
export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}
export function generateId(length) {
    if (length === void 0) { length = 12; }
    return Math.random().toString(36).substring(2, 2 + length);
}
export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function truncate(str, length) {
    if (length === void 0) { length = 100; }
    if (str.length <= length)
        return str;
    return str.substring(0, length) + '...';
}
export function debounce(fn, delay) {
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { return fn.apply(void 0, args); }, delay);
    };
}
export function throttle(fn, delay) {
    var lastCall = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(void 0, args);
        }
    };
}
export function getInitials(name) {
    return name
        .split(' ')
        .map(function (n) { return n[0]; })
        .join('')
        .toUpperCase()
        .substring(0, 2);
}
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
