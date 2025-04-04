import { test, expect } from '@playwright/test'
import { locatorLogin } from '../../test-setup/localstorage.setup'
import { generateUserData } from '../../test-setup/localstorage.setup'

const BASE_URL = 'http://localhost:8080/login'

test.describe.configure({ mode: 'serial' })

test.describe('Sign-up Page Testing', () => {
  const signupLocator = locatorLogin;
  const user = generateUserData;
  test('Sign-Up: Successfully Registration Of An User', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.click(signupLocator.signupLink)

    await page
      .locator(signupLocator.fistNameSignup)
      .fill((user.firstName))

    await page
      .locator(signupLocator.lastNameSignup)
      .fill((user.lastName))

    await page
      .locator(signupLocator.emailSignup)
      .fill((user.email))

    await page
      .locator(signupLocator.passwordSignup)
      .fill((user.password))

    // Submit button
    const button = page.locator(signupLocator.submitButton)
    await button.click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    await expect(page.getByText('Log out')).toBeVisible()
  });
  test('Sign-Up: Email Field Is Missing The @ Character', async ({ page }) => {
    const invalidEmailId = "thisisaninvalidemailid.com";

    await page.goto(BASE_URL)
    await page.click(signupLocator.signupLink)

    await page
      .locator(signupLocator.fistNameSignup)
      .fill((user.firstName))

    await page
      .locator(signupLocator.lastNameSignup)
      .fill((user.lastName))

    await page
      .locator(signupLocator.emailSignup)
      .fill((invalidEmailId))

    await page
      .locator(signupLocator.passwordSignup)
      .fill((user.password))

    // Verify Submit button should be disabled.
    await expect(page.locator(signupLocator.submitButton)).toBeDisabled()
  });
  test('Sign-Up: Password Field Should Have Minimum 9 Character To Proceed', async ({ page }) => {
    const invalidPassword = "iam8char";

    await page.goto(BASE_URL)
    await page.click(signupLocator.signupLink)

    await page
      .locator(signupLocator.fistNameSignup)
      .fill((user.firstName))

    await page
      .locator(signupLocator.lastNameSignup)
      .fill((user.lastName))

    await page
      .locator(signupLocator.emailSignup)
      .fill((user.email))

    await page
      .locator(signupLocator.passwordSignup)
      .fill((invalidPassword))

    // Verify Submit button should be disabled.
    await expect(page.locator(signupLocator.submitButton)).toBeDisabled()
  })
})
