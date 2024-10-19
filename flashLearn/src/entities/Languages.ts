export const languages: Language[] = [
    { name: "Bulgarian", code: "BG" },
    { name: "Czech", code: "CS" },
    { name: "Danish", code: "DA" },
    { name: "German", code: "DE",pexelCode:'de-DE'},
    { name: "Greek", code: "EL" },
    { name: "English", code: "EN-GB",pexelCode:'en-US'},
    { name: "Spanish", code: "ES",pexelCode:'es-ES' },
    { name: "Estonian", code: "ET" },
    { name: "Finnish", code: "FI" },
    { name: "French", code: "FR",pexelCode:'fr-FR' },
    { name: "Hungarian", code: "HU" },
    { name: "Indonesian", code: "ID" },
    { name: "Italian", code: "IT",pexelCode:'it-IT' },
    { name: "Japanese", code: "JA" },
    { name: "Korean", code: "KO" },
    { name: "Lithuanian", code: "LT" },
    { name: "Latvian", code: "LV" },
    { name: "Norwegian (Bokmål)", code: "NB" },
    { name: "Dutch", code: "NL" },
    { name: "Polish", code: "PL",pexelCode:'pl-PL' },
    { name: "Portuguese (Brazilian)", code: "PT-BR" },
    { name: "Portuguese (European)", code: "PT-PT" },
    { name: "Romanian", code: "RO" },
    { name: "Russian", code: "RU" },
    { name: "Slovak", code: "SK" },
    { name: "Slovenian", code: "SL" },
    { name: "Swedish", code: "SV" },
    { name: "Turkish", code: "TR" },
    { name: "Ukrainian", code: "UK" },
    { name: "Chinese (simplified)", code: "ZH" }
];

interface Language {
    name: string;
    code: string;
    pexelCode?:string;
}