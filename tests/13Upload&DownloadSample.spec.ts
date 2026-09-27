
import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.skip('Download and verify file size', async ({ page }) => {
  const locator = page.getByRole('button', { name: 'Download' });

  // 1. Wait for the event and click simultaneously using Promise.all
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Note: fixed the typo 'dowload'
    locator.click(),
  ]);

  // 2. Define the path and save the file
  const outputPath = path.join(__dirname, 'downloads', download.suggestedFilename());
  await download.saveAs(outputPath); // Fixed 'savefilte()' to 'saveAs()'

  // 3. Get file stats to check the size
  const stats = fs.statSync(outputPath);
  const fileSizeInBytes = stats.size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

  console.log(`Downloaded file size: ${fileSizeInMB.toFixed(2)} MB`);

  // 4. Assert that the file is larger than 5MB
  expect(fileSizeInMB).toBeGreaterThan(5);


// Upload a single file
await page.locator('#file-upload').setInputFiles('path/to/myfile.pdf');

// Upload multiple files (requires the input element to have the 'multiple' attribute)
await page.locator('#file-upload').setInputFiles([
  'path/to/file1.png',
  'path/to/file2.png'
]);

// Clear/deselect all selected files
await page.locator('#file-upload').setInputFiles([]);


// 1. Start waiting for the file chooser event (Do NOT await here)
const fileChooserPromise = page.waitForEvent('filechooser');

// 2. Click the button that triggers the upload dialog
await page.getByRole('button', { name: 'Upload file' }).click();

// 3. Wait for the dialog to open and resolve the promise
const fileChooser = await fileChooserPromise;

// 4. Set the files on the file chooser object
await fileChooser.setFiles('path/to/myfile.pdf');


});
