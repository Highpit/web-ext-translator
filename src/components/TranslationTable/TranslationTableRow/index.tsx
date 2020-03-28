/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import React from "react";
import { WetMessage, WetLanguage } from "../../../wetInterfaces";
import TranslationEditor from "../TranslationEditor";
import { hashFor } from "../../../utils/getHashFor";
import { TranslationTablePlus } from "../TranslationTablePlus";

interface TranslationTableRowProps {
    className?: string;
    mainLanguage: WetLanguage;
    firstLanguage: WetLanguage | null;
    secondLanguage: WetLanguage | null;
    message: WetMessage;
    showPlus: boolean;
}

function getData(mainLanguage: WetLanguage, mainHash: string, lang: WetLanguage | null, key: string) {
    const message = lang && lang.messagesByKey[key];
    return {
        value: message && message.message || "",
        modified: mainLanguage !== lang && (!message || !message.hash || message.hash !== mainHash)
    };
}

export function TranslationTableRow({ className, message, firstLanguage, secondLanguage, mainLanguage, showPlus }: TranslationTableRowProps) {
    const mainHash = hashFor(message.message);
    const first = getData(mainLanguage, mainHash, firstLanguage, message.name);
    const second = getData(mainLanguage, mainHash, secondLanguage, message.name);
    return <tr className={`translation-table-body__row ${className}`} title={message.description}>
        <td className="translation-table-body__td">{message.name}</td>
        <td className="translation-table-body__td">
            <TranslationEditor value={first.value} messageKey={message.name} placeholders={message.placeholders} locale={firstLanguage && firstLanguage.locale} modified={first.modified} />
        </td>
        <td className="translation-table-body__td">
            <TranslationEditor value={second.value} messageKey={message.name} placeholders={message.placeholders} locale={secondLanguage && secondLanguage.locale} modified={second.modified} />
        </td>
        { showPlus ? <td className="translation-table-body__td"><TranslationTablePlus messageName={message.name} /></td> : null }
    </tr>;
}
