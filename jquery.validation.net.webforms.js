/**
* jquery.validation.net.webforms.js v1.0.0
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
        // http://docs.jquery.com/Plugins/Validation/validate
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

                // Select any input[type=text] elements within a validation group
                // and attach keydown handlers to all of them.
                $('.form :text').keydown(function (event) {
                    // Only execute validation if the key pressed was enter.
                    if (event.keyCode == 13) {
                        $(event.currentTarget).closest(".form").find(".submit").click();
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
            // Ascend from the button that triggered this click event 
            // until we find a container element flagged with 
            // .validationGroup and store a reference to that element.
            var group = $(this).getValidationContainer(event.currentTarget),
                isValid = true;

            // Descending from that .form element, find any input
            // elements within it, iterate over them, and run validation on 
            // each of them.
            group.find(':input').each(function (i, item) {
                if (!$(item).valid()) {
                    isValid = false;
                }
            });

            // If any fields failed validation, prevent the button's click 
            // event from triggering form submission.
            if (!isValid) {
                event.preventDefault();
            }
        }
    });

})(jQuery);