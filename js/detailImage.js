
$(document).ready(function() {
    
    /* This shouldn't be needed. */
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('style.css');
    (document.head||document.documentElement).appendChild(style);
    /* This shouldn't be needed. The manifest should take care... */

    var url = $('img').attr('src');
    var details = $('<div/>').attr('id', 'details')
                             .html("File: " + url);
    var detailPanel = $('<div/>').attr('id', 'detailPanel')
                                 .append(details);
    $(document.body).append(detailPanel);
});


/* EOF */
