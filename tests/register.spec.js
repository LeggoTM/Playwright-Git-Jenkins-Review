import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/RegisterPage';

test.describe('RegisterPage UI Tests', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
    });

    test.only('Verify page loads and form elements are correct and visible', async () => {
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

    test('Required field validation messages', async () => {
        await registerPage.submitForm();
        const errors = await registerPage.getErrorMessages();
        expect(errors).toContain('First name is required.');
        expect(errors).toContain('Last name is required.');
        expect(errors).toContain('Email is required.');
        expect(errors).toContain('Password is required.');
    });

    test('Successful form submission UI feedback', async () => {
        await registerPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: `john.doe.${Date.now()}@test.com`, // Unique email to avoid duplicates
            password: 'password123',
            confirmPassword: 'password123',
        });
        await registerPage.submitForm();
        const successMsg = await registerPage.getSuccessMessage();
        expect(successMsg).toBe('Your registration completed');
    });

    test('Gender radio button selection', async () => {
        await registerPage.selectGender('male');
        await expect(registerPage.genderMaleRadio).toBeChecked();
        await expect(registerPage.genderFemaleRadio).not.toBeChecked();

        await registerPage.selectGender('female');
        await expect(registerPage.genderFemaleRadio).toBeChecked();
        await expect(registerPage.genderMaleRadio).not.toBeChecked();
    });

    test('Error message styling', async ({ page }) => {
        await registerPage.submitForm();
        const firstError = registerPage.errorMessages.first();
        const color = await firstError.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe('rgb(255, 0, 0)'); // Assuming red text for errors
    });

    test('Register button is clickable', async () => {
        await expect(registerPage.registerButton).toBeEnabled();
        await registerPage.fillForm({
            firstName: 'Jane',
            lastName: 'Doe',
            email: `jane.doe.${Date.now()}@test.com`,
            password: 'password123',
            confirmPassword: 'password123',
        });
        await registerPage.submitForm();
        await expect(registerPage.successMessage).toBeVisible();
    });
});