let currentIndex=0;
var vocabulary = JSON.parse(localStorage.getItem("vocabulary"))
var form = document.querySelector("form")
    	
 const Save=(event)=>{
     event.preventDefault()
    var wordValue=$("#wordData").val();
    var transValue=$("#translationData").val();

     if(!vocabulary){
           vocabulary=[];
         }

         let template={
        word: wordValue,
        translation: transValue
    }
      
        vocabulary.push(template)
        localStorage.setItem("vocabulary", JSON.stringify(vocabulary))

        // Manually reset form elements in Onsen UI
    $("#wordData").val('');
    $("#translationData").val('');
 }


//Next Card

$("#prev").hide()
function showNextCard(){
        currentIndex++
        //progress+=progress_val
       // $(".progress_bar").width(progress+"px")
        $("#prev").show()
        if(currentIndex===vocabulary.length-1){
            $("#next").hide()
        } 
        $("#word").html(vocabulary[currentIndex].word)
        $("#translation").html(vocabulary[currentIndex].translation)
        var wordValue=$("#word").html()
    const voiceName = "UK English Male";
      responsiveVoice.speak(wordValue, voiceName);
    
}


    function showPrevCard(){
        currentIndex--
        $("#next").show()
       if(currentIndex===0){
            $("#prev").hide()
            
        } 

        $("#word").html(vocabulary[currentIndex].word)
        $("#translation").html(vocabulary[currentIndex].translation)
        var wordValue=$("#word").html()
    const voiceName = "UK English Male";
      responsiveVoice.speak(wordValue, voiceName);
    
    }

    //Intialize

$(document).ready(function(){
    if(!vocabulary){
        $("#word").html("No words yet...")
        $("#next").hide()
        $("#prev").hide()

    }
$("#word").html(vocabulary[currentIndex].word)
$("#translation").html(vocabulary[currentIndex].translation)
var wordValue=$("#word").html()
const voiceName = "UK English Male";
responsiveVoice.speak(wordValue, voiceName);

})
    
