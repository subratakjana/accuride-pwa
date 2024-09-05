import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { ZoneContext } from '@Contexts/ZoneContext';
import { LocaleContext } from '@Contexts/LocaleContext';

export const AuthSubContext = createContext({
    notify: () => null,
    simpleRedirect: () => false,
});

export const AuthSubProvider = (props) => {
    const router = useRouter();
    const { zone } = useContext(ZoneContext);
    const { locale } = useContext(LocaleContext);

    /** Base64 Encoding */
    const Base64Encode = (getStr) => {
        if (getStr) {
            const bufferObjEncode = Buffer.from(getStr, 'utf8');
            const encodedString = bufferObjEncode.toString('base64');
            return encodedString;
        }
        return null;
    };
    /** Base64 Decoding */
    const Base64Decode = (getStr) => {
        if (getStr) {
            const bufferObjDecode = Buffer.from(getStr, 'base64');
            const decodedString = bufferObjDecode.toString('utf8');
            return decodedString;
        }
        return null;
    };

    const toastOptions = {
        toastId: 'accuride',
        autoClose: 5000,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        enableMultiContainer: false,
    };

    const provider = {
        notify: (_message, _type = 'success') => {
            if (_type === 'success') toast.success(_message, toastOptions);
            else if (_type === 'error') toast.error(_message, toastOptions);
            else if (_type === 'warn') toast.warn(_message, toastOptions);
        },
        simpleRedirect: (pagePath) => {
            const zoneLang = `${locale}-${zone}`;
            const asPath = `/${zoneLang}${pagePath}`;
            router.push({
                pathname: `/[zone_lang]${pagePath}`,
                query: {},
            }, (`${asPath}`), { shallow: true });
        },
        encode: (str) => {
            const encodeStr = Base64Encode(str);
            return encodeStr;
        },
        decode: (str) => {
            const decodeStr = Base64Decode(str);
            return decodeStr;
        },
    };

    return (
        <AuthSubContext.Provider value={provider}>
            {props.children}
            <ToastContainer />
        </AuthSubContext.Provider>
    );
};
