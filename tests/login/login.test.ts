import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { locatorLogin } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })
const BASE_URL = 'http://localhost:8080/login'

test.describe('login form tests', () => {
  test('Login: Logging in works with existing account', async ({ page }) => {
    const existingUser = existingUsers[0]
    const loginLocator = locatorLogin

    await page.goto(BASE_URL)

    await page
      .locator(loginLocator.emailInput)
      .fill(existingUser.email)

    await page
      .locator(loginLocator.passwordInput)
      .fill(existingUser.password)

    // Submit button
    const button = page.locator(loginLocator.submitButton)
    // Click on the button
    await button.click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    await expect(page.getByText('Log out')).toBeVisible()
  })
})

/** -------Improved the code as mentioned below------
 * 1. Used fill() method instead of pressSequentially(). fill() method is
 * cleaner, faster and self-explanatory
 * 2. I used constant for selector/locator instead of raw data.
 * It will improve  readability and maintainability in long run
 * 3. Added http:// to the URI to prevents issues with relative paths.
 * Always use the absolute path
 * 4. Added await before clicking on the button.
 *
 *----Optional Improvement-----
 * --> We could improve by removing unnecessary wait i.e waitForTimeout since,
 * we already used expect().toBeVisible method
 * --> We could improve by encrypting the password using base64 encryption on
 * localStorage.setup.ts file and decrypt it while using on the test
 */