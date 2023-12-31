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
let recorder, audio_stream;

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
    transcripts.innerHTML += capitalize(text) + '. ';
    var texttranscription =  document.getElementById("result").value
    localStorage.setItem("transcription", JSON.stringify(texttranscription))
  }
});

micBtn.addEventListener('click', async () => {
 
await startRecording();
  
});


//Capitalize letter

function capitalize(sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  

//Recorder
function startRec() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      audio_stream = stream;
      recorder = new MediaRecorder(stream);

      // when there is data, compile into object for preview src
      recorder.ondataavailable = function (e) {
        const url = URL.createObjectURL(e.data);
		document.getElementById("player").src = url;

      };
      recorder.start();

    });
}


function stopRec() {
    recorder.stop();
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
console.log("Part1 ended")
stopRecording()
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
document.getElementById("audio2").src=data.questions[0].part2[0].audio
$("#question-bar").html(data.questions[0].part2[0].question)
$("#que-id").html(data.questions[0].part2[0].number)
 document.getElementById("audio2").play();
document.getElementById("audio2").addEventListener("ended", startCount);
function startCount(){
  startRecording()
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
            stopRecording()
      console.log("Part 2 ended")
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
  document.getElementById("audio3").src=data.questions[0].part3[currentPartThree].audio
  document.getElementById("audio3").play()
 $("#question-bar").html(data.questions[0].part3[currentPartThree].question)
 $("#que-id").html(data.questions[0].part3[currentPartThree].number)
 document.getElementById("audio3").addEventListener("ended", ()=>{
  startRecording()
  threeCountdown()
  })
})

}


function showNextThree(){
  currentPartThree++
  if(currentPartThree === data.questions[0].part3.length){
    examEnd()
  console.log("Part3 ended")
  return false
  }
  document.getElementById("audio4").src=data.questions[0].part3[currentPartThree].audio
  $("#question-bar").html(data.questions[0].part3[currentPartThree].question)
  $("#que-id").html(data.questions[0].part3[currentPartThree].number)
  document.getElementById("audio4").play();
  document.getElementById("audio4").addEventListener("ended", threeCountdown)
  
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
    $("#part3").html(`<i class="fa fa-check-circle"></i>`)
    $("#part3").addClass("bg-emerald-400");
    document.getElementById("end-audio").addEventListener("ended", function(){
		stopRec();
    stopRecording()
    $("#quizBar").hide()
		$("#alert-time").show()
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
      $("#alert-time").hide()
      $("#scorepage").show();
      //calculateOverallScore()
    }
  }, 1000);
  }

 


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



