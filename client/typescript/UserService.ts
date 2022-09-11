class UserService {
    static getFriends = () => new Promise(async (resolve, reject) => {
        try {
            //@ts-ignore
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            resolve(res.data)
        } catch (err) {
            reject(err)
        }
    });
}