$(document).ready(function() {
  // Remove Log-in
  $('#topheader_p p, .logreg').hide();
  // Index link
  $('.index_link').click(function(e) {
    e.preventDefault();
    var destination = $(this).attr('href');
    setTimeout(function() { window.location.href = destination; }, 500);
    $('#topheader_pic, #topheader_p').animate({
      height:'240px'
    }, 500);
    $('.logreg').fadeIn(500);
  });
  // BlockUI on QAQC
  $("a[class^='fadeQAQC']").click(function (e) {
    e.preventDefault();
    var http_method = "get";
    if(document.URL.indexOf('out') != -1 && document.URL.indexOf('batch') === -1 )
    {
      var http_method = "post";
    }
    alert(http_method);
    $(document).ajaxStart(function(http_method){
      $.blockUI({
        css:{ "top":""+wintop+"", "left":""+winleft+"", "padding": "30px 20px", "width": "400px", "height": "60px", "border": "0 none", "border-radius": "4px", "-webkit-border-radius": "4px", "-moz-border-radius": "4px", "box-shadow": "3px 3px 15px #333", "-webkit-box-shadow": "3px 3px 15px #333", "-moz-box-shadow": "3px 3px 15px #333" },
        message: '<h2 class="popup_header">Processing QA/QC...</h2><br/><img src="/images/loader.gif" style="margin-top:-16px">'
      });
    });
      var retStatus;
      $.ajax({
          cache: false,
          type: http_method,
          complete: function(xhr) { 
            retStatus = xhr.status;
          },
          success: function() {
            window.location.href = model+"_qaqc.html";
          },
          error: function() {
            $.unblockUI();
            alert('There is a problem about your submission.')
          }
        });
      if(retStatus == 200)
          return false;
      else
          return true;
  });
  // BlockUI on Form Submit
  $("input[value='Submit']").click(function (e) {
    e.preventDefault();
    var form_valid = $("form").valid();
    if (typeof ($("form").valid) == 'undefined'){
        $.blockUI({
          css:{ "top":""+wintop+"", "left":""+winleft+"", "padding": "30px 20px", "width": "400px", "height": "60px", "border": "0 none", "border-radius": "4px", "-webkit-border-radius": "4px", "-moz-border-radius": "4px", "box-shadow": "3px 3px 15px #333", "-webkit-box-shadow": "3px 3px 15px #333", "-moz-box-shadow": "3px 3px 15px #333" },
          message: '<h2 class="popup_header">Processing Model Submission...</h2><br/><img src="/images/loader.gif" style="margin-top:-16px">'
        });
        setTimeout(function() {$('form').submit();}, 500);
    }

    if (typeof ($("form").valid) != 'undefined' && $("form").valid() != false){
        e.preventDefault();
        $.blockUI({
          css:{ "top":""+wintop+"", "left":""+winleft+"", "padding": "30px 20px", "width": "400px", "height": "60px", "border": "0 none", "border-radius": "4px", "-webkit-border-radius": "4px", "-moz-border-radius": "4px", "box-shadow": "3px 3px 15px #333", "-webkit-box-shadow": "3px 3px 15px #333", "-moz-box-shadow": "3px 3px 15px #333" },
          message: '<h2 class="popup_header">Processing Model Submission...</h2><br/><img src="/images/loader.gif" style="margin-top:-16px">'
        });
        setTimeout(function() {$('form').submit();}, 500);
    }
  });
});

