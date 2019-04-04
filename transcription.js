jQuery(function($) {
  'use strict';

  var transcribing = $('#transcribing');
  var audioFileName = $('#audioSource').attr('src');
  var audioFile;

  function launchSpeechTranscription() {
    transcribing.removeClass('hidden');
    $('#transcription').html('');

    var data = new FormData();
    data.append('audioFile', audioFile, audioFileName);

    $.ajax({
      method:'POST',
      url: 'https://api-platform.systran.net/multimodal/speech/transcribe?key=c5e18751-c8b7-4e81-b2f7-e8117e3cfa65&lang=jpn',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        transcribing.addClass('hidden');

        if(!data || !data.segments || !data.segments.length)
          return;

        var html = '';

        $.each(data.segments, function(segmentIndex, segment) {
          if(!segment.words || !segment.words.length)
            return;

          html += '<p>';
          $.each(segment.words, function(wordIndex, word) {
            html += word.text;
          });
          html += '</p>';
        });

        $('#transcription').html(html);
      },
      error: function(xhr, status, err) {
        console.log('Error while transcribing audio file:', err);
        transcribing.addClass('hidden');
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

    $('#transcribeButton').click(launchSpeechTranscription);
  };
  xhr.send();
});
