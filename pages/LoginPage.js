export default class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page) {
        this.page = page;

        // Locators for login form elements
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.rememberMeCheckbox = page.locator('#RememberMe');
        this.loginButton = page.locator('.login-button');
        this.logoutButton = page.locator('[href="/logout"]');

        this.fieldErrors = page.locator('.field-validation-error');
        this.loginError = page.locator('.message-error');
    }

    async navigate() {
        await this.page.goto('https://demo.nopcommerce.com/login');
    }

    async fillForm(email, password, rememberMe = false) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        } else {
            await this.rememberMeCheckbox.uncheck();
        }
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getFieldErrors() {
        return this.fieldErrors.allTextContents();
    }

    async getLoginError() {
        return this.loginError.textContent();
    }


}