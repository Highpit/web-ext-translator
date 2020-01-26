/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import { EditorConfigSectionProps } from "./utils/editorConfig";

export enum WetMessageType {
    GROUP,
    COMMENT,
    MESSAGE
}

export interface WetMessage {
    type: WetMessageType;
    name: string;
    message: string;
    description?: string;
    placeholders?: WetPlaceholder[];
    hash?: string;
}

export interface WetLanguage {
    locale: string;
    label: string;
    messages: WetMessage[];
    messagesByKey: { [s: string]: WetMessage };
    editorConfig?: EditorConfigSectionProps;
}

export interface WetPlaceholder {
    name: string;
    content: string;
    example?: string;
}

export const WET_PROTOCOL_VERSION = 1;

export interface MessagesFile {
    locale: string;
    content: string;
}

export interface MessagesListResult {
    files: (MessagesFile[]) | null;
    manifest: string;
    error: string | null;
}

export interface WetAppBridge {
    loadMessagesList(): MessagesListResult;
    saveMessagesList(list: MessagesFile[]): string | null;
    setDirty(dirty: boolean): void;
    openDirectory(): boolean;
    openBrowser(url: string): void;
    consoleProxy(method: string, message: string, stack: string | null): void;
}

declare global {
    interface Window {
        wet: {
            version: string;
            protocolVersion: number;
            setBridge(bride: WetAppBridge): void;
            searchNext(text: string, force: boolean): void;
            searchPrev(text: string): void;
        };
    }
}
