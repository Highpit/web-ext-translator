import { State } from "../State";

export interface WetActionHideDialog {
    type: "HIDE_DIALOG";
    payload: string;
}

export function handleHideDialog(state: State, payload: string): State {
    return { ...state, dialogs: state.dialogs.filter((d) => d.key !== payload) };
}
