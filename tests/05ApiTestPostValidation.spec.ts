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
    const dataResponeBody = await response.json();

    console.log(await dataResponeBody);

    expect (response.status()).toBe(201)

   
    expect(dataResponeBody.id).toBeDefined();
    expect(typeof dataResponeBody.id).toBe('number');
   


    expect(dataResponeBody.email).not.toBe('');
    expect(dataResponeBody.email).toContain('@');

    expect(dataResponeBody.id).toBe(11);
    expect(dataResponeBody.email).toBe('testUser@example.com');
    expect(dataResponeBody.name).toBe('testuser');
    expect(dataResponeBody.name).toMatch(/testuser/i);



});