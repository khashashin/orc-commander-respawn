$(document).ready(function() {
    // setting date and time
    $('#Date').html(moment().format('dddd, MMMM Do YYYY'));
    
    setInterval( function() {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    },1000);
    
    setInterval( function() {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
    
    setInterval( function() {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    },1000); 

    $('tbody a').click(function(){
        //var time = $('#hours').text() + ":" + min + ":" + $('#sec').text()
        var respawnTime = moment().add(30, 'minutes').format('HH:mm:ss');
        if($(this).parent().prev().has('p')) {
            $(this).parent().prev().children().remove();
        }
        $(this).parent().prev().append("<p>"+respawnTime+"</p>");
    });
    $('.materialboxed').materialbox();
});