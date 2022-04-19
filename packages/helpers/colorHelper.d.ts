import { Rgba } from 'layouts-builder/interface/internalType';
/**
 * validate if a string is a json
 *
 *
 * @param item
 *
 * @returns
 */
export declare const isJson: (item: string) => boolean;
/**
 *
 * @param hex
 * @param alpha
 * @returns
 */
export declare const hexToRGBA: (hex: string, alpha?: number | undefined) => Rgba | null;
/**
 *
 * @param color
 * @returns
 */
export declare function RgbaToString(color: Rgba | null): string;
/**
 * this does not handle % alpha
 *
 * @param color
 * @returns
 */
export declare function stringToRgba(color: string): Rgba | null;
export declare function getRgbaViaString(color: string): Rgba | null;
/**
 *
 * @param color
 * @returns
 */
export declare function RgbaToHex(color: string | Rgba): string | null;
/**
 * function to test if the string is url (begin with https or http) then with ://
 *
 * @param {String} url
 * @returns
 */
export declare const isValidUrl: (url: string) => boolean;
export declare const isSecuredUrl: (url: string) => boolean;
export declare const isValidPathUrl: (urlPath: string) => boolean;
/**
 * Check if valid email address.
 * @param email Email address to validate
 * @returns true: valid email, false: invalid email
 */
export declare function isValidEmail(email: string): boolean;
