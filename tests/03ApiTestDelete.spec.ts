import {test,expect} from '@playwright/test'

test ('01 Delete user API', async({request})=>{

    const response = await request.delete('https://jsonplaceholder.typicode.com/users/1')

    console.log(response.status())

    expect (response.status()).toBe(200)
})