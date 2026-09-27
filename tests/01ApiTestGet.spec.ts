import {test,expect} from '@playwright/test'

test ('01 Get users check', async ({request}) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/users/TEESTVENKSTES");

    const responeJ = await response.json()

    console.log(await responeJ);

    expect ( response.status()).toBe(200);
});