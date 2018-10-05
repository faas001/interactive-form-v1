
let totalCost = 0;


function initPage() {
    $('#name').focus();
    $('#other-title').hide();
    $('#colors-js-puns').hide();
    $('.activities').append('<label>Total cost for selected activities: $<span id="displayCost"></span></label>');
    $('.activities').append('<label id="test"></label>');
    $('#displayCost').html(totalCost);
}


$('.container').on('click', (e) => {
    
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
});

$('.activities').on('change', (e) => {
    const act = $(e.target).parent().parent();
    activity = $(act)[0] === $('.activities')[0];
    
        if(activity) {
           
            
            console.log('Activities clicked');
            console.log($(e.target[name="all"]));
            console.log(totalCost);
            if($(e.target).is(':checked')) {
                $(e.target).attr('name') === 'all' ? totalCost += 200 : totalCost += 100; 
                $('#displayCost').html(totalCost);
            } else {
                $(e.target).attr('name') === 'all' ? totalCost += -200 : totalCost += -100; 
                $('#displayCost').html(totalCost);
            }
          
            
        }
});





initPage();


