in current state __/dist/locales/data.json__ will be required

## Handling react-intl
(docs: https://github.com/yahoo/react-intl/wiki)
____________________

Use react-intl components to define i18n phrases.

with .js/.jsx files the babel-plugin will autoextract the translation-ids, but if you use typescripts ts/tsx files you have to compile those files first into js/jsx

in this case use "__npm run languageExtraction__" to extract the used ids into the /dist/locales/data.json, which will hold all the language translations

if you use js/jsx files - run "node mergeTranslations.js" to create the data.json


(used languages are defined in the src/index.jsx ==> addLocaleData(...))

__ /!\ Be carefull /!\ __ : data.json will be overwritten in its current implementation, with the languageExtraction/mergeTranslations-script 