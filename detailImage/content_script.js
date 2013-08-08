
$(document).ready(function() {
    console.log('detailing image');
    var url = $('img').attr('src');
    var details = $('<div/>').attr('id', 'details')
                             .html("File: " + url);
    var detailPanel = $('<div/>').attr('id', 'detailPanel')
                                 .append(details);
    $(document.body).append(detailPanel);
});


/* EOF */
