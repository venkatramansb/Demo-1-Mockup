import {test,expect} from '@playwright/test'

test ('01 put users check', async({request})=>{

    const response = await request.put('https://jsonplaceholder.typicode.com/users/1',
        {
            data:{
                "name": "Updated Leanne Graham",
                "username": "Updated Bret",
                "email": "Updated Sincere@april.biz",
            }
        }
    )

    const dataResponseJson = await response.json();

    console.log(dataResponseJson)
    expect(response.status()).toBe(200);
    
    expect(dataResponseJson.name).toBeDefined();
    expect(dataResponseJson.username).toBeDefined();
    expect(dataResponseJson.email).toBeDefined();

    expect(typeof dataResponseJson.name).toBe('string');
    expect(typeof dataResponseJson.username).toBe('string');
    expect(typeof dataResponseJson.email).toBe('string');

    expect(dataResponseJson.name).toBe('Updated Leanne Graham');
    expect(dataResponseJson.username).toBe('Updated Bret');
    expect(dataResponseJson.email).toBe('Updated Sincere@april.biz');
    expect(dataResponseJson.id).toBe(1);


    expect(dataResponseJson.email).toContain('@');

    //object validate
    expect(typeof dataResponseJson).toBe('object');
})
    