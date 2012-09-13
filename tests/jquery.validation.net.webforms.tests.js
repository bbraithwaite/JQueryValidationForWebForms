/// <reference path="../jquery.validation.net.webforms.js"/>

(function ($) {
    var getValidForm = function () {
        return $("#aspForm").validateWebForm();
    },
    triggerEnterKey = function (selector) {
        var e = $.Event("keydown");
        e.keyCode = 13; // enter key
        $(selector).trigger(e);
    },
    formIsPosted = false;

    QUnit.testStart(function () {
        getValidForm();
        $('#aspForm').submit(function () {
            // flag to tell tests the form has been posted
            formIsPosted = true;
            return false;
        });
    });

    QUnit.testDone(function () {
        //reset form elements for next test
        formIsPosted = false;
        $("#uxUserName").val("");
        $("#uxFirstName").val("");
        $("#uxUserName").next().text("");
        $("#uxFirstName").next().text("");
    });

    module("form initialisation");

    test("binding existing form element returns validation object", function () {
        notEqual(getValidForm(), undefined);
    });

    test("binding non-existing form element returns undefined", function () {
        var form = $("#form").validateWebForm();
        equal(form, undefined);
    });

    test("find all controls with the 'submit' class", function () {
        var submitControls = getValidForm().getSumbitControls();
        equal(submitControls.length, 2, "There should be two controls");
    });

    test("get the validation group container for the 'sign up' button", function () {
        var form = getValidForm(),
            submitControls = form.getSumbitControls();
        equal(form.getValidationContainer(submitControls[0]).prop("id"), "signup", "id of the 'form' for the control should be 'signup'");
    });

    test("get the validation group container for the 'register' button", function () {
        var form = getValidForm(),
            submitControls = form.getSumbitControls();
        equal(form.getValidationContainer(submitControls[1]).prop("id"), "login", "id of the 'form' for the control should be 'login'");
    });

    module("invalid login form input");

    test("clicking submit with no login displays login form validation error", function () {
        $("#uxLogin").click();
        equal($("#uxUserName").next().text(), "This field is required.");
    });

    test("clicking the enter key with no an invalid email displays login form validation error", function () {
        $("#uxUserName").val("user@email");
        triggerEnterKey("#uxUserName");
        equal($("#uxUserName").next().text(), "Please enter a valid email address.");
        equal($("#uxRegister").next().text(), "", "Register form group should not be validated.");
    });

    test("clicking submit with an invalid email address displays login form validation error", function () {
        $("#uxUserName").val("user");
        $("#uxLogin").click();
        equal($("#uxUserName").next().text(), "Please enter a valid email address.");
    });

    test("first invalid field has focus set when submitting", function () {
        $("#uxLogin").click();
        equal($("#uxUserName").next().text(), "This field is required.");
        ok($("#uxUserName").is(":focus"), "The username should have focus set.");
    });

    module("invalid signup form input");

    test("clicking submit with no firstname displays signup form validation error", function () {
        $("#uxRegister").click();
        equal($("#uxFirstName").next().text(), "This field is required.");
    });

    test("clicking the enter key with no first displays signup form validation error", function () {
        triggerEnterKey("#uxFirstName");
        equal($("#uxFirstName").next().text(), "This field is required.");
        equal($("#uxUserName").next().text(), "", "Login form group should not be validated.");
    });

    module("valid input");

    test("valid login input submits form on button click", function () {
        $("#uxUserName").val("user@example.com");
        $("#uxLogin").click();
        ok(formIsPosted);
    });

    test("valid login input submits form on enter key press", function () {
        $("#uxUserName").val("user@example.com");
        triggerEnterKey("#uxUserName");
        ok(formIsPosted);
    });

    test("valid signup input submits form on button click", function () {
        $("#uxFirstName").val("John Smith");
        $("#uxRegister").click();
        ok(formIsPosted);
    });

    test("valid signup input submits form on enter key press", function () {
        $("#uxFirstName").val("John Smith");
        triggerEnterKey("#uxFirstName");
        ok(formIsPosted);
    });

})(jQuery);