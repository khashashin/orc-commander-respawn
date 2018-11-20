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

    $('tbody a.clear').click(function(e) {
        e.preventDefault()
        // Removes time from the table if its available
        if($(this).parent().prevAll(':eq(0)').has('p')) {
            $(this).parent().prevAll(':eq(0)').children().remove();
        }
        // Removes time from the table if its available
        if($(this).parent().prevAll(':eq(1)').has('p')) {
            $(this).parent().prevAll(':eq(1)').children().remove();
        }
        if($(this).prev().hasClass('disabled')) {
            $(this).prev().removeClass('disabled');
        }
    });

    $('tbody a.killed').click(function(e){
        e.preventDefault()
        // Adds 30 min to current time
        var respawnTime = moment().add(30, 'minutes').format('HH:mm:ss');
        // Sets countdown for 30 min
        var eventTime = moment().add(30, 'minutes').unix();
        var currentTime = moment().unix();
        var diffTime = eventTime - currentTime;
        var duration = moment.duration(diffTime * 1000, 'milliseconds');
        var that = this;

        function respawnTimeCountdown(){
            e.preventDefault()
            duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
            var h = moment.duration(duration).hours(),
                m = moment.duration(duration).minutes(),
                s = moment.duration(duration).seconds();
            h = $.trim(h).length === 1 ? '0' + h : h;
            m = $.trim(m).length === 1 ? '0' + m : m;
            s = $.trim(s).length === 1 ? '0' + s : s;

            if (duration > 0){
                // Removes time from the table if its available
                if($(that).parent().prevAll(':eq(0)').has('p')) {
                    $(that).parent().prevAll(':eq(0)').children().remove();
                }
                // show how many hours, minutes and seconds are left
                $(that).parent().prevAll(':eq(0)').append("<p>" + h + ":" + m + ":" + s + "</p>");
            }
            else {
                // Removes time from the table if its available
                if($(that).parent().prevAll(':eq(0)').has('p')) {
                    $(that).parent().prevAll(':eq(0)').children().remove();
                }
                $(that).parent().prevAll(':eq(0)').append("<p>" + "<b class='fight'>" + "⚔" + "</b>" + "</p>");
            }
        }
        
        var intervalId = setInterval(respawnTimeCountdown(), 1000);
        if(diffTime > 0) {
            $(this).parent().prevAll(':eq(0)').children().attr('data-timer-id', intervalId);
        }
        // Add class to button "Killed" to prevent multiple event calls
        if($(this).parent().prevAll(':eq(0)').children().has('p')) {
            $(this).addClass('disabled');
        }
        // Removes time from the table if its available
        if($(this).parent().prevAll(':eq(1)').has('p')) {
            $(this).parent().prevAll(':eq(1)').children().remove();
        }
        // Prescribes re-spawn time in the table.
        $(this).parent().prevAll(':eq(1)').append("<p>"+respawnTime+"</p>");
    });
    $('.materialboxed').materialbox();
});