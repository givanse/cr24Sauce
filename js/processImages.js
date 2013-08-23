
var IMAGES = new Array(0);

/******************************************************************************/

function printImageSize(url, imageOverlay) {
    var image = new Image();
    image.name = url;
    image.src = url;
    image.onload = function() {
            var size = this.width + 'x' + this.height;
            imageOverlay.append('<br/>Size: ' + size);
        };
}

function backgroundHasURL(string) {
    var re = /(url\()(.*)(\))/;
    var array = re.exec(string);
    if(array) {
        var url = array[2];
        return url;
    }

    return false;
}

function storeImage(url) {
    if(! url)
        return;

    var imgWrap = $('<div/>').attr('class', 'imageWrap');

    var img = $('<img/>').attr('class', 'theImage')
                         .attr('src', url)
                         .appendTo(imgWrap);

    var imageOverlay = $('<div/>').attr('class', 'imageOverlay')
                                  .appendTo(imgWrap);

    var openLink = $('<a/>').attr('href', url)
                              .attr('target', '_blank')
                              .html('open')
                              .appendTo(imageOverlay);

    printImageSize(url, imageOverlay);

    IMAGES.push(imgWrap);
}

function findBackgroundImage(element) {
    if($(element).attr('class') == 'spaceball') /* Flickr mask. */
        return;

    var background = $(element).css('background');
    var url = backgroundHasURL(background);
    storeImage(url); 
}

function getImagesPanel() {
    var title = $('<a/>').attr('id', 'title')
                         .attr('href', "http://github.com/givanse/cr24Sauce")
                         .attr('target', '_blank')
                         .html('cr24Sauce');
    var imagesPanel = $('<div/>').attr('id', 'imagesPanel')
                                 .attr('class', 'ui-widget-content')
                                 .append(title)
                                 .append(IMAGES);
    imagesPanel.draggable();
    return imagesPanel;
}

$(document).ready(function() {
    /* google.com */
    $('div').each(function(index, element) {
        findBackgroundImage(element);
    });
    
    /* flickr.com */
    $('div#allsizes-photo img').each(function(index, img) {
        var url = $(img).attr('src');
        storeImage(url); 
    });
    
    /* google.com */
    $('meta').each(function(index, element) {
        var property = $(element).attr('property');
        if(property != 'og:image')
            return;
            
        var url = $(element).attr('content');
        storeImage(url); 
    });
    
    var imagesPanel = getImagesPanel(); 

    var wrapper = $('<div/>').attr('id', 'cr24SauceWrapper')
                             .append(imagesPanel);

    $(document.body).append(wrapper);
});

/* EOF */
