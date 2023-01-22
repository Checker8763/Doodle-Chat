//@ts-ignore
const client = new PocketBase('http://127.0.0.1:8090');

console.log(client)

const config = {
    url: "https://jsonplaceholder.typicode.com/users"
}

class UserService {
    static getFriends = () => new Promise(async (resolve, reject) => {
        try {
            //@ts-ignore
            const res = await axios.get(config.url)
            resolve(res.data)
        } catch (err) {
            reject(err)
        }
    });
}