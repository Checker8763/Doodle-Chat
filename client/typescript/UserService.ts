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