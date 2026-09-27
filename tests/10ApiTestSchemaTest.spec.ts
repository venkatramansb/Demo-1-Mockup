import {test,expect} from '@playwright/test'
import Ajv from 'ajv';

test ('01 json schema check', async ({request}) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/users/1");

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const Userschema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        address: {
            type: "object",
            properties: {
                street: { type: "string" },
                suite: { type: "string" },
                city: { type: "string" },
                zipcode: { type: "string" },
                geo: {
                    type: "object",
                    properties: {
                        lat: { type: "string" },
                        lng: { type: "string" }
                    },
                    required: ["lat", "lng"]
                }
            },
            required: ["street", "suite", "city", "zipcode", "geo"]
        },
        phone: { type: "string" },
        website: { type: "string" },
        company: {
            type: "object",
            properties: {
                name: { type: "string" },
                catchPhrase: { type: "string" },
                bs: { type: "string" }
            },
            required: ["name", "catchPhrase", "bs"]
        }
    },
    required: [
        "id",
        "name",
        "username",
        "email",
        "address",
        "phone",
        "website",
        "company"
    ]
};

console.log('responseBody is ')
console.log(responseBody)

// const ajv= new Ajv();
// const validate = ajv.compile(Userschema)
// const isValid = validate(responseBody);
// if (!isValid) {
//      console.log(`validate.errors is `);
//     console.log(validate.errors);
// }
// expect(isValid).toBe(true);

const ajv = new Ajv();

const validate = ajv.compile(Userschema);
const isvalidate = validate(responseBody)

if(!isvalidate)
{
    console.log(validate.errors)
}

expect (isvalidate).toBe(true)

});