$("document").ready(function(){
    
    var storedData = JSON.parse(localStorage.getItem("datalocal")) || []; 
    var ind = JSON.parse(localStorage.getItem("person")); 
    $("#vform p").hide();

    if(ind === -1){$("#login").show(); $("#profile , .profname").hide();}
    else{
        $("#login").hide();
        $("#profile , .profname").show();
        let index = storedData[ind];
        $(".p-name").text(`${index.firstname} ${index.lastname}`);
        $(".p-name").text(`${index.firstname} ${index.lastname}`);
        $(".p-user").text(`${index.username}`);
        $(".p-email").text(`${index.email}`);
        $(".p-gender").text(`${index.gender}`);
        $(".p-country").text(`${index.country}`);
        $(".p-state").text(`${index.state}`);
        $(".p-city").text(`${index.city}`);
        if(index.dp === undefined){$(".profileimg , .prof-pic").attr("src" , "images/istockphoto-1337144146-612x612.jpg" );}
        else{$(".profileimg , .prof-pic").attr("src" , `${index.dp}` )}
    }
    //regex
    var userpattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._]){6,28}[a-zA-Z0-9]$/;
    var namepattern = /^[A-Za-z]+$/;
    var mailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

    //profile
    $("#clear").click(function () {$("#vform")[0].reset(); $("input").css("border" , "1px solid lightgrey") ; $("#vform p").hide();});
    $("#profile").click(function () {$("#status").fadeToggle();});
    $("#status .btn-close").click(function () {$("#status").fadeOut();})
    $(".edit-d").click(function () {
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
        $.each(countries, (key) => $("#country").append(`<option value="${key}">${key}</option>`));
        $("#country").change(function () { 
            $("#state").html(`<option value="y">States</option>`);
            $.each(countries[this.value], (key) => $("#state").append(`<option value="${key}">${key}</option>`));
        });
        $("#state").change(function () { 
            $("#city").html(`<option value="z">City</option>`);
            const cities = countries[$("#country").val()][$(this).val()];
            $.each(cities, (key, value) => $("#city").append(`<option value="${value}">${value}</option>`));
        });
        var storedData = JSON.parse(localStorage.getItem("datalocal")) || []; 
        var ind = JSON.parse(localStorage.getItem("person")); 
        let index = storedData[ind];
        
        $("#model").modal("show");
        $("#fname").val(index.firstname) ;
        $("#lname").val(index.lastname) ;
        $("#email").val(index.email) ;
        $("#user").val(index.username) ;
        $("#pass").val(index.password) ;
        $("#gender").val(index.gender) ;
        $("#country").val(index.country) ;
        $("#country").trigger("change");
        $("#state").val(index.state) ;
        $("#state").trigger("change");
        $("#city").val(index.city) ;
        $("#city").trigger("change");

    });

    // update  form

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
        let index = storedData[ind];
        if (($("#email").val() != index.email) && (storedData.some(storedData => storedData.email == $('#email').val()))) {
            $("#email").css("border-color", "#cd2d00");
            $('.mail').text("*email already exists*").show();
        }
    });
    $("#user").focusout(function(){
        validateField($("#user") , userpattern , $(".user") , "please enter correct username");
        let index = storedData[ind];
        if (($("#uname").val() != index.username) && (storedData.some(storedData => storedData.username == $('#user').val()))) {
            $("#user").css("border-color", "#cd2d00");
            $(".user").text("*username already exists*").show();
        }
    });
    $('#img').blur(function () {
        var imgInput = $('#img');
        if (imgInput[0].files.length === 0) {$('.img').text("Please choose an image.").show();} 
        else {
            var validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            var fileType = imgInput[0].files[0].type;
            if ($.inArray(fileType, validImageTypes) === -1) {$('.img').text("Please choose an image.").show();}
            else{$('.img').hide();}
        }});

    $("#update").on('click' , function(){
        if ($('#fname').val() == "") {$('.fn').text("*The field is empty*").show();}
        if ($('#lname').val() == "") {$('.ln').text("*The field is empty*").show();}
        if ($('#email').val() == "") {$('.mail').text("*The field is empty*").show();}
        if ($('#user').val() == "") {$('.user').text("*The field is empty*").show();}
        if ($('#pass').val() == "") {$('.pass').text("*The field is empty*").show();}
        if ($('#country').val() == "x") {$('.counterr').text("*please enter the place*").show();}
        if ($('#state').val() == "y") {$('.staterr').text("*please enter the place*").show();}
        if ($('#city').val() == "z") {$('.citerr').text("*please enter the place*").show();}
        if($("#vform p:visible").length === 0 ){
            alert("Details are updated."); 
            var ind = JSON.parse(localStorage.getItem("person")); 
            updateData(ind);
            location.reload(true);
        };
    });
    //edit profile pic
    $(".edit-b").on('click' , function(){$("#picture-edit").modal("show");});
    $(".photo-change").on('click' , function(){
        if ($('#img')[0].files.length === 0) {$('.img').text("Please choose an image.").show();}
        if ($('#img')[0].files[0]) {
            let index = storedData[ind];
            var reader = new FileReader();
            reader.readAsDataURL($('#img')[0].files[0]);
            reader.onload = function (e) {
                index.dp = e.target.result;
                storedData[ind] = index ;
                localStorage.setItem('datalocal', JSON.stringify(storedData));
                location.reload(true);
            };
        }
    });
    $(".photo-cancel").on('click' , function(){$('.img').hide();});

    //update function

    function updateData(index) {
        let formdata = storedData[index];
    
        formdata.firstname = $("#fname").val();
        formdata.lastname = $("#lname").val();
        formdata.email = $("#email").val();
        formdata.username = $("#user").val();
        formdata.password = $("#pass").val();
        formdata.confirmpass = $("#pass").val();
        formdata.gender = $("input[name='gender']:checked").val();
        formdata.country = $("#country").val();
        formdata.state = $("#state").val();
        formdata.city = $("#city").val();
    
        storedData[index] = formdata;
        localStorage.setItem("datalocal", JSON.stringify(storedData));
    }

    //logout

    $(".logout").on('click' , function(){
        localStorage.setItem('person', -1);
        location.reload(true);
    })
    $("#login").on('click' , function(){window.open("login.html" , "_self");});

    //sign up button
    $(".hero-b").on('click' , function(){window.open("login.html" , "_self");})
});