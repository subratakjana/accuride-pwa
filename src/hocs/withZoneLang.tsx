import { LocaleProvider } from '@Contexts/LocaleContext';
import { ZoneProvider } from '@Contexts/ZoneContext';

const withZoneLang = (WrappedPage) => {
    /*
    * condition to check the locale & zone is defined or not
    * if required to use, use inside the ZonLangValidator
    */
    const ZonLangValidator = ({ zone, ...pageProps }) => {
        return (
            <ZoneProvider zone="us">
                <LocaleProvider locale="en">
                    <WrappedPage {...pageProps} />
                </LocaleProvider>
            </ZoneProvider>
        );
    };

    ZonLangValidator.displayName = `withZoneLocale(${WrappedPage.name})`;

    return ZonLangValidator;
};
export default withZoneLang;
