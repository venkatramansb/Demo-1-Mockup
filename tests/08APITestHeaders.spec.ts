import{test, expect} from '@playwright/test'

test.skip('01 headers', async({request})=>{

    const requestHead ={
      'content-Type':'applicationjson',
      'Accept':'application/json'  
    }

    const response = await request.post('https://jsonplaceholder.typicode.com/users',
        {
            headers: requestHead,
            data: {
                name: 'Venkat Graham',
                email: 'testUser@example.com',
            }
        }
    )

    const dataResponseBody = await response.json()

    //headers and body printed
    console.log('Response Body')
    console.log(dataResponseBody)

    console.log('Response headers')
    console.log(response.headers())

    //validate
    expect(response.headers()['content-type']).toBeDefined();
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['content-type']).toBeDefined();

    expect(response.headers()['connection']).toBeDefined();

    console.log('response Connection');
    console.log(response.headers()['connection']);

    
    
})