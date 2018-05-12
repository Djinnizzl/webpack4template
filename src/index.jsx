import * as React from 'react'
import { render } from 'react-dom'

import Component from './components/Example'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'

// Our translated strings
import localeData from '../dist/locales/data.json';

addLocaleData([...en, ...de])

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;


import './main.scss'

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
if (!window.intl) {
    require.ensure([
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/de.js',
    ], (require) => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/de.js');
      render(
        <IntlProvider locale={language} messages={messages}>
            <Component />
        </IntlProvider>
        , document.getElementById('app')
    )
    });
  } else {
    render(
        <IntlProvider locale={language} messages={messages}>
            <Component />
        </IntlProvider>
        , document.getElementById('app')
    )
  }

