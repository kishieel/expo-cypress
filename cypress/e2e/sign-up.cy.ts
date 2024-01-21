describe('sign up', () => {
    beforeEach(() => {
        cy.visit('/sign-up');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="nickname"]').as('nickname');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="email"]').as('email');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="password"]').as('password');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="confirm"]').as('confirm');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="terms"]').as('terms');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="news"]').as('news');
        cy.get('[data-testid="sign-up-form"]').find('[data-testid="submit"]').as('submit');
    });

    it('should fail to submit form with empty fields', () => {
        cy.get('@submit').click();
        cy.get('@nickname').find('[data-testid="error"]').should('contain', 'Nickname is required.');
        cy.get('@email').find('[data-testid="error"]').should('contain', 'Email is required.');
        cy.get('@password').find('[data-testid="error"]').should('contain', 'Password is required.');
        cy.get('@confirm').find('[data-testid="error"]').should('contain', 'Password confirmation is required.');
        cy.get('@terms').find('[data-testid="error"]').should('contain', 'Term of use agreement is required.');
    });

    it('should fail to submit form with invalid data', () => {
        cy.get('@nickname').find('[data-testid="input"]').type('ab');
        cy.get('@email').find('[data-testid="input"]').type('invalidemail');
        cy.get('@password').find('[data-testid="input"]').type('weak');
        cy.get('@confirm').find('[data-testid="input"]').type('mismatchedpassword');
        cy.get('@terms').find('[data-testid="input"]').click();

        cy.get('@submit').click();

        cy.get('@nickname')
            .find('[data-testid="error"]')
            .should('contain', 'Nickname must contains at least 3 characters.');
        cy.get('@email').find('[data-testid="error"]').should('contain', 'Email is invalid.');
        cy.get('@password')
            .find('[data-testid="error"]')
            .should('contain', 'Password must contains at least 8 characters.');
        cy.get('@confirm').find('[data-testid="error"]').should('contain', 'Password confirmation does not match.');
    });

    it('should submit form with valid data', () => {
        cy.intercept({ method: 'POST', url: '/sign-up' }, { token: 'auth-token' }).as('singUp');

        cy.get('@nickname').find('[data-testid="input"]').type('ValidNickname');
        cy.get('@email').find('[data-testid="input"]').type('valid@example.com');
        cy.get('@password').find('[data-testid="input"]').type('StrongPassword1');
        cy.get('@confirm').find('[data-testid="input"]').type('StrongPassword1');
        cy.get('@terms').find('[data-testid="input"]').click();

        cy.get('@submit').click();
        cy.url().should('include', '/home');
    });
});
