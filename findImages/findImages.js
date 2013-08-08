
var IMAGES = new Array(0);

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
    var background = $(div).css('background');
    var url = hasURL(background);
    storeImage(url); 
}

function findImgImages(img) {
    var url = $(img).attr('src');
    storeImage(url); 
}

$(document).ready(function() {
    /* google.com */
    $('div').each(function(index, div) {
        findDivImages(div);
    });
    /* flickr.com */
    $('div#allsizes-photo img').each(function(index, img) {
        findImgImages(img);
    });

    var urlsPanel = $('<div/>').attr('id', 'imagesPanel').html(IMAGES);
    $(document.body).append(urlsPanel);
});


