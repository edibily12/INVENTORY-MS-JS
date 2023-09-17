$(document).ready( function () {
    //get all users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    //remove preloader
    $(window).on('load', function (){
        $('.preloader').addClass('removeLoader');
    });

    //fixed header
    $(window).scroll(function (){
       if ($(this).scrollTop() > 100){
            $('.header').addClass('fixed');
       } else {
            $('.header').removeClass('fixed');
       }
    });

    //handle smooth scrolling for nav menu
    $('a').on('click', function (){
        if (this.hash !== ""){
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop : $(hash).offset().top
            }, 800, function (){
                window.location.hash = hash;
            });
        }
    });

    $('#dialog').dialog({
        title:"Thank you for contact us!",
        closeOnEsc: false,
        modal: true,
        autoOpen: false,
        width: 500,
        draggable: false
    })

    /************************************* SIGN UP ***************************/
    //get userdata form data
    $('#signUpForm').on('submit', function (e){
        e.preventDefault()
        // personal info
        let role = $('input[name=role]').val();
        let name = $('input[name=name]').val();
        let email = $('input[name=email]').val();
        let password = $('input[name=password]').val();
        let password2 = $('input[name=password2]').val();

        //validate
        if (name === "" || email === "" || password === ""){
            swal("Opps!", "All fields are required.", "error");
        }else if (!validateEmail(email)){
            swal("Opps!", "Invalid email address.", "error");
        }else if (password.length < 6){
            swal("Opps!", "Password must be atleast 6 characters", "error");
        }else if (password !== password2){
            swal("Opps!", "Password does not match", "error");
        }else {
            //check if exist before signup
            const userExist = users.length && JSON.parse(localStorage.getItem('users')).some(data =>data.email.toLowerCase() == email.toLowerCase());

            if (! userExist){
                users.push( {name,email, role, password}); //push to a collection
                localStorage.setItem('users', JSON.stringify(users)); //sava data to localStorage
                swal("Good Job!", "Successfully registered, now login to continue!", "success");
            }else {
                swal("Ooops!", "Email is already exist please try another!", "error");
            }
        }
    })



    // validate an email address
    function validateEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }


    /************************** Login *******************************/
    $('#signInForm').on('submit', function (e) {
        e.preventDefault()
        // personal info
        let email = $('input[name=email]').val();
        let password = $('input[name=password]').val();

        //validate
        if (email === "" || password === ""){
            swal("Opps!", "All fields are required.", "error");
        }


        //check if user exist
        const userExist = users.length &&
            JSON.parse(localStorage.getItem('users')).some(data =>
                data.email.toLowerCase() == email && data.password.toLowerCase() == password
            );

        if (! userExist){
            swal("Ooops!", "Incorect credentials please try again with correct one", "error");
        }else{
            // Retrieve the user data
            const userData = JSON.parse(localStorage.getItem('users')).find(data =>
                data.email.toLowerCase() == email && data.password.toLowerCase() == password
            );

            if (userData.role === "1") {
                location.href = "../pages/admin.html"; // Redirect to the admin panel
            } else {
                location.href = "../pages/home.html"; // Redirect to the home page
            }
        }

    })

});