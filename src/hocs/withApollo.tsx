import memCache from "graphql-hooks-memcache";
import { GraphQLClient } from "graphql-hooks";
import { useRouter } from "next/router";
import { validateZoneLocale } from "@I18n/index";

const WithApollo = () => {
  const router = useRouter();
  const getZoneLang = router.query.zone_lang;
  let getToken = null;
  const LoggerMiddleware = (options, next) => {
    if (typeof window !== "undefined")
      getToken = window.localStorage.getItem("userAuthToken");
    if (
      options.operation.operationName &&
      options.operation.operationName.clientName === "graphCms"
    ) {
      options.client.url = process.env.NEXT_PUBLIC_GRAPHQLCMS_ENDPOINT;
      options.client.removeHeader("Authorization");
      options.client.removeHeader("Content-Currency");
      options.client.removeHeader("Store");
      options.client.removeHeader("X-CSRF-Token");
    } else {
      if (options?.operation?.operationName?.headers?.length > 0) {
        const getHeaderArr = options.operation.operationName.headers;
        getHeaderArr.map((eachHeader) => {
          if (eachHeader.headerName && eachHeader.headerValue) {
            options.client.setHeader(
              eachHeader.headerName,
              eachHeader.headerValue,
            );
          }
          return true;
        });
      }
      options.client.url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

      const zoneDtls = validateZoneLocale(getZoneLang || "en-us");
      if (getToken !== null) {
        options.client.setHeader("Authorization", `Bearer ${getToken}`);
      }

      options.client.setHeader("Content-Currency", zoneDtls.currency);
      options.client.setHeader("Store", zoneDtls.store);
    }
    next();
  };
  const client = new GraphQLClient({
    middleware: [LoggerMiddleware],
    ssrMode: false,
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: memCache(),
  });
  client.mutationsEmitter.setMaxListeners(100);

  const originalRequest = client.request.bind(client);
  client.request = async (query, variables) => {
    try {
      const response = await originalRequest(query, variables);
      if (
        response &&
        response.error &&
        response.error.httpError &&
        response.error.httpError.status === 401
      ) {
        localStorage.removeItem("userAuthToken");
        router.push(`/${router.query.zone_lang}/customer/logout?msg=1`);
      }
      if (response && response.error && response.error.graphQLErrors) {
        if (
          response.error.graphQLErrors[0].message.includes(
            "Could not find a cart with ID",
          ) ||
          response.error.graphQLErrors[0].message.includes(
            "You have been logged out",
          )
        ) {
          localStorage.setItem("cartId", null);
          window.location.reload();
        } else if (
          response.error.graphQLErrors[0].message.includes(
            "The current customer isn't authorized",
          )
        ) {
          localStorage.removeItem("userAuthToken");
          router.push(`/${router.query.zone_lang}/customer/logout?msg=1`);
        }
      }
      return response;
    } catch (error) {
      // console.log('GraphQL Hooks Error', JSON.stringify(error));
    }
  };

  return client;
};

export default WithApollo;
