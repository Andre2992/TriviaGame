//start game fuction//
$("#start").on('click', function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})    
// Quiz questions//
var questions = [{
    question: "Which NBA team won the most titles in the 90s?",
        answers : ["Toront Raptors", "Portland Trailblazers", "Chicago Bulls", "Huston Rockets"],
    correctAnswer: "Chicago Bulls",
    images:"assets/images/bulls.gif",
}, {
    question: "Which NBA team played at Amway Arena 1989-2010 ?",
        answers : ["Charolette Hornets", "Goldenstate Warriors", "Orlando Magic", "Sacramento Kings"],
    correctAnswer: "Orlando Magic",
    image: "assets/images/orlando.gif",
}, {
    question: "Everyone knows about Dr.J, but do you know his real name ?",
        answers : ["Julius Erving", "Michael Jordan", "Magic Johnson", "Allen Iverson"],
    correctAnswer: "Julius Erving",
    image: "assets/images/drj.gif",
}, {
    question: "Which retired player wore number 1 throughout his entire NBA career?",
        answers : ["Shaquille O'neal", "Alvin Williams", "Tracy Mcgrady", "Dwight Howard"],
    correctAnswer: "Tracy Mcgrady",
    image: "assets/images/tracy.gif",
}, {
    question: "Who was referred to as the Black Mamba?",
    answers: ["Lebron James", "Grant Hill", "Larry Bird", "Kobe Bryant"],
    correctAnswer: "Kobe Bryant",
    image: "assets/images/kobe.gif",
}, {
    question: "What does NBA stand for?",
    answers: ["National Basketball Assignment", "National Bowling Agreement ", "Nothing But Average", "National Basketball Association"],
    correctAnswer: "National Basketball Association",
    image: "assets/images/nba.jpeg",
}, {
    question: "What city is attached to the Raptors ?",
        answers : ["Toronto Raptors", "Boston Raptors", "Cleveland Raptors", "Dallas Raptors"],
    correctAnswer: "Toronto Raptors",
    image: "assets/images/raptors.gif",
}, {
    question: "This player quite bluntly, put up some solid numbers in his career.He scored 38, 387 points, grabbed 17, 440 boards, and blocked 3, 189 shots.",
        answers: ["Wilt Chamberlain", "Bill Russell", "Sheldon Lewis", "Kareem Abdul Jabbar"],
    correctAnswer: "Kareem Abdul Jabbar",
    image: "assets/images/Kareem.gif",
}];
// Game variables//
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    incomplete: 0,
    // create timer function//
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter < 0) {
            console.log("time up");
            game.timeUp();
        }

    },
    //load next question if user answers or if timer runs out//
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#container").html("<h2>TIME REMAINING <span id='counter'>30</span>Seconds</h2>");
        $("#container").append('<h2>' + questions[game.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#container").append('<button class="answer-button" id="button-' +i+ '" data-name="' + questions[game.currentQuestion].answers[i] + '">'
                + questions[game.currentQuestion].answers[i] + '</button>');

        }
    },
    //Function to show next question//
    nextQuestion: function () {
        game.counter = 30;
        $("#counter").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    //time up function if user fails to answer//
    timeUp: function () {
        game.incomplete++;
        clearInterval(timer);
        $("#container").html("<h2 id='Out of Time'>Out Of Time!!!</h2>");
        $("#container").append('<h3>The correct Answer was:' + questions[game.currentQuestion].correctAnswer +'</h3>');
        setTimeout(game.nextQuestion, 2 * 1000);
    },
    //User results will be displayed during the end of the game//
    results: function () {
        clearInterval(timer);
        $("#container").html('<h2>Finished</h2>');
        $("#container").append("<h3>Correct: " + game.correct + "<h3>");
        $("#container").append("<h3>Incorrect: " + game.incorrect + "<h3>");
        $("#container").append("<h3>Incomplete: " + game.incomplete + "</h3>");
        $("#container").append("<button id='reset'>Reset</button>");
    },
    //function listening to what user clicked//
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    //create function that logs user's correct inputs//
    answeredCorrectly: function () {
        console.log("right");
        clearInterval(timer);
        game.correct++;
        $("#container").html('<h2 id="Right">Right!</h2>');
        $("#container").html("<img src=\".\\"+questions[game.currentQuestion].images+"\">")
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2 * 1000)
        }
    },
    //create function that logs user's incorrect inputs//
    answeredIncorrectly: function () {
        console.log("wrong");
        clearInterval(timer);
        game.incorrect++;
        $("#container").html('<h2 id="Wrong">Wrong!</h2>');
        $("#container").append('<h3>The correct Answer was: '+ questions[game.currentQuestion].correctAnswer+'</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 2 * 1000)
        }
    },
    //created a reset function//
    reset: function(){
        game.currentQuestion=0;
        game.counter=30;
        game.correct=0;
        game.incorrect=0;
        game.incomplete=0;
        game.loadQuestion();
    }
    
}