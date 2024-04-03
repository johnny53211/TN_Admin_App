// ========================================
/* Author       : Johnson R 
   Created Date : 
   updated Date :
   Description  : validate App Forms
*/
// ========================================
let formValidationn = {
    // validate dialog Inputs
    validateDialogInputs: () => {
        $('#dialogInput').validate({
            rules: {
                pin: {
                    required: true,
                    number: true,
                    minlength: 4,
                    maxlength: 4,
                },
                confirmPin: {
                    required: true,
                    number: true,
                    minlength: 4,
                    maxlength: 4,
                    equalTo: '#pin',
                },
                ipAddress: {
                    required: true,
                    ip: true
                },
                hostname: {
                    required: true
                },
                serverOption: {
                    required: true
                },
                port: {
                    required: true,
                    number: true
                }
            },
            messages: {
                pin: {
                    required: 'Please Enter Pin',
                    minlength: 'Character Must Be 4 Character',
                    maxlength: 'Character Must Be 4 Character',
                    number: "Numbers Only Allowed"
                },
                confirmPin: {
                    required: 'Please Enter Confirm Pin',
                    minlength: 'Character Must Be 4 Character',
                    maxlength: 'Character Must Be 4 Character',
                    equalTo: 'Two Fields Must Same',
                    number: "Numbers Only Allowed"
                },
                ipAddress: {
                    required: 'Please Enter IP Address'
                },
                hostname: {
                    required: 'Please Enter Hostname',
                },
                serverOption: {
                    required: 'Please Select Option',
                },
                port: {
                    required: 'Please Enter Port',
                    number: "Numbers only"
                }
            },
            onkeyup: function (element) {
                $(element).valid();
            },
            onfocusout: function (element) {
                $(element).valid();
            },
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.dialog-input-field').addClass('item-input-with-error-message item-input-invalid').removeClass(validClass);
                $(element).addClass("input-invalid").removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.dialog-input-field').removeClass('item-input-with-error-message item-input-invalid').addClass(validClass);
                $(element).removeClass("input-invalid").removeClass(validClass);
            },
            errorPlacement: function (error, element) {
                var errorDiv = $('<div class="input-error-message"></div>');
                errorDiv.insertAfter(element);
                error.appendTo(errorDiv);
            }
        });
    },// validate login form
    validateLoginForm: () => {
        $('#loginForm').validate({
            rules: {
                userName: {
                    required: true
                },
                password: {
                    required: true,
                },
                name: {
                    required: true
                }
            },
            messages: {
                userName: {
                    required: 'Please Enter Username'
                },
                password: {
                    required: 'Please Enter Password',
                },
                name: {
                    required: 'Please Enter Name'
                }
            },
            onkeyup: function (element) {
                $(element).valid();
            },
            onfocusout: function (element) {
                $(element).valid();
            },
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.item-content').addClass('item-input-with-error-message item-input-invalid').removeClass(validClass);
                $(element).addClass("input-invalid").removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.item-content').removeClass('item-input-with-error-message item-input-invalid').addClass(validClass);
                $(element).removeClass("input-invalid").removeClass(validClass);
            },
            errorPlacement: function (error, element) {
                var errorDiv = $('<div class="item-input-error-message"></div>');
                errorDiv.insertAfter(element);
                error.appendTo(errorDiv);
            }
        });
    },// Add ip validation
    validateIp: () => {
        $.validator.addMethod('ip', function (value) {
            var ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
            return ipPattern.test(value);
        }, 'Invalid IP Address');
    }, // get form data values
    getFormData: (id) => {
        let formData = app.form.convertToData(id)
        return formData;
    },
    validatePopupForm: () => {
        $('#form-data').validate({
            rules: {
                event_name: {
                    required: true
                },
                event_date: {
                    required: true,
                },
                event_type: {
                    required: true
                }
            },
            messages: {
                event_name: {
                    required: 'Please Enter Event Name'
                },
                event_date: {
                    required: 'Please Enter Event Data',
                },
                event_type: {
                    required: 'Please Enter Event Type'
                }
            },
            onkeyup: function (element) {
                $(element).valid();
            },
            onfocusout: function (element) {
                $(element).valid();
            },
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.item-content').addClass('item-input-with-error-message item-input-invalid').removeClass(validClass);
                $(element).addClass("input-invalid").removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.item-content').removeClass('item-input-with-error-message item-input-invalid').addClass(validClass);
                $(element).removeClass("input-invalid").removeClass(validClass);
            },
            errorPlacement: function (error, element) {
                var errorDiv = $('<div class="item-input-error-message"></div>');
                errorDiv.insertAfter(element);
                error.appendTo(errorDiv);
            }
        });
    }
}