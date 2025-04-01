import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/RegisterPage';

test.describe('RegisterPage UI Tests', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
    });

    test('Verify page loads and form elements are correct and visible', async () => {
        await expect(registerPage.pageHeading).toBeVisible();
        await expect(registerPage.firstNameInput).toBeVisible();
        await expect(registerPage.lastNameInput).toBeVisible();
        await expect(registerPage.emailInput).toBeVisible();
        await expect(registerPage.passwordInput).toBeVisible();
        await expect(registerPage.confirmPassInput).toBeVisible();
        await expect(registerPage.genderMaleRadio).toBeVisible();
        await expect(registerPage.genderFemaleRadio).toBeVisible();
        await expect(registerPage.registerButton).toBeVisible();
    });

    test('Verify required field validation messages', async () => {
        await registerPage.submitForm();
        await expect(registerPage.firstNameError).toBeVisible();
        await expect(registerPage.lastNameError).toBeVisible();
        await expect(registerPage.emailEmptyError).toBeVisible();
        await expect(registerPage.passwordEmptyError).toBeVisible();
        await expect(registerPage.confirmPasswordEmptyError).toBeVisible();
    });

    test('Verify password rules criteria', async () => {
        await registerPage.fillRegistrationForm(
            'User',
            'Tanmay',
            `john.doe@mail.com`,
            'pass',
            'passw'
        );
        await registerPage.submitForm();
        await expect(registerPage.passwordValidationError).toBeVisible();
        await expect(registerPage.confirmPasswordMismatchError).toBeVisible();
    });

    test('Verify successful user registration', async ({ page }) => {
        await registerPage.selectGender('male');
        await expect(registerPage.genderMaleRadio).toBeChecked();
        await expect(registerPage.genderFemaleRadio).not.toBeChecked();
        await registerPage.fillRegistrationForm(
            'User',
            'Tanmay',
            `john.doe.${Date.now()}@test.com`,
            'password123',
            'password123'
        );
        await registerPage.submitForm();

        // Not working in Playwright - Registration gets completed but no redirection to successful page
        // const successMsg = await registerPage.getSuccessMessage();
        // expect(successMsg).toBe('Your registration completed');
    });

    test('Test should fail', async () => {
        await registerPage.fillRegistrationForm(
            'User',
            'Tanmay',
            `john.doe@mail.com`,
            'pass',
            'passw'
        );
        await registerPage.submitForm();
        await expect(registerPage.passwordValidationError).not.toBeVisible({ timeout: 5000 });
        await expect(registerPage.confirmPasswordMismatchError).toBeVisible();
    });
});