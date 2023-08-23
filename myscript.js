window.onload = function() {
  let words = [
      "alike","like","friend","foe","girl","young","more","stylish",
       "love","enemy","game","guess","check","me","you","ammar","less",
       "common","let","go","stop","war","alive","more"
  ]

  let speedTiming = 0;
  let answerBox = document.getElementById("input-guess")
  let randomTextBox = document.getElementById("guess-text")
  let settingButton = document.getElementById("setting")
  let difficulty = document.getElementById("level-hard")
  let scoreBox = document.getElementById("score")
  let score = 0
  let timerBox = document.getElementById("timer") 
  let time = 10
  let WIN = false
  let typingSpeedBox = document.getElementById("typing-speed")

  answerBox.onkeypress = function(e){
    e.preventDefault()
    answerBox.value += e.key  
    if (answerBox.value === randomTextBox.textContent.trim() ){
      WIN = true
    }

    if (speedTiming === 0) {
        speedTiming = new Date()
        console.log("this is what get called")

      }

      else {
        let speedPerChar = new Date() - speedTiming
        console.log(speedPerChar)
        speedTiming = new Date()
        typingSpeedBox.textContent = `Speed ${speedPerChar}ms: per character`

      }

    

  }

  settingButton.onclick = function(event) {
  	event.preventDefault()
    console.log("What is Happening")
    console.log(difficulty.value)
  	switch(difficulty.value) {
      case "Hard":
         difficulty.value = "Easy"
         break
      case "Easy":
         difficulty.value = "Hard"
         break

  	}
     
  }

  function randomIndex(){
   return Math.floor(Math.random() * (words.length-1)) + 1
  }

  function randomText(){
    let result = ''
    if (difficulty.value === "Hard") {
      for (let i=0; i < 2; ++i) {
        result += words[randomIndex()]

      }
    }
    else
      result = words[randomIndex()]
    return result
  }
  //main game loop
  function gameLoop() {
      WIN = false 
      time = 10
      answerBox.value = ''
      randomTextBox.textContent  = ''
      randomTextBox.textContent = randomText()
      let timeout = setTimeout(() => {
         if (WIN){
          score += 1
          scoreBox.textContent = `Score: ${score}`
          alert("You win!")


        }
        else{
          alert("You lose!")
        }
        answerBox.textContent =''
       },10000)    
       //this function update timer every 1000ms
       function updateTime(){
          time -= 1
          timerBox.textContent = `Time left: ${time}`
          if (answerBox.value === randomTextBox.textContent.trim() ){
            WIN = true
            answerBox.textContent = ''
          }
       }

        //main asynchronous update for the timer
       let interval = setInterval(updateTime, 1000)
       
    
       //set the game loop again after ten 10s
       setTimeout(() => {
        clearInterval(interval)
        gameLoop() 
      },10000)
  }
  
  gameLoop()

}