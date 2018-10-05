


function initPage() {
    $('#name').focus();
    $('#other-title').hide();
}


$('.container').on('click', (e) => {
    console.log($('select#title').val());
    if ($('select#title').val() === 'other') {
        $('#other-title').show();
    }

    //$(e.target).val === 'other'

});




initPage();


