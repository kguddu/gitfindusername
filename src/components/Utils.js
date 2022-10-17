import axios from 'axios'

const github= axios.create({
    baseURL:"https://api.github.com/users",
    timeOut:15000
})

export {github};