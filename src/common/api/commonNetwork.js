
import apiHelper from "./apiHelper";
import axios from "axios";


const commonNetwork = {
  get: async function (method, params) {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    var queryString = "";
    if (params) {
      queryString = "/?" + apiHelper.objToQueryString({ obj: params });
    }
    const url = apiUrl + method + queryString;
    console.log("url",url);

    const response = await axios.get(url);
    console.log("response",response);

    return apiHelper.apiSuccess({ result: response });

  },
  post: async function (method, obj) {
    const URL =   process.env.REACT_APP_BASE_URL + method;
    const response = await axios.post(
      URL, obj
    );
    return apiHelper.apiSuccess({ result: response });
  },
}

export default commonNetwork;