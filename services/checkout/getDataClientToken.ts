import axios from "axios"

export const getDataClientToken =async () => {
  const response = await axios.get('https://b9il3r.sse.codesandbox.io/api/tokens');
  return response.data.client_token;
}