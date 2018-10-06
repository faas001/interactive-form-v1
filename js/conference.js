

function initPage() {
    $('#name').focus();
    $('#other-title').hide();
    $('#colors-js-puns').hide();
    $('.activities').append('<label>Total cost for selected activities: <strong>$<span id="displayCost"></span></strong></label>');
    $('.activities').append('<label id="test"></label>');
    $('#displayCost').html('0');
    $('#payment').val('credit card');
    $('#payment option[value="select_method"]').remove();
    $('#credit-card').next().attr('id','paypal').hide();
    $('#paypal').next().attr('id','bitcoin').hide();
  
}

function clearErrors() {
    $('#nameError').remove();
    $('#name').css('border-color', '#c1deeb');
    $('#mailError').remove();
    $('#mail').css('border-color', '#c1deeb');
    $('#activityError').remove();
    $('.activities').css({'border-right':'none','border-color':'red'});
    $('#ccError').remove();
    $('#cc-num').css('border-color', '#c1deeb');
    $('#zipError').remove();
    $('#zip').css('border-color', '#c1deeb');
    $('#cvvError').remove();
    $('#cvv').css('border-color', '#c1deeb');
}

$('.container').on('click change keypress', (e) => {
    
    if(e.target === $('#name')[0]) {
        $('#nameError').remove();
        $('#name').css('border-color', '#c1deeb');
    }
    if(e.target === $('#mail')[0]) {
        $('#mailError').remove();
        $('#mail').css('border-color', '#c1deeb');
    }    
        
        if(e.target === $('#title')[0]) {
            if ($('select#title').val() === 'other') {
                $('#other-title').show();
                console.log('target', e.target);
            } else { 
                $('#other-title').hide();
            }
        }

        if(e.target === $('#design')[0]) {
            if($('select#design').val() === 'js puns') {
                if ( $('#color option:selected').index() > 2 ) {
                    $('#color').val('cornflowerblue');
                } 
                console.log($('select#design').val());
              
                $('#colors-js-puns').show();
                $('#color option[value="cornflowerblue"]').show();
                $('#color option[value="darkslategrey"]').show();
                $('#color option[value="gold"]').show();
                $('#color option[value="tomato"]').hide();
                $('#color option[value="steelblue"]').hide();
                $('#color option[value="dimgrey"]').hide();
                console.log($('#color option:selected').index());
               
            } else if ($('select#design').val() === 'heart js') {
                    if ( $('#color option:selected').index() < 3) {
                        $('#color').val('tomato');
                    } 
                
                    console.log($('select#design').val());
                    $('#colors-js-puns').show();
                    $('#color option[value="cornflowerblue"]').hide();
                    $('#color option[value="darkslategrey"]').hide();
                    $('#color option[value="gold"]').hide();
                    $('#color option[value="tomato"]').show();
                    $('#color option[value="steelblue"]').show();
                    $('#color option[value="dimgrey"]').show();
                  //  $('#color').val('tomato');
            } else {
                $('#colors-js-puns').hide();
                       
             }
        }
        console.log(e.target);
        if(e.target === $('#cc-num')[0]) {
            
            $('#ccError').remove();
            $('#cc-num').css('border-color', '#c1deeb');
        }
        if(e.target === $('#zip')[0]) {
          
            $('#zipError').remove();
            $('#zip').css('border-color', '#c1deeb');
        }
        if(e.target === $('#cvv')[0]) {
          
            $('#cvvError').remove();
            $('#cvv').css('border-color', '#c1deeb');
        }
    
});

function displayTotal () {
    let totalCost = 0;
    $('input[type=checkbox').each(function(i) {
        if ($(this).is(':checked')) {
            console.log($(this).is(':checked'));
            console.log($(this));
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
            $('#activityError').remove();
            $('.activities').css({'border-right':'none','border-color':'red'});
            
            console.log('Activities clicked');
            console.log($(e.target).is(':checked'));
           
            console.log($('input[name="js-frameworks"]').is(':checked'));
            
            if($(e.target).is(':checked')) {
                             
                if ($(e.target).attr('name') === 'js-frameworks' ){
                    console.log('set disabled')
                    $('input[name="express"]').attr('disabled', true);
                    $('input[name="express"]').parent().css('color', 'grey');
                } else if ($(e.target).attr('name') === 'express' ) {
                    console.log('set disabled')
                    $('input[name="js-frameworks"]').attr('disabled', true);
                    $('input[name="js-frameworks"]').parent().css('color', 'grey');
                }

                if ($(e.target).attr('name') === 'js-libs' ){
                    console.log('set disabled')
                    $('input[name="node"]').attr('disabled', true);
                    $('input[name="node"]').parent().css('color', 'grey');
                } else if ($(e.target).attr('name') === 'node' ) {
                    console.log('set disabled')
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

    $('#payment').on('change', (e) => {
        if (e.target === $('#payment')[0]) {
            console.log('payment processing');
            console.log($(e.target).val());

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

    //straight up copy/pasted this from Stackoverflow top voted answer on email validation from user: rnevius
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $('button').on('click', (e) => {
        clearErrors();
        if(! $('#name').val()) {
        e.preventDefault();
        alert('Name field is blank');
        $('#name').prev().append('<span id="nameError" style="color:yellow"> Please enter a name so that we know who to register!</span>');
        $('#name').css('border-color', 'red');
        console.log(e);
        } 

        if(! validateEmail($('#mail').val())) {
            e.preventDefault();
            alert('Email field is not valid');
            $('#mail').prev().append('<span id="mailError" style="color:yellow"> Please enter a valid email address.</span>');
            $('#mail').css('border-color', 'red');
            console.log(e);
            }

        if ($('input[type="checkbox"]').is(':checked')) { 
            e.preventDefault();
            alert('At least one activity checked');
          
        } else { 
            console.log('No activity selected');
            $('.activities').children('legend').append('<span id="activityError" style="color:yellow"> Select at least one option. No free rides! =)</span>');
            $('.activities').css({'border-right':'2px solid','border-color':'red'});
            }

            console.log($('#cc-num').val())
        if( $('#payment').val() === 'credit card') {
            if( $('#cc-num').val() === '') {
                e.preventDefault();
                alert('No cc number entered');
                $('#cc-num').prev().append('<span id="ccError" style="color:yellow"> Enter CC Number.</span>');
                $('#cc-num').css('border-color', 'red');
            } else if( $('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
                $('#cc-num').prev().append('<span id="ccError" style="color:yellow"> Between 13-16 numbers.</span>');
                $('#cc-num').css('border-color', 'red');
            } 
            if( $('#zip').val() === '') {
                e.preventDefault();
                alert('no zip code entered');
                $('#zip').prev().append('<span id="zipError" style="color:yellow"> Required</span>');
                $('#zip').css('border-color', 'red');
            }
            if( $('#cvv').val() === '') {
                e.preventDefault();
                alert('no cvv entered');
                $('#cvv').prev().append('<span id="cvvError" style="color:yellow"> 3-digit only</span>');
                $('#cvv').css('border-color', 'red');
            }
        }

    });






initPage();


