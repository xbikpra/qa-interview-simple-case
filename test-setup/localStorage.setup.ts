import { test as setup } from '@playwright/test'
import { promises as fs } from 'fs'
import { setupDir, setupFile } from '../playwright.config'
import date from 'date-and-time';

export const existingUsers = [
  {
    email: 'test1@mail.com',
    password: 'testPassword!',
    firstName: 'Test1',
    lastName: 'Testsson1',
  },
  {
    email: 'test2@mail.com',
    password: 'testPassword!',
    firstName: 'Test2',
    lastName: 'Testsson2',
  },
  {
    email: 'test3@mail.com',
    password: 'testPassword!',
    firstName: 'Test3',
    lastName: 'Testsson3',
  },
] as const

export const locatorLogin = {
    emailInput: '//*[@id="email"]',
    passwordInput: '//*[@id="password"]',

    fistNameSignup: '//*[@id="firstName"]',
    lastNameSignup: '//*[@id="lastName"]',
    passwordSignup: '//*[@id="password"]',
    emailSignup: '//*[@id="email"]',
    signupLink: '#root > main > div.login > a',

    submitButton: 'form .MuiButton-sizeMedium',
    logoutText: 'text=Log out'
  } as const

setup('localStorage', async () => {
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:8080',
        localStorage: [
          { name: 'users', value: JSON.stringify({ users: existingUsers }) },
        ],
      },
    ],
  }

  await fs.mkdir(setupDir, { recursive: true })
  await fs.writeFile(setupFile, JSON.stringify(storageState, null, 2))
})

function generateDateString(): string {
  const now = new Date();
  return date.format(now, 'dddYYYYMMDDHHmm').toString();

}
export const generateUserData = {
  email: generateDateString()+"@mail.com",
  password: generateDateString()+"@123",
  firstName: generateDateString()+"First",
  lastName: generateDateString()+"Last",
} as const

