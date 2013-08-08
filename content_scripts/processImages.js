
var IMAGES = new Array(0);

var title = $('<a/>').attr('id', 'title')
                     .attr('href', "http://github.com/givanse/cr24Sauce")                                       
                     .attr('target', '_blank')
                     .html('<h4>cr24Sauce</h4>');
IMAGES.push(title);

function hasURL(string) {
    var re = /(url\()(.*)(\))/;
    var array = re.exec(string);
    if(array)
        return array[2];

    return false;
}

function storeImage(url) {
    if(! url)
        return;

    var link = $('<a/>').attr('href', url)
                        .attr('target', '_blank');
    var img = $('<img/>').attr('src', url)
                         .attr('class', 'hiddenImage')
                         .appendTo(link);
    IMAGES.push(link);
}

function findDivImages(div) {
    if($(div).attr('class') == 'spaceball') /* Flickr mask. */
        return;

    var background = $(div).css('background');
    var url = hasURL(background);
    storeImage(url); 
}

function findImgImages(img) {
    var url = $(img).attr('src');
    storeImage(url); 
}

$(document).ready(function() {
    console.log('processing images');
    /* google.com */
    $('div').each(function(index, div) {
        findDivImages(div);
    });
    /* flickr.com */
    $('div#allsizes-photo img').each(function(index, img) {
        findImgImages(img);
    });

    var imagesPanel = $('<div/>').attr('id', 'imagesPanel').html(IMAGES);
    $(document.body).append(imagesPanel);
});


/* EOF */
