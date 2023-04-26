const { defineConfig, devices } = require('@playwright/test');
import path from 'path';
require('dotenv').config();

// const authFile = path.join(__dirname,'.auth/user.json');
const authFile = ('/Users/sbordo/Documents/Software Learning/Playwright/playwright-best-practices/.auth/user.json');
export { authFile };

export default defineConfig({
//-------------------------------
// Default config settings
//--------------------------------
  testDir: 'tests',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://bookcart.azurewebsites.net',
    trace: 'on-first-retry',
    headless: false,
		contextOptions: {
			ignoreHTTPSErrors: true
		}
  },

  //----------------------------------
	// Different Projects/Environments
	//----------------------------------
	projects: [
		//--------------------------------------
		// SETUP PROJECT
		//--------------------------------------
		{
      name: 'setup',
      testMatch: 'login.spec.js',
      use: {
         ...devices['Desktop Chrome'] 
      },
    },
    //--------------------------------------
		// E2E PROJECT
		//--------------------------------------
    {
      name: 'e2e',
      testMatch: 'category-list.spec.js',
      use: {
         ...devices['Desktop Chrome'],
         storageState: authFile,
      },
      dependencies: ['setup'],
      retries: 1,
    },
  ]
});

