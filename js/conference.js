
//function to setup the page on initial load to dynamically add/remove display elements from the HTML and set focus to the name input field.
function initPage() {
    $('#name').focus();
    $('#other-title').hide();
    $('#colors-js-puns').hide();
    $('.activities').append('<label style="font-size:20px">Total cost for selected activities:&nbsp;<strong>$<span id="displayCost"></span></strong></label>');
    $('#displayCost').css('fontSize', 'large').html('0');
    $('#payment').val('credit card');
    $('#payment option[value="select_method"]').remove();
    $('#credit-card').next().attr('id','paypal').hide();
    $('#paypal').next().attr('id','bitcoin').hide();
   
    $('#mail').prev().append('<span id="results" style="color:#f5ffa3"></span>');
}

//this resets the display errors so they don't propagate on the page on multiple failed submits
function clearErrors() {
    $('#nameError').remove();
    $('#name').css('border-color', '#eae7dc');
    $('#mailError').remove();
    $('#mail').css('border-color', '#eae7dc');
    $('#activityError').remove();
    $('.activities').css('border-right','none');
    $('#ccError').remove();
    $('#cc-num').css('border-color', '#eae7dc');
    $('#zipError').remove();
    $('#zip').css('border-color', '#eae7dc');
    $('#cvvError').remove();
    $('#cvv').css('border-color', '#eae7dc');
}

//straight up copy/pasted this from Stackoverflow top voted answer on email validation from user: rnevius
//Essentially this creates a string to then compare to another string via RegExp test method returning a boolean result
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//below validates email address as it is typed and visually displays current validity on the screen.
function realtimeValidate(email) {
    if ($('#mail').val() === '') {
        $('#results').html('');
        console.log('blank')
       }
   let results = validateEmail(email);
      
    if (results && email !== '') {
            email = '&nbsp;'+ email + '&#9989';
            $('#results').html(email);
            $('#results').css('color', 'green');
                 
     } else if (!results && email !== '') {
            email = '&nbsp;' + email + '&#10060';
            console.log(email);
            $('#results').html(email);
            $('#results').css('color', 'red');
    } 
}

//listen to the form for events to trigger functionality
$('.container').on('click keyup', (e) => {
    
    //This will clear the error message (if currently displayed) if the name field is not blank when it loses focus 
    $('#name').focusout(function () {
        if($('#name').val().length > 0) {
            $('#nameError').remove();
            $('#name').css('border-color', '#eae7dc');
        }
    });

    //This will clear the error message (if currently displayed) if the name field is not blank when it loses focus 
    $('#mail').focusout(function () {
        if($('#mail').val().length > 0) {
            $('#mailError').remove();
            $('#mail').css('border-color', '#eae7dc');
        }
    });

    //validate email address in realtime if the target is the email input
    if(e.target === $('#mail')[0]) {
        realtimeValidate($('#mail').val())
    }
          
   
        // Show the input text box if Other is selected for Job Role.   
        if(e.target === $('#title')[0]) {
            if ($('select#title').val() === 'other') {
                $('#other-title').show();
                console.log('target', e.target);
            } else { 
                $('#other-title').hide();
            }
        }

        //This hides the color options until a design is selected. It further displays only the color options based on colors available to that design.
        if(e.target === $('#design')[0]) {
            if($('select#design').val() === 'js puns') {
                if ( $('#color option:selected').index() > 2 ) {
                    $('#color').val('cornflowerblue');
                } 
                            
                $('#colors-js-puns').show();
                $('#color option[value="cornflowerblue"]').show();
                $('#color option[value="darkslategrey"]').show();
                $('#color option[value="gold"]').show();
                $('#color option[value="tomato"]').hide();
                $('#color option[value="steelblue"]').hide();
                $('#color option[value="dimgrey"]').hide();
                               
            } else if ($('select#design').val() === 'heart js') {
                    if ( $('#color option:selected').index() < 3) {
                        $('#color').val('tomato');
                    } 
                
                    $('#colors-js-puns').show();
                    $('#color option[value="cornflowerblue"]').hide();
                    $('#color option[value="darkslategrey"]').hide();
                    $('#color option[value="gold"]').hide();
                    $('#color option[value="tomato"]').show();
                    $('#color option[value="steelblue"]').show();
                    $('#color option[value="dimgrey"]').show();
                
            } else {
                $('#colors-js-puns').hide();                   
             }
        }
        
        //This will clear the error message (if currently displayed) if the cc-num field is not blank when it loses focus
        $('#cc-num').focusout(function () {
            if($('#cc-num').val().length > 0) {
                $('#ccError').remove();
                $('#cc-num').css('border-color', '#eae7dc');
            }
        });
        
        //This will clear the error message (if currently displayed) if the zip field is not blank when it loses focus
        $('#zip').focusout(function () {
            if($('#zip').val().length > 0) {
                $('#zipError').remove();
                $('#zip').css('border-color', '#eae7dc');
            }
        });

        //This will clear the error message (if currently displayed) if the cvv field is not blank when it loses focus
        $('#cvv').focusout(function () {
            if($('#cvv').val().length > 0) {
                $('#cvvError').remove();
                $('#cvv').css('border-color', '#eae7dc');
            }
        });           
});

//this will display the running total of all options selected. Everytime an option is selected the total cost is recalculated and displayed.
function displayTotal () {
    let totalCost = 0;
    //loop through each of the checboxes and add to totalCost if it is checked
    $('input[type=checkbox').each(function(i) {
        if ($(this).is(':checked')) {
            $(this).attr('name') === 'all' ? totalCost += 200 : totalCost += 100;   
        }
        $('#displayCost').html(totalCost);
    });
}

$('.activities').on('click keyup', (e) => {
    const act = $(e.target).parent().parent();
    activity = $(act)[0] === $('.activities')[0];
    displayTotal();
        
        if(activity) {
            
            //if form was submitted once with no activity selected this will hide or show the error on subsequent edits depending if an option is selected
            if ($('#activityError')) {
                if ($('input[type="checkbox"]').is(':checked')) { 
                     $('#activityError').hide();
                     $('.activities').css('border-right','none');
                } else {
                    $('#activityError').show();
                    $('.activities').css({'border-right':'2px solid','border-color':'#f96666'});
                }
            }
            
            //The below checks the status of checked items 
            //It will disable conflicting conference timeslots and visually indicate on screen 
            if($(e.target).is(':checked')) {
                             
                if ($(e.target).attr('name') === 'js-frameworks' ){
                   
                    $('input[name="express"]').attr('disabled', true);
                    $('input[name="express"]').parent().css('color', 'grey');
                } else if ($(e.target).attr('name') === 'express' ) {
                    
                    $('input[name="js-frameworks"]').attr('disabled', true);
                    $('input[name="js-frameworks"]').parent().css('color', 'grey');
                }

                if ($(e.target).attr('name') === 'js-libs' ){
                    
                    $('input[name="node"]').attr('disabled', true);
                    $('input[name="node"]').parent().css('color', 'grey');
                } else if ($(e.target).attr('name') === 'node' ) {
                  
                    $('input[name="js-libs"]').attr('disabled', true);
                    $('input[name="js-libs"]').parent().css('color', 'grey');
                }


            } else if($(e.target).is(':checked') === false) {
          
                if ( $('input[name="js-frameworks"]').is(':checked') === false ) {
                    $('input[name="express"]').removeAttr('disabled');
                    $('input[name="express"]').parent().css('color', 'black');
                }
                    if ( $('input[name="express"]').is(':checked') === false ) {
                    $('input[name="js-frameworks"]').removeAttr('disabled');
                    $('input[name="js-frameworks"]').parent().css('color', 'black');
                }
                if ( $('input[name="js-libs"]').is(':checked') === false ) {
                    $('input[name="node"]').removeAttr('disabled');
                    $('input[name="node"]').parent().css('color', 'black');
                }
                    if ( $('input[name="node"]').is(':checked') === false ) {
                    $('input[name="js-libs"]').removeAttr('disabled');
                    $('input[name="js-libs"]').parent().css('color', 'black');
               }
            }
                   
        }
});       

//below will display the correct payment method input text boxes/html text depending on option selected.
$('#payment').on('change', (e) => {
    if (e.target === $('#payment')[0]) {
        
        if ($(e.target).val() === 'bitcoin') {
            $('#bitcoin').show();
            $('#credit-card').hide();
            $('#paypal').hide();
        } else if ($(e.target).val() === 'paypal') {
            $('#bitcoin').hide();
            $('#credit-card').hide();
            $('#paypal').show();
        } else {
            $('#bitcoin').hide();
            $('#credit-card').show();
            $('#paypal').hide();
        }   
    }   
});
   
//below is submit form error validation, if any of the below conditions true the default form submission is stopped
$('button').on('click', (e) => {
    //clear any error messages still on screen as they will be recreated below if necessary
    clearErrors();

    //if Name field is blank create and display error message in yellow into label HTML and highlight input text in red
    if(! $('#name').val()) {
        e.preventDefault();
        $('#name').prev().append('<span id="nameError" style="color:#f5ffa3"> Please enter a name so that we know who to register!</span>');
        $('#name').css('border-color', '#f96666');
    } 

    //if email field is blank create and display error message in yellow into label HTML and highlight input text in red
    if(! validateEmail($('#mail').val())) {
        e.preventDefault();
        $('#mail').prev().append('<span id="mailError" style="color:#f5ffa3"> Please enter a valid email address.</span>');
        $('#mail').css('border-color', '#f96666');
        
    }

    //if there is no activity selected, create and display error message in yellow into legend HTML and create red border at right to visually indicate
    if ( ! $('input[type="checkbox"]').is(':checked')) { 
        e.preventDefault();
        $('.activities').children('legend').append('<span id="activityError" style="color:#f5ffa3"> Select at least one option. No free rides! =)</span>');
        $('.activities').css({'border-right':'2px solid','border-color':'#f96666'});
    }
        
    //if payment type selected is credit card field is blank create and display error message in yellow into label HTML and highlight input text in red
    if( $('#payment').val() === 'credit card') {
        
        //if credit card is blank it updates the label HTML to prompt to enter a CC number, if it's not between 13-16 chars it prompts to enter between 13-16
        if( $('#cc-num').val() === '') {
            e.preventDefault();
            $('#cc-num').prev().append('<span id="ccError" style="color:#f5ffa3"> Enter CC Number.</span>');
            $('#cc-num').css('border-color', '#f96666');
        } else if( $('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
            e.preventDefault();
            $('#cc-num').prev().append('<span id="ccError" style="color:#f5ffa3"> Between 13-16 numbers.</span>');
            $('#cc-num').css('border-color', '#f96666');
        } 

        //if zip field is blank create and display error message in yellow into label HTML and highlight input text in red
        if( $('#zip').val() === '') {
            e.preventDefault();         
            $('#zip').prev().append('<span id="zipError" style="color:#f5ffa3"> Required</span>');
            $('#zip').css('border-color', '#f96666');
        }

        //if cvv field length is not equal to 3 create and display error message in yellow into label HTML and highlight input text in red
        if( $('#cvv').val().length !== 3) {
            e.preventDefault();
            $('#cvv').prev().append('<span id="cvvError" style="color:#f5ffa3"> 3-digit only</span>');
            $('#cvv').css('border-color', '#f96666');
        }
    }
});

initPage();


