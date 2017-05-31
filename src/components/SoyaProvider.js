import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Cookies, CookiesProvider } from 'react-cookie';
import { localeShape, urlShape } from '../constants/types';

class SoyaProvider extends React.Component {
  static propTypes = {
    store: storeShape.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
  };

  static childContextTypes = {
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
    url: urlShape,
  };

  getChildContext() {
    return {
      defaultLocale: this.props.defaultLocale,
      siteLocales: this.props.siteLocales,
      locale: this.props.locale,
      url: this.props.url,
    };
  }

  render() {
    return (
      <CookiesProvider cookies={this.props.cookies}>
        <Provider store={this.props.store}>
          {React.Children.only(this.props.children)}
        </Provider>
      </CookiesProvider>
    );
  }
}

export default SoyaProvider;
