import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux-nano";

import { getParameter } from "../../utils/getParameter";
import { importVcs } from "../../vcs/importVcs";
import AlertDialog from "../Dialogs/AlertDialog";
import { setLoading, loadExtension, LoadExtensionData } from "../../redux/extension";
import { setDirty } from "../../utils/setDirty";
import { useAppBridge } from "../../AppBridge";

export default () => {
    const appBridge = useAppBridge();
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();
    const setLoadingMessage = (message: string) => dispatch(setLoading(message));
    const onSuccess = (data: LoadExtensionData) => {
        dispatch(loadExtension(data));
        setDirty(appBridge, false);
    };

    useEffect(() => {
        const gh = getParameter("gh");
        gh && importVcs(gh, setLoadingMessage, onSuccess, setAlertMessage);
    }, []);

    return !alertMessage ? null : (
        <AlertDialog title="Something went wrong!" message={alertMessage} onClose={() => setAlertMessage("")} />
    );
};
