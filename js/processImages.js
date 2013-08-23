
var IMAGES = new Array(0);

/******************************************************************************/

function onloadAddImgSizeToImgOverlay(imageWrapper, imageInfo, url) {
    var image = new Image();
    image.name = url;
    image.src = url;
    
    image.onload = function() {
            var minimumSize = 128;
            if(this.width <= minimumSize || this.height <= minimumSize) {
                imageWrapper.parentNode.removeChild(imageWrapper);
                return;
            }
                
            var size = this.width + 'x' + this.height;
            imageInfo.append(size);
        };
}

function isCSSBackgroundAnURL(string) {
    var re = /(url\()(.*)(\))/;
    var array = re.exec(string);
    if(array) {
        var url = array[2];
        return url;
    }

    return false;
}

function addImageToIMAGESArray(url) {
    if(! url)
        return;

    var imgWrap = $('<div/>').attr('class', 'imageWrap');

    var openImageLink = $('<a/>').attr('href', url)
                          .attr('target', '_blank')
                          .appendTo(imgWrap);
                          
    var theImage = $('<img/>').attr('class', 'theImage')
                         .attr('src', url)
                         .appendTo(openImageLink);

    var imageInfo = $('<div/>').attr('class', 'imageInfo')
                                  .appendTo(imgWrap);

    onloadAddImgSizeToImgOverlay(imgWrap[0], imageInfo, url);

    IMAGES.push(imgWrap);
}

function buildImagesPanel() {
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
    /* DIVs with background images */
    $('div').each(function(index, element) {
        if($(element).attr('class') == 'spaceball') /* Flickr mask, skip. */
            return;

        var background = $(element).css('background');
        var url = isCSSBackgroundAnURL(background);
        addImageToIMAGESArray(url); 
    });
    
    
    $('div#allsizes-photo img').each(function(index, img) {
        var url = $(img).attr('src');
        addImageToIMAGESArray(url); 
    });
    
    /* youtube.com */
    $('meta').each(function(index, element) {
        var property = $(element).attr('property');
        if(property != 'og:image')
            return;
            
        var url = $(element).attr('content');
        addImageToIMAGESArray(url); 
    });
    
    var imagesPanel = buildImagesPanel(); 

    var wrapper = $('<div/>').attr('id', 'cr24SauceWrapper')
                             .append(imagesPanel);

    $(document.body).append(wrapper);
});

/* EOF */