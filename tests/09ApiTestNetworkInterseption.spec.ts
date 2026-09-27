import{test,expect} from '@playwright/test'
import dotenv from 'dotenv'
import path from 'node:path'


test.skip ('01 Network Interception', async ({page}) => {

    await page.route('**/products.json', async(route) => {

        
        const req = route.request();

        console.log('url:',req.url())
        console.log('method:',req.method())
        console.log('headers:', req.headers());
        console.log('Product API intersepted');


        //   const mockUsers = [
        //     { id: 1, name: 'Alice Johnson' },
        //     { id: 2, name: 'Mark Daniels' }
        //     ];

        await route.continue();

    })
    

    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');
    await page.waitForTimeout(5000);

 
})

// continue
// abort
// fullfill
// page.route()


test.skip ('02 Network Interseption completly abort', async ({page}) => {

    await page.route('**/products.json', async(route) => {

        console.log('Product API intersepted');
        await route.abort();



    })
    

    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');
    await page.waitForTimeout(5000);
})

// continue
// abort
// fullfill
// page.route()

test.skip ('03 Network Interseption checking partial items SLICE', async ({page}) => {

    await page.route('**/products.json', async(route) => {


        //first fetch, and slice to required

        const responseFromLive = await route.fetch();
        const responseFromLiveJson = await responseFromLive.json();

        console.log(responseFromLiveJson);

        console.log('TOTAL RECEIVED length', responseFromLiveJson.products.length);

        const totalReceivedLength = await responseFromLiveJson.products.length;

        console.log('Product API intersepted ');

        responseFromLiveJson.products =  responseFromLiveJson.products.slice(0,3);

        await route.fulfill(
            {
                response: responseFromLive,
                body: JSON.stringify(responseFromLiveJson)
            }

        );



    })
    

    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');
    await page.waitForTimeout(5000);
})


test ('04 retry Network Interception', async ({page})=> {

    await page.route('**/products.json', async (route) => {

        const response = await route.fetch();
        const responeBody = await response.json();

        console.log(`Network Intercepted Successfully`)

        console.log(response)
        console.log(`responeBody.length is ${responeBody.products.length}`)
        console.log(`this is the status code: ${response.status()}`)

        responeBody.products = await responeBody.products.slice(0,5);



        await route.fulfill ({

                 response: response,
                 body: JSON.stringify(responeBody)

            })
    } );

    //await page.goto('https://react-shopping-cart-67954.firebaseapp.com/')
     await page.goto('/');
    await page.waitForTimeout(5000)


console.log('baseURL: verified to this', process.env.BASE_URL);
});

test.describe.parallel('01 @smoke', () => {

    test('01 test',async({page}) => {

        await page.goto('/');

    })

})