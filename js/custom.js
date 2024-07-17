$(document).ready(function ($) {
    'use strict';
    var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!form.checkValidity()) {
                    event.stopPropagation();
                }else{
                    var data = {
                        service_id: process.env.EMAILJS_SID,
                        template_id: process.env.EMAILJS_TID,
                        user_id: process.env.EMAILJS_UID,
                        template_params: {
                            'from_name': $('#name').val(),
                            'message': $('#message').val(),
                            'reply_to': $('#email').val()
                        }
                    };
        
                    //console.log(data);

                    //EmailJS
                    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json'
                    }).done(function() {
                        $('#submitSuccessMessage').removeClass('d-none');
                        $('#contactForm').get(0).reset();
                        $('#contactForm').removeClass('was-validated');
                    }).fail(function(error) {
                        //alert('Oops... ' + JSON.stringify(error));
                        $('#submitErrorMessage').removeClass('d-none');
                    });
                }
                    
                form.classList.add('was-validated');
            }, false);
    });

    $("#submitButton").on("click", function() {
        $('#contactForm').addClass('was-validated');
    });
});
