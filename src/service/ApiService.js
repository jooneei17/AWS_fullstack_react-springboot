import {API_BASE_URL} from "../api-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const access_token = localStorage.getItem("ACCESS_TOKEN");
    if(access_token) {
       headers.append("Authorization", "Bearer " + access_token);
    }

    let options = {
     headers: headers,
     url: API_BASE_URL + api,
     method: method,
    };
    if(request) {
     //Get method
     options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response) => {
     if(response.status === 200) {
         return response.json();
     } else if(response.status === 403){
         window.location.href="/login";
     } else {
         Promise.reject(response);
         throw Error(response);
     }
    }).catch(error => {
     console.log("http error");
     console.log(error)
    })
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO )
        .then((response) => {
            console.log("response : " , response);
            // alert("로그인 토큰: " + response.token);
            localStorage.setItem("ACCESS_TOKEN", response.token);
            window.location.href = "/";
        })
}

export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}