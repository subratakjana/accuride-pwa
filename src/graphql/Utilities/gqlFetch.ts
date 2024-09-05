const gqlFetch = async (
  gqlTagQuery,
  variables = null,
  endpoint,
  zone = "en-us",
  token = null,
) => {
  let url;
  if (endpoint === "CMS") {
    url = process.env.NEXT_PUBLIC_GRAPHQLCMS_ENDPOINT;
  } else if (endpoint === "MAGENTO") {
    url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  }
  if (token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "content-currency": zone === "en-us" ? "usd" : "cad",
          store: zone === "en-us" ? "default" : "canada",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: gqlTagQuery.loc.source.body, variables }),
      });
      const json = await res.json();
      return json;
    } catch (error) {
      console.log('err', error);
    }
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "content-currency": zone === "en-us" ? "usd" : "cad",
        store: zone === "en-us" ? "default" : "canada",
      },
      body: JSON.stringify({ query: gqlTagQuery.loc.source.body, variables }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log('err', error)
  }
};

export default gqlFetch;
