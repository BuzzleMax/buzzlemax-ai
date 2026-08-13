import { type NavigateFunction } from 'react-router-dom';
export declare function scrollToHash(hash: string, behavior?: ScrollBehavior): void;
export declare function navigateToHref(navigate: NavigateFunction, href: string, onComplete?: () => void): void;
export declare function normalizeWebsite(value: string): string;
