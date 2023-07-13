//Game functions
let currentFlashcard=0
$("#prev").hide()


const id = new URLSearchParams(window.location.search).get("id");

  const renderdetails= async ()=>{
    const res= await fetch('https://server-five-dusky.vercel.app/games/'+ id);
    var flashcards= await res.json();

    var progress_val=190/flashcards.words.length
let progress=progress_val;
$("#idNum").html(`${currentFlashcard+1}/${flashcards.words.length}`)
$(".progress_bar").width(progress+"px")

 $("#check").click(function(){
  $("#check").attr("disabled","true")
	const taken=$("#answer").val().replace(/\s|-|'/g, "")
const TypedValue=taken.toLowerCase()
  const correctTranslation = flashcards.words[currentFlashcard].word.replace(/\s|-|'/g, "");
  if (TypedValue===correctTranslation) {
    $(".img_container").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-13 h-13 text-green-500">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
</svg>
`)
    $(".img_container").removeClass("bg-red-300")
    $(".img_container").addClass("bg-green-300")
    setTimeout(nextWord, 1500)
		var wordValue=flashcards.words[currentFlashcard].word
    const voiceName = "UK English Male";
    responsiveVoice.speak(wordValue, voiceName);
      // Add true answer to the list
    $("#your-answers").append(`<li class="bg-gray-800 py-3 px-5 w-full my-2 text-green-400">${flashcards.words[currentFlashcard].word} - ${flashcards.words[currentFlashcard].translation}</li>`);
  
}
else{

    $(".img_container").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-13 h-13 text-rose-600">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
</svg>

`)
    $(".img_container").removeClass("bg-green-300")
    $(".img_container").removeClass("bg-blue-300")
    $(".img_container").addClass("bg-red-300")
  // Add false answer to the list
    $("#your-answers").append(`<li class="bg-gray-800 py-3 px-5 w-full my-2 text-red-400">${flashcards.words[currentFlashcard].word} - ${flashcards.words[currentFlashcard].translation}</li>`);
    var wordValue=flashcards.words[currentFlashcard].word
    const voiceName = "UK English Male";
    responsiveVoice.speak(wordValue, voiceName);
}

});
 

 //Next word

$("#next").click(function(){
$("#check").removeAttr("disabled")
$("#answer").val('')
    currentFlashcard++
    progress+=progress_val
    $("#idNum").html(`${currentFlashcard+1}/${flashcards.words.length}`)
    $("#tr").html(flashcards.words[currentFlashcard].translation)
     $(".img_container").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-13 h-13 text-blue-700">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>

`)
    $(".img_container").removeClass("bg-green-300")
    $(".img_container").removeClass("bg-red-300")
    $(".img_container").addClass("bg-blue-300")
    $(".progress_bar").width(progress+"px")
    $("#prev").show()
    if(currentFlashcard===flashcards.words.length-1){
      $("#next").hide()
      $("#result").show()
    }
    
  });

  
  $("#prev").click(function(){
    $("#check").removeAttr("disabled")
    currentFlashcard--
    $("#answer").val('')
    progress-=progress_val
    $(".progress_bar").width(progress+"px")
    $("#tr").html(flashcards.words[currentFlashcard].translation) 
    $("#next").show()
    $("#quiz").hide()
    if(currentFlashcard===0){
      $("#prev").hide()
      
    }       
    
  })



//Next Function
function nextWord(){
  $("#check").removeAttr("disabled")
$("#answer").val('')
    currentFlashcard++
    progress+=progress_val
    $("#idNum").html(`${currentFlashcard+1}/${flashcards.words.length}`)
    $("#tr").html(flashcards.words[currentFlashcard].translation)
     $(".img_container").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-13 h-13 text-blue-700">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>

`)
    $(".img_container").removeClass("bg-green-300")
    $(".img_container").removeClass("bg-red-300")
    $(".img_container").addClass("bg-blue-300")
    $(".progress_bar").width(progress+"px")
    $("#prev").show()
    if(currentFlashcard===flashcards.words.length-1){
      $("#next").hide()
      $("#result").show()
    }
}    

  //Intialize

$(document).ready(function(){
  $("#cue").html(flashcards.words[currentFlashcard].word)
$("#tr").html(flashcards.words[currentFlashcard].translation)

})
	

$("#result").click(()=>{
  $("#quiz_page").addClass("hidden")
  $("#result_page").removeClass("hidden")
})


}

window.addEventListener("DOMContentLoaded", ()=> renderdetails())
