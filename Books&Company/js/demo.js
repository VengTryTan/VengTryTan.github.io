
var rec;
let blob;

record.disabled = false;
stoprecord.disabled = true;

navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {handlerFunction(stream)});
function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state === "inactive"){
            blob = new Blob(audioChunks,{type:'audio/mpeg'});
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls= true;
            recordedAudio.autoplay= false;
        }
    }
}
// Speech to text and Record
let scriptSS = '';
var titleDoc = document.getElementById('titleDoc');
const r = document.getElementById('result');
const f = document.getElementById('final');
const speechRecognizer = new webkitSpeechRecognition();

function startRecord() {
    var audioChunks = [];
    rec.start();
    //
    record.disabled = true;
    stoprecord.disabled = false;

    r.innerHTML = '';
    const lange = document.getElementById('language').value;
    if ('webkitSpeechRecognition' in window){
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = lange;
        speechRecognizer.start();

        let finalTranscripts = '';
        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n","<br>");
                if(event.results[i].isFinal){
                    finalTranscripts += transcript;
                    scriptSS = finalTranscripts;
                }
                else {
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts + '<span style="color: #999">'+interimTranscripts+'</span>'
        };
        speechRecognizer.onerror = function (event) {

        }
    }
    else {
        r.innerHTML = 'Your window is not support'
    }
}
function stopRecord() {
    rec.stop();
    speechRecognizer.stop();

    f.innerHTML = scriptSS;
    titleDoc.innerHTML = document.getElementById('titleName').value;
    record.disabled = false;
    stoprecord.disabled = true;
}
function exportDoc() {
    var headerDoc = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'> " +
        "<head><meta charset='utf-8'><title>"+ document.getElementById('titleName').value+"</title></head><body>";
    var bodyDoc = "<h2 style='text-align: center;'>"+document.getElementById('titleName').value+"</h2>" +
        "<p>"+scriptSS+"</p>";
    var footerDoc = "</body></html>";
    var sourceHTML = headerDoc + bodyDoc + footerDoc;
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = "Conversation.doc";
    fileDownload.click();
    document.body.removeChild(fileDownload);
}





