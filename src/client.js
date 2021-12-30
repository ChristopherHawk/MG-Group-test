// Environment Variables
const {REACT_APP_ENPOINT, REACT_APP_TOKEN} = process.env;
//Headers
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const headersPost = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}
if (REACT_APP_TOKEN) {
  headers.Authorization = `Bearer ${REACT_APP_TOKEN}`
  headersPost.Authorization = `Bearer ${REACT_APP_TOKEN}`
}
// Asynchronous Function
export const fetchData = async (uri) => {
  try {
    const responseAPI = await fetch(
      `${REACT_APP_ENPOINT}${uri}`, {
      method: 'GET',
      headers
    })
    if (responseAPI.status === 401) {
      localStorage.setItem("tokenApp", "");
      alert("Token invalido o expirado.");
      window.location.reload();
    }
    return responseAPI.json();
  } catch (error) {
     console.log(error)
  }  
};
//Post 
export const multiFetch = async (uri, method, urlencoded) => {
  try {
    const responseAPI = await fetch(
      `${REACT_APP_ENPOINT}${uri}`, {
        method: method,
        headers: method !== 'DELETE'?headersPost: headers,
        body: method !== 'DELETE'? urlencoded:null
    })
    if (responseAPI.status === 401) {
      localStorage.setItem("tokenApp", "");
      alert("Token invalido o expirado.");
      window.location.reload();
    }
    if(method === 'DELETE') return responseAPI;
    return responseAPI.json();
  } catch (error) {
     console.log(error)
  }  
};




