import { WetLanguage, WetAppBridge } from "web-ext-translator-shared";

import { VcsInfo } from "../vcs/VcsProvider";

export interface LoadedExtension {
    firstLocale: string | null;
    secondLocale: string | null;
    languages: { [s: string]: WetLanguage };
    mainLanguage: WetLanguage;
    submitUrl?: string;
    vcsInfo?: VcsInfo;
}

export interface State {
    dialogs: JSX.Element[];
    previewVisible: boolean;
    markdown: string;
    markdownRTL: boolean;
    loading: string;
    extension: LoadedExtension | null;
    webExtensionMode: boolean;
    appBridge: WetAppBridge | null;
}
