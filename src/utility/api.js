// Commons admin server
const SERVER = "https://potato.joro.tech";

export const makeApiRequest = async ({
  method,
  endpoint,
  body,
  headers,
  noStringify,
}) => {
  const token = localStorage.getItem("@token");
  let options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
      ...headers,
    },
  };

  if (body !== undefined) {
    options = {
      ...options,
      body: noStringify ? body : JSON.stringify(body),
    };
  }

  const fetchUrl = `${SERVER}${endpoint}`;

  // eslint-disable-next-line no-console
  console.log(`[CALL_API] - ${method} ${fetchUrl}`);
  return fetch(fetchUrl, options);
};

export const callApi = ({
  type,
  method,
  body,
  endpoint,
  onSuccess,
  onFailure,
  headers,
  noStringify,
  requestPayload,
  meta,
}) => async (dispatch) => {
  dispatch({ type: type.request, payload: requestPayload });
  try {
    const res = await makeApiRequest({
      method,
      endpoint,
      body,
      headers,
      noStringify,
    });
    const json = await res.json();
    if (res.status !== 200) {
      throw json;
    }

    // Standing SUCCESS Action
    dispatch({ type: type.success, payload: json, meta });

    // Optional onSuccess Action
    if (onSuccess) {
      onSuccess(json);
    }
  } catch (error) {
    console.info(`[${type.failure}]: ${JSON.stringify(error)}`);
    dispatch({ type: type.failure, payload: error, meta });
    if (onFailure) {
      onFailure(error);
    }
  }
};

// Create three action types for an API call (request, success, failure)
export const apiTypeBuilder = (type) => ({
  request: `${type}/REQUEST`,
  success: `${type}/SUCCESS`,
  failure: `${type}/FAILURE`,
});
