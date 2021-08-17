// Old spec
// https://youtu.be/86lczf7Bou8?t=134
var items = document.querySelectorAll( '.grid__item' )
var count = 0;

for( var y = 1; y <= 8; y++ )
{   
    for( var x = 1; x <= 8; x++ )
    {
        var item = items[ count ]
        
        item.style['-ms-grid-column'] = x
        item.style['-ms-grid-row'] = y
        count++
    }
}