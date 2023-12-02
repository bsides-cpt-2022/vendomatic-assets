// thank you https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
function fromHex(hex) {
    var convertedString;
    try {
        convertedString = decodeURIComponent(hex.replace(/(..)/g,'%$1'));
    }
    catch(e) {
        convertedString = hex;
        console.log('invalid hex input: ' + hex);
    }
    return convertedString;
}

function toHex(str) {
    var convertedHex;
    try {
        convertedHex = unescape(encodeURIComponent(str)).split('').map(function(v){
            return v.charCodeAt(0).toString(16);
        }).join('');
    }
    catch(e) {
        convertedHex = str;
        console.log('invalid text input: ' + str);
    }
    return convertedHex;
}

function xor() {
    const key = 12341234;
    const payload = Number($('#payload').val());
    
    // @todo - make sure to change to vending key.
    $('#payload').val(key ^ payload)
}

function polling() {
    $.ajax({
        url: "poll.php",
        beforeSend: function( xhr ) {
            //xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
    }).done(function( output ) {
        // the structure of data to read from message broker isnt final
        // @todo might need to be revisted
        var data = fromHex(output);

        var obj = JSON.parse(data);

        var count = 0;

        $('#grid').html("");

        $('#grid').append('<div class="row" style="width: 500px;"><table id="grid_table"></table></div>');

        for ( var row = 0; row < obj.rows.length; row++ ) {

            var classes = "row border-3"

            if (row == (obj.rows.length - 1)) {
                classes += " border-top border-bottom border-start border-end";
            } else {
                classes += " border-top border-start border-end";
            }

            classes += " border-danger";

            $('#grid_table').append('<div class="' + classes + '" id="' + row + '"></div>');

            for ( var column = 0; column < obj.rows[row].columns.length; column ++ ) {

                // @todo - fix up the spiral display
                $('#'+row).append('<div class="w-auto col p-0 justify-content-center text-center bg-dark text-white" ><span class="spiral-spinner border border-info rounded-circle d-inline-block m-1" style="width:25px; height:25px;"></span><span class="spiral d-inline-block m-1">' + obj.rows[row].columns[column].qty + '</span></div>');

            }

        }

        $('#grid_table').append('<div class="row border border-danger bg-danger text-danger" >.</div>');
        $('#grid_table').append('<div class="row border border-danger bg-danger text-danger" id="bottom-middle">.</div>');

        var columns = 6;

        $('#bottom-middle').append(new Array(++columns).join('<div class="col spiral text-white" ></div>'));

        $('#bottom-middle div:nth-child(3)').addClass('bg-dark');
        $('#bottom-middle div:nth-child(4)').addClass('bg-dark');

        $('#grid_table').append('<div class="row border border-danger bg-danger text-danger" >.</div>');

    });
}

polling();

$( document ).ready(function() {
    $( "#click" ).on( "click", function() {
        xor();
        $( "#submit" ).trigger( "submit" );
    });
});


