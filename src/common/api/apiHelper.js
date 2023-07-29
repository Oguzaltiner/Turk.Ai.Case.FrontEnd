

const apiHelper = {

    apiSuccess({ result }) {

        var data = result.data; 
        if (data.isSuccess) {
            return ({
                isSuccess: true,
                data: data.data,
                errorMessage: ""
            });
        }else {
            return ({
                isSuccess: false,
                errorMessage: data.message,
                data: null
            });
        }
   
    },
    apiError({ errorMsg }) {
        return ({
            isSuccess: false,
            errorMessage: errorMsg,
            data: null
        });
    },
    objToQueryString({obj}) {
        const keyValuePairs = [];
        for (const key in obj) {

            keyValuePairs.push((key) + '=' + (obj[key]));
        }
        return keyValuePairs.join('&');
    },
}

export default apiHelper;