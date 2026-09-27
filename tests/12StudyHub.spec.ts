import { test, expect } from '@playwright/test';

test('Get Video Thumbnails API', async ({ request }) => {

    // Request Headers
    const requestHead = {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'https://stage.studyhub2.inoryasoft.com',
        'Referer': 'https://stage.studyhub2.inoryasoft.com/'
    };

    const parabody ={
         courseMaterialIds: [15156, 15114]
    }

    // GET API
    const response = await request.get(
        'https://stage-api.studyhub2.inoryasoft.com/api/CourseContent/GetVideoThumbnails',
        {
            headers: requestHead,

            // Query Parameters
            data: parabody
        }
    );

    // Response Status
    console.log('Status Code:', response.status());

    // Response Headers
    console.log('Response Headers:', response.headers());

    // Response Body
    const responseBody = await response.json();

    console.log('Response Body:', responseBody);

    // Assertions
    expect(response.status()).toBe(200);
    expect(responseBody).toBeTruthy();
});