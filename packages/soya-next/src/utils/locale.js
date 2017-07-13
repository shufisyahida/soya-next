import { parse as parseUrl } from 'url';

export const toPath = (locale, defaultLocale) => {
  if (locale) {
    const localeArr = [];
    const [defaultLanguage, defaultCountry] = defaultLocale.split('-');
    const { country, language } = locale;
    if (language !== defaultLanguage) {
      localeArr.push(language);
    }
    if (country !== defaultCountry) {
      localeArr.push(country);
    }
    if (localeArr.length > 0) {
      return `/${localeArr.join('-')}`;
    }
  }
  return '';
};

export const ensurePath = (url, locale, defaultLocale) => {
  const { pathname } = parseUrl(url);
  const [localeSegment] = pathname.substr(1).split('/');
  if (localeSegment) {
    const [, defaultCountry] = defaultLocale.split('-');
    const [language, country = defaultCountry] = localeSegment.split('-');
    if (language === locale.language && country === locale.country) {
      return url;
    }
  }
  return toPath(locale, defaultLocale) + url;
};

export const trimPath = (url, defaultLocale, siteLocales) => {
  const { pathname } = parseUrl(url);
  const [localeSegment] = pathname.substr(1).split('/');
  if (localeSegment) {
    const [, defaultCountry] = defaultLocale.split('-');
    const [language, country = defaultCountry] = localeSegment.split('-');
    if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
      return url.substr(localeSegment.length + 1);
    }
  }
  return url;
};
