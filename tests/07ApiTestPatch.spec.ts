import {test,expect} from '@playwright/test'

test ('01 put users check', async({request})=>{

    const response = await request.patch('https://jsonplaceholder.typicode.com/users/1',
        {
            data:{
                "email": "UpdatedSincere@april.biz",
            }
        }
    )

    // const responseBody = await response.json();

    // console.log(responseBody)
    // console.log(response.status())
    // expect(response.status()).toBe(200);

    const dataResponseJson = await response.json();

    console.log(dataResponseJson)
    expect(response.status()).toBe(200);
    
    expect(dataResponseJson.name).toBeDefined();
    expect(dataResponseJson.username).toBeDefined();
    expect(dataResponseJson.email).toBeDefined();

    expect(typeof dataResponseJson.name).toBe('string');
    expect(typeof dataResponseJson.username).toBe('string');
    expect(typeof dataResponseJson.email).toBe('string');

    expect(dataResponseJson.name).toBe('Leanne Graham');
    expect(dataResponseJson.username).toBe('Bret');
    expect(dataResponseJson.email).toBe('UpdatedSincere@april.biz');
    expect(dataResponseJson.id).toBe(1);


    expect(dataResponseJson.email).toContain('@');

    //object validate
    expect(typeof dataResponseJson).toBe('object');

    
})
    