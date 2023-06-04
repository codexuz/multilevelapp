var essays=[
    "<b>Some people believe that studying history is important, while others think it is irrelevant.</b> <i>Discuss both views and give your opinion</i>.",
    "<b>Many people believe that the government should provide free education for all children.</b> <i>To what extent do you agree or disagree with this statement?</i>.",
    "<b>Some people think that technology is making life more complicated, while others think it is making life easier.</b> <i>Discuss both views and give your opinion.</i>",
    "<b>Some people think that air travel should be restricted because it causes environmental problems.</b> <i>To what extent do you agree or disagree with this statement?</i>",
    "<b>In many countries, people are living longer than before.</b> <i>What are the reasons for this, and what problems does it create?</i>",
    "<b>Some people believe that companies should focus on improving their employees' working conditions, while others think they should focus on increasing productivity.</b> <i> Discuss both views and give your opinion.</i>",
    "<b>Some people think that advertisements are useful and informative, while others think they are manipulative and should be banned.</b> <i>Discuss both views and give your opinion.</i>",
    "<b>Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, think there are better alternative ways to reduce crime.</b> <i>Discuss both views and give your opinion.</i>",
    "<b>In some countries, the government pays for health care. In others, the individual must pay for their own health care.</b> <i>Discuss the advantages and disadvantages of each system.</i>",
    "<b>Some people believe that it is important to preserve traditional culture and customs, while others think that modernization is more important.</b> <i>Discuss both views and give your opinion.</i>"
]

function showEssay(){
var randomEssay=Math.floor(Math.random()*essays.length)
document.getElementById("essay-que").innerHTML=essays[randomEssay]
}

showEssay();

