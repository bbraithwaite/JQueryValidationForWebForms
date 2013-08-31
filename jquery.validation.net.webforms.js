/**
* jquery.validation.net.webforms.js v1.1.0
* https://github.com/bbraithwaite/JQueryValidationForWebForms
* ===================================================
*
* Copyright 2012 Bradley Braithwaite.
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function ($) {

    $.extend($.fn, {
        validateWebForm: function (options) {

            var form = $(this[0]),
                formExists = (form.length) && form.is('form');

            if (formExists) {
                if (!options) {
                    options = {};
                }

                // stop the validation from firing on the form submit
                options.onsubmit = false;

                // wire up the default jquery validation event to the form
                this.validate(options);

                // Select all input elements in form
                // and attach keydown handlers to all of them.
                $('.form :input').keydown(function (event) {
                    // Cause the form to validate when the enter key is pressed.
                    // It is a requirement to catch the enter key press as the default
                    // browser action would submit the form bypassing the validation event thus validating all groups.
                    if (event.keyCode == 13) {
                        $(event.currentTarget).closest(".form").find(".submit").click();
                        return false;
                    }
                });

                // find the submit buttons and override the click event
                form.getSumbitControls().click(this.validateAndSubmit);

                return this;
            }

            return undefined;
        },
        getSumbitControls: function () {
            return $(this).find('.form .submit');
        },
        getValidationContainer: function (submitControl) {
            return $(submitControl).closest('.form');
        },
        validateAndSubmit: function (event) {

            var group = $(this).getValidationContainer(event.currentTarget),
                isValid = true,
                settings = $("form").validate().settings;

            group.find(':input').each(function (i, item) {
                if (!$(item).valid()) {

                    if (settings.focusInvalid && isValid)
                        $(item).focus();

                    isValid = false;
                }
            });

            if (!isValid) {
                event.preventDefault();
            } else {
                if (settings.submitHandler) {
                    settings.submitHandler();
                    event.preventDefault();
                }
            }
        }
    });

})(jQuery);
