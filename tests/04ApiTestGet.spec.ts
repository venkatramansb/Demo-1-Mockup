import {test,expect} from '@playwright/test'
import { stringify } from 'node:querystring';
import { array } from 'node:stream/iter';

test ('01 Get users check', async ({request}) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/users");

    const DataresponeJson = await response.json()

    console.log(await DataresponeJson);

    // 1 validating statusCode
    expect ( response.status()).toBe(200);

    // 2 check whether its an array 
    // 3 length of the array 

    expect(Array.isArray(DataresponeJson)).toBeTruthy();
    expect(DataresponeJson.length).toBe(10)

    // 4 Validate the response json objects

   const firstUser = DataresponeJson[0];
   
   //fieldValidation
   expect(firstUser.id).toBe(1)
   expect(firstUser.name).toBe('Leanne Graham')
   //field Existance validations
   expect(firstUser.name).toBeDefined();
   expect(firstUser.email).toContain('@')

    // 5 Nested Field validations

    expect(firstUser.address).toBeDefined();
    expect(firstUser.address.street).toBe('Kulas Light')
    expect(firstUser.address.city).toBe('Gwenborough')
    expect(firstUser.address.zipcode).toBe('92998-3874')

    for(const uservalue of DataresponeJson)
    {
        expect(uservalue.id).toBeDefined();
        expect(uservalue.name).toBeDefined();
        expect(uservalue.email).toBeDefined();

    }

        //typeof validation
        expect(typeof firstUser.id).toBe('number');
        expect(typeof firstUser.name).toBe('string');
        expect(typeof firstUser.email).toBe('string');

        //not be empty
        expect(firstUser.id).not.toBe('');

   

});