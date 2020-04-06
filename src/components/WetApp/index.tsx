import React from "react";
import { useSelector } from "react-redux-nano";

import Toolbar from "../Toolbar";
import MarkdownPreview from "../MarkdownPreview";
import TranslationTable from "../TranslationTable";
import LoadingScreen from "../LoadingScreen";
import MarkdownScreen from "../MarkdownScreen";
import { selectExtension, selectLoading } from "../../redux/extension";
import PortalGoal from "../Portal/PortalGoal";

const welcomeScreenMarkdown = `\
## Welcome!
This tool allows you to translate web-extensions. To get started, try:
- Load a Web-Extension with a Github URL, for example: [https://github.com/lusito/forget-me-not/tree/develop](?gh=https://github.com/lusito/forget-me-not/tree/develop)
- Upload a Web-Extension ZIP file.
- Then you can edit translations, add new languages and export them to a zip file.
- All without registration!

If you are an extension developer, check out the [Github page](https://github.com/Lusito/web-ext-translator) to see how you can enable special support for your extension.
`;

export default () => {
    const loading = useSelector(selectLoading);
    const extension = useSelector(selectExtension);

    return (
        <>
            {loading ? (
                <LoadingScreen label={loading} />
            ) : (
                <>
                    <main>
                        <Toolbar />
                        {extension ? <TranslationTable /> : <MarkdownScreen markdown={welcomeScreenMarkdown} />}
                    </main>
                    <MarkdownPreview />
                </>
            )}
            <PortalGoal id="overlays" />
        </>
    );
};
