$(document).ready( function () {
    //get all comments from the local storage
    var payments = JSON.parse(localStorage.getItem('payments'))|| [];
    var users = JSON.parse(localStorage.getItem('users'))|| [];

    //remove preloader
    $(window).on('load', function (){
        $('.preloader').addClass('removeLoader');
    });

    //get checkout form data
    $('#checkoutForm').on('submit', function (e){
        e.preventDefault()
        // personal info
        let fname = $('input[name=fname]').val();
        let lname = $('input[name=lname]').val();
        let email = $('input[name=email]').val();
        let address = $('input[name=address]').val();

        //country
        let country = $('select[name=country]').val();
        let state = $('select[name=state]').val();
        let zip = $('input[name=zip]').val();

        //payments
        let paymentMethod = $('select[name=paymentMethod]').val();
        let itemName = $('input[name=item]').val();
        let quantity = $('input[name=quantity]').val();
        let cardName = $('input[name=cardName]').val();
        let cardNo = $('input[name=cardNo]').val();
        let cardExpiration = $('input[name=cardExpiration]').val();
        let cvv = $('input[name=cvv]').val();

        //validate inputs
        if (fname === "" || lname === "" || email === "" || address === "" || country === "" || state === "" || zip === "" || paymentMethod === "0" || itemName === "" || quantity === "" || cardName === "" || cardNo === "" || cardExpiration === "" || cvv === ""){
            swal("Opps!", "All field are required.", "error");
        }else if (!isNaN(fname) || !isNaN(lname) || !isNaN(cardName)){
            swal("Opps!", "first name, last name and card name fields should be a text", "error");
        } else if (isNaN(cvv) || cvv.length !== 3){
            swal("Opps!", "cvv must be an integer of length 3", "error");
        }else if (isNaN(cardNo) || cardNo.length !== 10){
            swal("Opps!", "card number must be an integer of length 10", "error");
        }else if (! validateEmail(email)){
            swal("Opps!", "Invalid email address", "error");
        } else {
            //send payments to local storage
            payments.push({
                fname,
                lname,
                email,
                address,
                country,
                state,
                zip,
                paymentMethod,
                itemName,
                quantity,
                cardName,
                cardNo,
                cardExpiration,
                cvv,
            });
            localStorage.setItem('payments', JSON.stringify(payments));
            swal("Payment Sent Successfully!", "    Thank you for choosing our product, We'll be back to you soon. Don't forget to check your email address.", "success");
        }
    })

    // validate an email address
    function validateEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }


    // Retrieve orders data from localStorage
    if (payments && payments.length > 0) {
        // Iterate over the data and create table rows
        for (var i = 0; i < payments.length; i++) {
            var row = $("<tr></tr>");
            let sno = 1;

            // Create table cells and populate with data
                row.append('<td>'+ `${i+1}` +'</td>')
                row.append('<td>'+ payments[i].fname + "  " + payments[i].lname +'</td>')
                row.append('<td>'+ payments[i].email + '</td>')
                row.append('<td>'+ payments[i].item + '</td>')
                row.append('<td>'+ payments[i].quantity + '</td>')
                row.append('<td>'+
                    '<button type="button" class="btn btn-danger">Delete</button>'
                +'</td>')

            // Append the row to the table body
            $("#tableBody").append(row);
        }
    }

    //retrieve users data
    if (users && users.length > 0) {
        // Iterate over the data and create table rows
        for (var i = 0; i < users.length; i++) {
            var row = $("<tr></tr>");
            let sno = 1;

            // Create table cells and populate with data
                row.append('<td>'+ `${i+1}` +'</td>')
                row.append('<td>'+ users[i].name + '</td>')
                row.append('<td>'+ users[i].email + '</td>')
                row.append('<td>'+ users[i].role + '</td>')
                row.append('<td>'+
                    '<button type="button" class="btn btn-primary me-1">Edit</button>'+
                    '<button type="button" class="btn btn-danger">Delete</button>'
                +'</td>')

            // Append the row to the table body
            $("#usersBody").append(row);
        }
    }

});