jQuery(function($) {
  'use strict';

  var speechLidAnalyzing = $('#speechLidAnalyzing');
  var speechLidResult = $('#speechLidResult');
  var audioFileName = $('#speechLidAudioSource').attr('src');
  var audioFile;

  function launchSpeechLid() {
    speechLidAnalyzing.removeClass('hidden');
    speechLidResult.addClass('hidden');

    var data = new FormData();
    data.append('audioFile', audioFile, audioFileName);

    $.ajax({
      method:'POST',
      url: 'https://api-platform.systran.net/multimodal/speech/detectLanguage?key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        speechLidAnalyzing.addClass('hidden');

        if(!data || !data.speakers || !data.speakers.length)
          return;

        var html = 'Detected language';
        html += (data.speakers.length > 1) ? 's: ' : ': ';

        $.each(data.speakers, function(index, speaker) {
          if(index > 0) {
            html += ', ';
          }
          html += speaker.lang;
        });

        speechLidResult.html(html);
        speechLidResult.removeClass('hidden');
      },
      error: function(xhr, status, err) {
        console.log('Error while analyzing audio file:', err);
        speechLidAnalyzing.addClass('hidden');
        speechLidResult.removeClass('hidden');
      }
    });
  }

  //Load audio file content to be sent with the request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', audioFileName, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    var fileContent = new Uint8Array(this.response);
    audioFile = new Blob([fileContent], { type: "audio/mpeg"});

    $('#speechLidButton').click(launchSpeechLid);
  };
  xhr.send();
});
