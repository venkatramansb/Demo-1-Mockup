import {test as base, Page} from '@playwright/test' 


type myFixture = {

    loginPageSuccess:Page,
}


export const test =  base.extend<myFixture>({

   loginPageSuccess: async({page}, use)=>{
    await page.goto('');
    const myDay= await page.locator('').click();

    await use(page);

    await page.close();


    //ensure success

   } 

   
});

