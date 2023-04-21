/* eslint-disable prefer-arrow-callback, func-names */

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    // create new user
    const user = {
      username: "test",
      name: "test_user",
      password: "123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    cy.visit("");
  });

  it("login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("123");
      cy.get("#login-button").click();

      cy.contains("test_user logged in");
    });

    it("fails with wrong username", function () {
      cy.get("#username").type("wronguser");
      cy.get("#password").type("123");
      cy.get("#login-button").click();

      cy.contains("wrong user name or password");
    });

    it("fails with wrong password", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();

      cy.contains("wrong user name or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "123" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a blog by cypress");
      cy.get("#author").type("an author by cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-blog").click();

      cy.contains("a blog by cypress");
      cy.contains("an author by cypress");
    });

    it("user can like a blog", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a blog by cypress");
      cy.get("#author").type("an author by cypress");
      cy.get("#url").type("cypress.com");
      cy.get("#create-blog").click();

      cy.contains("a blog by cypress");
      cy.contains("an author by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "cypress blog 2",
          author: "cypress author 2",
          url: "cypress.com2",
        });
      });

      it("user can like a blog", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("user can delete their blog", function () {
        cy.contains("view").click();
        cy.contains("delete").click();
        cy.should("not.contain", "cypress blog 2");
      });

      it("other users can't see the delete button of this post", function () {
        cy.contains("logout").click();

        const user = {
          username: "test2",
          name: "test_user2",
          password: "456",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

        cy.login({ username: "test2", password: "456" });

        cy.contains("view").click();
        cy.should("not.contain", "delete");
      });
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "my blog",
          author: "me",
          url: "me.com",
          likes: 0,
        });
        cy.createBlog({
          title: "your blog",
          author: "you",
          url: "you.com",
          likes: 1,
        });
        cy.createBlog({
          title: "our blog",
          author: "us",
          url: "us.com",
          likes: 2,
        });
      });
      it("blogs are sorted by likes", function () {
        cy.get(".blog").eq(0).should("contain", "our blog");
        cy.get(".blog").eq(1).should("contain", "your blog");
        cy.get(".blog").eq(2).should("contain", "my blog");
      });
    });
  });
});
