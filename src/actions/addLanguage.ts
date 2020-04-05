import { WetLanguage } from "web-ext-translator-shared";

import { State } from "../shared";
import { localeCodeToEnglish } from "../lib/localeCodeToEnglish";
import { setDirty } from "../utils/setDirty";

export interface WetActionAddLanguage {
    type: "ADD_LANGUAGE";
    payload: string;
}

export function handleAddLanguage(state: State, payload: string): State {
    if (!state.extension) return state;
    const extension = { ...state.extension };
    const result = localeCodeToEnglish(payload);
    if (!result.found || extension.languages[payload]) return state;
    const language: WetLanguage = { locale: payload, label: result.name, messages: [], messagesByKey: {} };
    extension.languages = { ...extension.languages, [payload]: language };
    setDirty(state.appBridge, true);
    return { ...state, extension };
}
