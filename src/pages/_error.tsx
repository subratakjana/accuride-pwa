//import ErrorCustom from '@Components/ErrorCustom';
import dynamic from 'next/dynamic';
const ErrorCustom = dynamic(import('@Components/ErrorCustom'));

const Error = ({ statusCode }) => (
    <>
        {statusCode
            ? (
                // for server error
                <ErrorCustom statusCode={statusCode} message="This page could not be found." />
            ) : (
                // for client
                <ErrorCustom statusCode="" message="An error occurred on client." />
            )}
    </>
);

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
