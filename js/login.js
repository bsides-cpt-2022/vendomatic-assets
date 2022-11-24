$('document').ready(function(){
    $('#form').submit(function(event){

        event.preventDefault();

        alert('Administrators are not allowed to login remotely.');

    });
});