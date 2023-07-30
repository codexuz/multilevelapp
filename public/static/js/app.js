import { BrowserClient, BrowserMicrophone } from 'https://cdn.jsdelivr.net/npm/@speechly/browser-client@2.6.5/+esm';

const microphone = new BrowserMicrophone();
const client = new BrowserClient({
  appId: '89d6eff7-77b5-4e79-82b7-53450cfb27f8',
  logSegments: true,
  debug: true,
});


var currentQuestionIndex=0
var currentPartThree=0
const id = new URLSearchParams(window.location.search).get("id");
var audioElement=document.getElementById("audio")
var audioTrans=document.getElementById("tran-audio")
var audioTrans3=document.getElementById("tran3-audio")
let audioStream, mediaRecorder, chunks;
let isRecordingAudio = false;

const renderdetails= async ()=>{
    const res= await fetch('https://blog-seven-bay.vercel.app/speaking/'+ id);
    var data= await res.json();

//Speech recognition

let isRecording = false;

const micBtn = document.getElementById('start-btn');
const transcripts = document.getElementById('result');

const attachMicrophone = async () => {
  if (microphone.mediaStream) return;
  await microphone.initialize();
  await client.attach(microphone.mediaStream);
};

const startRecording = async () => {
  await attachMicrophone();
  await client.start();
  isRecording = true;
};

const stopRecording = async () => {
  await client.stop();
  isRecording = false;
};

client.onSegmentChange((segment) => {
  const text = segment.words.map((word) => word.value).join(' ');
  if (segment.isFinal) {
    transcripts.innerHTML += `<p>${text}</p>`;
  }
});

micBtn.addEventListener('click', async () => {
 
await startRecording();
  
});




//Recorder

async function startRec(){
        try {
          // Request access to audio media
          audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

          // Create MediaRecorder object
          mediaRecorder = new MediaRecorder(audioStream);

          // Initialize chunks array to store recorded data
          chunks = [];

          // Event handler for dataavailable event
          mediaRecorder.addEventListener('dataavailable', (e) => {
            chunks.push(e.data);
          });

         
          const timeSlice = 1000;

          mediaRecorder.mimeType = 'audio/mp3' ;
          mediaRecorder.audioBitsPerSecond = 44100;
          mediaRecorder.start(timeSlice);

          isRecordingAudio = true;
        } catch (error) {
          console.log('Error accessing microphone:', error);
        }
      };

      // Handle stop button click event
      function stopRec(){
        // Stop recording
        mediaRecorder.stop();
        isRecordingAudio = false;

        // Create audio element and play recorded audio
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
        const audioURL = URL.createObjectURL(blob);
        document.getElementById("player").src = audioURL;
      };

      // Handle pause 
      function pauseRecord(){
        if (isRecordingAudio) {
          // Pause recording
          mediaRecorder.pause();

          isRecordingAudio = false;
        }
      };

      // Handle continue button click event
      function continueRecord(){
        if (!isRecordingAudio) {
          // Continue recording
          mediaRecorder.resume();

          isRecordingAudio = true;
        }
      }



//Start btn begin

$("#start-btn").click(()=>{
$("#welcome").hide()
$("#quizBar").show()
audioElement.play()
audioElement.addEventListener("ended", CountdownFive)
startRec()
})
//Start btn end



//ShowNextQuestion

function showNextQuestion(){
currentQuestionIndex++
if(currentQuestionIndex === data.questions[0].part1.length){
  stopRecording()
console.log("Part1 ended")
showNextPart()
return false
}
audioElement.src=data.questions[0].part1[currentQuestionIndex].audio
$("#question-bar").html(data.questions[0].part1[currentQuestionIndex].question)
$("#que-id").html(data.questions[0].part1[currentQuestionIndex].number)
audioElement.play();
audioElement.addEventListener("ended", CountdownFive)

}

//Countdown

      function CountdownFive() {
        let count = 5;
        $("#timer").html(`${count} seconds`);
        const interval = setInterval(() => {
          count--;
          timer.innerHTML = `${count} seconds`;
          if (count <= 0) {
      $("#timer").html("--:--");
            document.getElementById("beep").play();
            clearInterval(interval);
            start30SecondCountdown();
          }
        }, 1000);
      }

// Define a function to start the 30-second countdown

      function start30SecondCountdown() {
        let count = 30;
        timer.innerHTML = ` ${count} seconds`;
        const interval = setInterval(() => {
          count--;
          timer.innerHTML = `${count} seconds`;
          if (count <= 0) {
            timer.innerHTML="--:--";
            clearInterval(interval);
            showNextQuestion();

          }
        }, 1000);
}




function showNextPart(){
  $("#part1").html(`<i class="fa fa-check-circle"></i>`)
	$("#part1").addClass("bg-emerald-400");
audioTrans.src="/static/audios/test1/part2/intro.mp3"
audioTrans.play()
$("#question-bar").html("")
$("#que-id").html("")

audioTrans.addEventListener("ended", beginPartTwo)
function beginPartTwo(){
  startRecording()
document.getElementById("audio2").src=data.questions[0].part2[0].audio
$("#question-bar").html(data.questions[0].part2[0].question)
$("#que-id").html(data.questions[0].part2[0].number)
 document.getElementById("audio2").play();
document.getElementById("audio2").addEventListener("ended", startCount);
function startCount(){
var counter = 60;
        $("#timer").html(`${counter} seconds`);
        var interval2 = setInterval(() => {
          counter--;
          $("#timer").html(`${counter} seconds`);
          if (counter <= 0) {
      $("#timer").html("-:-")
            document.getElementById("beep2").play();
      document.getElementById("beep2").addEventListener("ended", ()=>{
    var counter = 120;
         $("#timer").html(`${counter} seconds`);
        var interval2 = setInterval(() => {
          counter--;
           $("#timer").html(`${counter} seconds`);
            if (counter <= 0) {
             $("#timer").html("");
            clearInterval(interval2);
      console.log("Part 2 ended")
      stopRecording()
              partThree()
            return false
          }  
        }, 1000)
      })
            clearInterval(interval2);
          }
        }, 1000)

}
}


}



//Part 3 Questions

function partThree(){
  $("#part2").html(`<i class="fa fa-check-circle"></i>`)
	$("#part2").addClass("bg-emerald-400");
audioTrans3.src="/static/audios/test1/part3/intro.mp3"
audioTrans3.play()
$("#question-bar").html("")
$("#que-id").html("")

audioTrans3.addEventListener("ended", ()=>{
  startRecording()
  document.getElementById("audio3").src=data.questions[0].part3[currentPartThree].audio
  document.getElementById("audio3").play()
 $("#question-bar").html(data.questions[0].part3[currentPartThree].question)
 $("#que-id").html(data.questions[0].part3[currentPartThree].number)
 document.getElementById("audio3").addEventListener("ended", ()=>{
  threeCountdown()
  })
})

}


function showNextThree(){
  currentPartThree++
  if(currentPartThree === data.questions[0].part3.length){
  console.log("Part3 ended")
  examEnd()
  return false
  }
  document.getElementById("audio3").src=data.questions[0].part3[currentPartThree].audio
  $("#question-bar").html(data.questions[0].part3[currentPartThree].question)
  $("#que-id").html(data.questions[0].part3[currentPartThree].number)
  document.getElementById("audio3").play();
  document.getElementById("audio3").addEventListener("ended", threeCountdown)
  
  }


  function threeCountdown() {
    let count = 5;
    $("#timer").html(`${count} seconds`);
    const interval = setInterval(() => {
      count--;
      timer.innerHTML = `${count} seconds`;
      if (count <= 0) {
  $("#timer").html("--:--");
        document.getElementById("beep").play();
        clearInterval(interval);
        threeCountdown30();
      }
    }, 1000);
  }

  function threeCountdown30() {
    let count = 30;
    timer.innerHTML = ` ${count} seconds`;
    const interval = setInterval(() => {
      count--;
      timer.innerHTML = `${count} seconds`;
      if (count <= 0) {
        timer.innerHTML="--:--";
        clearInterval(interval);
        showNextThree();

      }
    }, 1000);
}

//End exam

function examEnd(){
	document.getElementById("end-audio").play();
  $("#question-bar").html("")
  $("#que-id").html("")
    $("part3").html(`<i class="fa fa-check-circle"></i>`)
    document.getElementById("end-audio").addEventListener("ended", function(){
		stopRec();
    stopRecording()
    $("#quizBar").hide()
		document.getElementById("alert-time").classList.remove("hidden")
    ScoreCounter()

});		
}


//ScoreCounter

function ScoreCounter() {
  let count = 40;
  const interval = setInterval(() => {
    count--;
        const alertTime=document.getElementById("alert-timer")
        alertTime.innerHTML= count;
    if (count <= 0) {
    clearInterval(interval);
      document.getElementById("alert-time").classList.add("hidden")
      document.getElementById("scorepage").classList.remove("hidden");
      //calculateOverallScore()
    }
  }, 1000);
  }

  document.getElementById("audio-player").addEventListener("click", ()=>{
    document.getElementById("player").play()
  })



//Intialize function
$(document).ready(function(){
audioElement.src=data.questions[0].part1[currentQuestionIndex].audio
$("#question-bar").html(data.questions[0].part1[currentQuestionIndex].question)
$("#que-id").html(data.questions[0].part1[currentQuestionIndex].number)
})

//Intialize function ends here
}

//DomLoad
window.addEventListener("DOMContentLoaded", ()=> renderdetails())

//DomLoad ends here



