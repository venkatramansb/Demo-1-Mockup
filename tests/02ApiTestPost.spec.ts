import {test,expect} from '@playwright/test'

test ('01 Post users check', async ({request}) => 
{

    const response = await request.post
    ("https://jsonplaceholder.typicode.com/users",
        {
            data : {
                name : "testuser",
                email : "testUser@example.com"
                }
        })      
    const responeBody = await response.json();

    console.log(await responeBody);

   expect (response.status()).toBe(201)
});