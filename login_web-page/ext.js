$("document").ready(function(){
    $("p").hide();
    // patterns
    var userpattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._]){6,28}[a-zA-Z0-9]$/;
    var namepattern = /^[A-Za-z]+$/;
    var mailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //modal popup
    $("#register").click(function () {$("#model").modal("show");});

    //clear page
    $("#clear").click(function () {$("#vform")[0].reset(); $("input").css("border" , "1px solid lightgrey") ; $("p").hide();});

    //country state city data showing
    var countries = {
        India: {
          "Gujarat": ["Ahmedabad", "Rajkot", "Vadodara", "Junagadh", "Gandhinagar"],
          "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
          "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
          "Delhi": ["New Delhi", "Old Delhi", "Noida", "Gurgaon", "Faridabad"],
          "Kerala": [ "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"]},
        America: {
          "California": ["Los Angles","San Francisco","San Jose","Fresno","Oakland"],
          "Alabama": ["Alabaster","Tuscaloosa","Birmingham","Montgomery","Huntsville"],
          "Alaska": ["Wrangell", "Sitka", "Homer", "Kenai", "Fairbanks"],
          "Arizona": ["Pheonix", "Tucson", "Sedona", "Scottsdale", "Mesa"],
          "Arkansas": ["Little Rock","Rogers","Conway","Springdale","Bentonville"]},
        Russia: {
          "Karelia": ["Pitkyaranta","Medvezhyegorsk","Suoyarvi","Pitkyaranta","Kondopoga"],
          "Astrakhan region": ["Astrakhan","Narimanov","Kamyzyak","Kharabali","Nachalovo"],
          "Chukotka": ["Anadyr", "Pevek", "Bilibino", "Uelen", "Tavayvaam"],
          "Arkhangelsk Oblast": ["Arkhangelsk","Severodvinsk","Koryazhma","Onega","Novodvinsk"],
          "Sakhalin Oblast": ["Nevelsk", "Okha", "Tomari", "Makarov", "Aniva"]},
        Germany: {
          "Hessen": ["Butzbach", "Frankfurt", "Suoyarvi", "Karben", "Wiesbaden"],
          "Saxony": ["Bautzen", "Chemnitz", "Dresden", "Leipzig", "Pirna"],
          "Thuringia": ["Erfurt", "Eisenach", "Jena", "Gotha", "Suhl"],
          "Bavaria": ["Bamberg", "Regensburg", "Nuremberg", "Augsburg", "Passau"],
          "Bremen": ["Arbergen", "Aumund", "Munte", "Osterholz", "Seehausen"]},
        Australia: {
          "South Australia": ["Adelaide","Snowtown","Calca","Palmer","Greenways",],
          "New South Wales": ["Sydney", "Albury", "Dubbo", "Newcastle", "Goulburn"],
          "Tasmania": ["Launceston", "Hobart", "Burnie", "Devonport", "Richmond"],
          "Victoria": ["Mildura", "Bendigo", "Ballarat", "Shepparton", "Portland"],
          "Queensland": ["Brisbane", "Mackay", "Cairns", "Hervey Bay", "Roma"]}
    };
    //enter key

    $.each(countries, (key) => $("#country").append(`<option value="${key}">${key}</option>`));
    $("#country").change(function () {
        if ($(this).val() === "x") {
            $("#state, #city").val("y");
        } else {
            $("#city").val("z");
            if ($(this).val()) {
                $("#state").html(`<option value="y">States</option>`);
                $.each(countries[this.value], (key) => $("#state").append(`<option value="${key}">${key}</option>`));
            }
        }
    });
    $("#state").change(function () {
        if ($(this).val() === "y") {
            $("#city").val("z");
        } else {
            $("#city").html(`<option value="z">City</option>`);
            const cities = countries[$("#country").val()][$(this).val()];
            $.each(cities, (key, value) => $("#city").append(`<option value="${value}">${value}</option>`));
        }
    });

    //keyup event

    function validateField(input , pattern , errpara , errorMessage) {
        if (pattern.test(input.val())) {
            input.css("border-color", "#2eb82e");
            errpara.hide();
            return true;
        } else if (input.val() === "") {
            input.css("border-color", "#cd2d00");
            errpara.text("*The field is empty*").show();
        } else {
            input.css("border-color", "#cd2d00");
            errpara.text(errorMessage).show();
        }
        return false;
    }
    $("#fname").focusout(function(){
        validateField($("#fname") , namepattern , $(".fn") , "enter valid FirstName");
    });
    $("#lname").focusout(function(){
        validateField($("#lname") , namepattern , $(".ln") , "enter valid LastName");
    });
    $("#pass").focusout(function(){
        validateField($("#pass") , passpattern , $(".pass") , "Enter password with minimum length of 8 , containing atleast 1 uppercase & lowercase alphabet , numeric numbers , special characters");
    });
    $("#cpass").focusout(function(){
        validateField($("#cpass") , passpattern , $(".cpass") , "Enter the same Password");
    });
    $("#country").focusout(function(){
        if($(this).val() == "x"){$(".counterr").text("please enter the country").show();}
        else{$(".counterr").hide();}
    });
    $("#state").focusout(function(){
        if($(this).val() == "y"){$(".staterr").text("please enter the state").show();}
        else{ $(".staterr").hide();}
    });
    $("#city").focusout(function(){
        if($(this).val() == "z"){$(".citerr").text("please enter the city").show();}
        else{ $(".citerr").hide();}
    });
    $("#email").focusout(function(){
        validateField($("#email") , mailpattern , $(".mail") , "please enter correct E-mail");
        var storedData = JSON.parse(localStorage.getItem("datalocal")) || [];
        for( let item of storedData){
            if($("#email").val() != item.email){continue;}
            else if($("#email").val() == item.email){
                $(this).css("border-color", "#cd2d00");
                $(".mail").text("enter a different E-mail").css("color" ,"red").show();
                break;
            }else{$(this).css("border-color", "#2eb82e"); $(".mail").hide();}
        }
    });
    $("#user").focusout(function(){
        validateField($("#user") , userpattern , $(".user") , "please enter correct username");
        var storedData = JSON.parse(localStorage.getItem("datalocal")) || [];
        for( let item of storedData){
            if($("#user").val() != item.username){continue;}
            else if($("#user").val() == item.username){
                $(this).css("border-color", "#cd2d00");
                $(".user").text("enter a different E-mail").css("color" ,"red").show();
                break;
            }else{$(this).css("border-color", "#2eb82e"); $(".user").hide();}
        }
    });
    
    $('#img').focusout(function () {
        var imgInput = $('#img');
        if (imgInput[0].files.length === 0) {$('.img').text("Please choose an image.").show();}
            else {
            var validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            var fileType = imgInput[0].files[0].type;
            if ($.inArray(fileType, validImageTypes) === -1) {$('.img').text("Please choose an image.").show();}
            else{$('.img').hide();}
        }
    });
    
    function redirect(ind){
        localStorage.setItem("person" , JSON.stringify(ind));
    }

    //login
    var ind;
    $("#loguser").focusout(function(){
        if($("#loguser").val() === ""){
            $("#loguser").css("border-color", "#cd2d00");
            $(".loguser").text("The field is empty").show();
        }else if(mailpattern != $("#loguser").val()){
            $("#loguser").css("border-color", "#cd2d00");
            $(".loguser").text("Enter the valid details").show();
        }
        let isEmail = (mailpattern.test($(this).val())) ? true : false;
        let isUsername = (userpattern.test($(this).val())) ? true : false; 
        var storedData = JSON.parse(localStorage.getItem("datalocal")) || [];  
        if(isEmail){ 
            let index = storedData.findIndex(item => $("#loguser").val() === item.email);
            if (index !== -1) {
                $("#loguser").css("border-color", "#2eb82e");
                $(".loguser").hide();
                ind = index;
            } else {$(".loguser").text("The E-mail doesn't exist.").show();}};
        if (isUsername) {
            let index = storedData.findIndex(item => $("#loguser").val() === item.username);
            if (index !== -1) {
                $("#loguser").css("border-color", "#2eb82e");
                $(".loguser").hide();
                ind = index;
            } else {$("#loguser").css("border-color", "#cd2d00"); $(".loguser").text("The username doesn't exist.").show();}
        }        
    });

    $("#logpass").focusout(function(){
        if($("#logpass").val() === ""){
            $("#logpass").css("border-color", "#cd2d00");
            $(".logpass").text("The field is empty").show();
        }else if(passpattern.test($("#logpass").val()) == false ){
            $("#logpass").css("border-color", "#cd2d00");
            $(".logpass").text("enter the valid password").show();
        }
        var storedData = JSON.parse(localStorage.getItem("datalocal")) || [];  
        let passindex = storedData[ind];
        if($("#logpass").val() === passindex.password){
            $("#logpass").css("border-color" , "#2eb82e");
            $(".logpass").hide();
        }else{$("#logpass").css("border-color", "#cd2d00"); $(".logpass").text("Please enter a valid password").show();}
    });

    $("#login").on('click' , function(){
        if ($('#loguser').val() == "") {$('.loguser').text("*The field is empty*").show();}
        if ($('#logpass').val() == "") {$('.logpass').text("*The field is empty*").show();}
        if($("#lform p:visible").length === 0 ){ 
            if(confirm("Login Successful. click ok to proceed.")){
                redirect(ind);
                $("input").css("border" , "1px solid lightgrey"); 
                $("#lform")[0].reset(); 
                window.open("web-p.html" , "_blank");
            }
        }
    });

    //register 
    $("#submit").on('click' , function(){
        if ($('#fname').val() == "") {$('.fn').text("*The field is empty*").show();}
        if ($('#lname').val() == "") {$('.ln').text("*The field is empty*").show();}
        if ($('#email').val() == "") {$('.mail').text("*The field is empty*").show();}
        if ($('#user').val() == "") {$('.user').text("*The field is empty*").show();}
        if ($('#pass').val() == "") {$('.pass').text("*The field is empty*").show();}
        if ($('#cpass').val() == "") {$('.cpass').text("*The field is empty*").show();}
        if ($('#country').val() == "x") {$('.counterr').text("*please enter the place*").show();}
        if ($('#state').val() == "y") {$('.staterr').text("*please enter the place*").show();}
        if ($('#city').val() == "z") {$('.citerr').text("*please enter the place*").show();}
        if ($('#img')[0].files.length === 0) {$('.img').text("Please choose an image.").show();}
        if($("#vform p:visible").length === 0 ){
            if($("#vform p:visible").length === 0 ){
                alert("form is submitted"); 
                var data = {
                    firstname: $("#fname").val(),
                    lastname: $("#lname").val(),
                    email: $("#email").val(),
                    username: $("#user").val(),
                    password: $("#pass").val(),
                    confirmpass: $("#cpass").val(),
                    gender: $("input[name='gender']:checked").val(),
                    country: $("#country").val(),
                    state: $("#state").val(),
                    city: $("#city").val(),
                    dp: null
                };
                
                const storedData = JSON.parse(localStorage.getItem("datalocal")) || [];
                
                if ($('#img')[0].files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL($('#img')[0].files[0]);
                    reader.onload = function (e) {
                        data.dp = e.target.result;
                        storedData.push(data);
                        localStorage.setItem('datalocal', JSON.stringify(storedData));
                    };
                }
                $("input").css("border" , "1px solid lightgrey");
                $("#vform")[0].reset();
                $("#model").modal("hide");
            };
        };
    });
});