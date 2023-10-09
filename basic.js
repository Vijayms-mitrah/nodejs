const axios = require("axios");

// axios.get("http://15.206.45.217:8080/AavinProductCollection/getAllProductCollection")
// .then((res)=>{
//     console.log("response", res.data);
// })
// .catch((err)=>{
//     console.log("error", err);
// })

// axios.get("http://15.206.45.217:8080/AavinSociety/getAllSociety")
// .then((res)=>{console.log("response456", res.data)})
// .catch((err)=>console.log("error 2", err))

// const url = 'http://15.206.45.217:8080/AavinProductCollection/getAllProductCollection'

// const apiRequest = axios.get(url)

// apiRequest
// .then((res)=>{
//     console.log("response", res.data);
// })
// .catch((err)=>{
//     console.log("error", err);
// })

// const combinedAPI = async() => {
//     let response1 = null
//     let response2 = null
//     await axios.get("http://15.206.45.217:8080/AavinSociety/getAllSociety")
//     .then((res)=>{
//         response1 = res.data
//     })
//     .catch((err)=>{
//         console.log("err:", err);
//     })
//     await axios.get("http://15.206.45.217:8080/AavinProductCollection/getAllProductCollection")
//     .then((res)=>{
//         response2 = res.data
//     })
//     .catch((err)=>{
//         console.log("err:", err);
//     })
//     console.log("responses", response1, "res12345678", response2)
// }

const combinedAPI = async () => {
  try {
    const [api1, api2] = await Promise.all([
      axios.get(
        "http://15.206.45.217:8080/AavinProductCollection/getAllProductCollection",
      ),
      axios.get("http://15.206.45.217:8080/AavinSociety/getAllSociety"),
    ]);

    const result = {
      response1: api1.data,
      response2: api2.data,
    };
    console.log("result", result);
    return result;
  } catch (err) {
    console.log("error123", err);
    throw err;
  }
};

console.log("combinedAPI", combinedAPI());
