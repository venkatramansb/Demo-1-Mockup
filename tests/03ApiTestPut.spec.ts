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

    const responseBody = await response.json();

    console.log(responseBody)
    console.log(response.status())
    expect(response.status()).toBe(200);
    
})
    