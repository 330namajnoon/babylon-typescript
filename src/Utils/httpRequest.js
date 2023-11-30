

export default function httpRequest(method = "GET" || "POST",url = "http://localhost:4000", data = {}, responseType = "false") {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("data",JSON.stringify(data));
        let http = new XMLHttpRequest();
        if (responseType !== "false")
            http.responseType = responseType;
        http.open(method, url, true);
        
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                resolve(http);
            }
        }
        http.send(formData);
    })
}