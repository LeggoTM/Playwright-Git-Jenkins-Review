
export default class RegisterPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page) {
        this.page = page;

        // Element Locators
        this.pageHeading = page.getByRole('heading', { name: 'Register' });
        this.genderMaleRadio = page.getByLabel('Male', { exact: true });
        this.genderFemaleRadio = page.getByLabel('Female', { exact: true });
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.companyNameInput = page.locator('#Company');
        this.newsletterCheckbox = page.locator('#Newsletter');
        this.passwordInput = page.locator('#Password');
        this.confirmPassInput = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');

        // Error Messages
        this.firstNameError = page.locator('.field-validation-error', { hasText: 'First name is required' });
        this.lastNameError = page.locator('.field-validation-error', { hasText: 'Last name is required' });
        this.emailValidationError = page.locator('.field-validation-error', { hasText: 'Please enter a valid email address' });
        this.emailEmptyError = page.locator('.field-validation-error', { hasText: 'Email is required' });
        this.passwordValidationError = page.locator('.field-validation-error', { hasText: 'Password must meet the following rules:  must have at least 6 characters and not greater than 64 characters' });
        this.passwordEmptyError = page.locator('[data-valmsg-for="Password"]', { hasText: 'Password is required' });
        this.confirmPasswordEmptyError = page.locator('[data-valmsg-for="ConfirmPassword"]', { hasText: 'Password is required' });
        this.confirmPasswordMismatchError = page.locator('[data-valmsg-for="ConfirmPassword"]', { hasText: 'The password and confirmation password do not match' });
    }

    // Navigate to the registration page
    async navigate() {
        await this.page.goto('https://demo.nopcommerce.com/register');
    }

    async selectGender(gender) {
        if (gender.toLowerCase() === 'male') {
            await this.genderMaleRadio.click();
        } else if (gender.toLowerCase() === 'female') {
            await this.genderFemaleRadio.click();
        }
    }

    async fillRegistrationForm(firstName, lastName, email, password, confirmPassword, company = '') {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        if (company) await this.companyNameInput.fill(company);
        await this.passwordInput.fill(password);
        await this.confirmPassInput.fill(confirmPassword);
    }

    async toggleNewsletterSubscription(shouldSubscribe) {
        const isChecked = await this.newsletterCheckbox.isChecked();
        if (shouldSubscribe && !isChecked) {
            await this.newsletterCheckbox.check();
        } else if (!shouldSubscribe && isChecked) {
            await this.newsletterCheckbox.uncheck();
        }
    }

    async submitForm() {
        await this.registerButton.click();
    }

    async getSuccessMessage() {
        return await this.page.locator('.result').textContent();
    }
}