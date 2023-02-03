// Elements
let hrs_element = document.getElementById("hrs");
let mins_element = document.getElementById("mins");
let secs_element = document.getElementById("secs");
let container = document.querySelector(".container");

// Buttoms
let increase_hrs = document.getElementById("increase_hrs");
let increase_mins = document.getElementById("increase_mins");
let increase_secs = document.getElementById("increase_secs");
let decrease_hrs = document.getElementById("decrease_hrs");
let decrease_mins = document.getElementById("decrease_mins");
let decrease_secs = document.getElementById("decrease_secs");

let start_btn = document.getElementById("start_btn");
let pause_btn = document.getElementById("pause_btn");
let stop_btn = document.getElementById("stop_btn");
let reset_btn = document.getElementById("reset_btn");
let buttons = document.querySelectorAll(".buttons");

//Time Varibales
let hrs = 0;
let mins = 0;
let secs = 0;

// set timer -> increase
function increase(temp) {
    if (temp == "hrs") {
        hrs++;
        if (hrs < 10) {
            hrs_element.innerHTML = `0${hrs}`;
        } else {
            hrs_element.innerHTML = `${hrs}`;
        }
    } else if (temp == "mins") {
        mins++;
        if (mins >= 10 && mins < 60) {
            mins_element.innerHTML = `${mins}`;
        } else if (mins < 10) {
            mins_element.innerHTML = `0${mins}`;
        } else {
            mins = 0;
            mins_element.innerHTML = `0${mins}`;
        }
    } else if (temp == "secs") {
        secs++;
        if (secs >= 10 && secs < 60) {
            secs_element.innerHTML = `${secs}`;
        } else if (secs < 10) {
            secs_element.innerHTML = `0${secs}`;
        } else {
            secs = 0;
            secs_element.innerHTML = `0${secs}`;
        }
    }
}

// set timer -> decrease
function decrease(temp) {
    if (temp == "hrs") {
        hrs--;
        if (hrs > 0) {
            if (hrs < 10) {
                hrs_element.innerHTML = `0${hrs}`;
            } else {
                hrs_element.innerHTML = `${hrs}`;
            }
        } else {
            hrs = 0;
            hrs_element.innerHTML = `0${hrs}`;
        }
    } else if (temp == "mins") {
        mins--;
        if (mins > 0) {
            if (mins < 10) {
                mins_element.innerHTML = `0${mins}`;
            } else {
                mins_element.innerHTML = `${mins}`;
            }
        } else {
            mins = 0;
            mins_element.innerHTML = `0${mins}`;
        }
    }
    if (temp == "secs") {
        secs--;
        if (secs >= 0) {
            if (secs < 10) {
                secs_element.innerHTML = `0${secs}`;
            } else {
                secs_element.innerHTML = `${secs}`;
            }
        } else {
            secs = 0;
            secs_element.innerHTML = `0${secs}`;
        }
    }
}

let timer_interval = null;
let isPause = false;

function count_down_begin() {
    if (isPause == false) {
        secs--;
        if (secs == 0 && mins > 0) {
            secs = 59;
            mins--;
            if (mins == 0 && hrs > 0) {
                mins = 59;
                hrs--;
            }
        }

        // do not delete: for debugging purposes
        // console.log(`${hrs}: ${mins} : ${secs}`);

        if (secs == 0 && mins == 0 && hrs == 0) {
            
            // reset_timer();
            after_timer_animation();
        }

        // displaying the content:
        // for hrs
        if (hrs < 10) {
            hrs_element.innerHTML = `0${hrs}`;
        } else {
            hrs_element.innerHTML = `${hrs}`;
        }
        // for mins
        if (mins < 10) {
            mins_element.innerHTML = `0${mins}`;
        } else {
            mins_element.innerHTML = `${mins}`;
        }
        // for secs
        if (secs < 10) {
            secs_element.innerHTML = `0${secs}`;
        } else {
            secs_element.innerHTML = `${secs}`;
        }
    }
}

function start_timer() {
    // handling exceptions
    if (secs == 0 && mins == 0 && hrs == 0) {
        return;
    }

    // if( play_counter == 0){
        // disapperaing the arrow buttons
        for (let i of buttons) {
            i.style.display = 'none';
        }

        // styling buttons
        start_btn.classList.add("disable_button");
        pause_btn.classList.remove("disable_button");

        // Starting the timer
        isPause = false;
        timer_interval = setInterval(count_down_begin, 1000);
    // }
}

function pause_timer(){
    clearInterval(timer_interval);
    timer_interval = null;
    isPause = true;

    // styling buttons
    start_btn.classList.remove("disable_button");
    pause_btn.classList.add("disable_button");
}

let timer_animation_interval = null;

function after_timer_animation(){

    stop_btn.classList.remove("disable_button");
    pause_btn.classList.add("disable_button");

    let background_color = "white";
    let font_color = "black";
    timer_animation_interval = setInterval(() => {
        if (background_color == "white"){
            background_color = "red";
            font_color = "white";
        }
        else{
            background_color = "white";
            font_color = "black";    
        }
        
        container.style.backgroundColor = background_color;
        container.style.color = font_color;

    }, 1000)
}

function stop_timer(){

    clearInterval(timer_animation_interval);
    clearInterval(timer_interval);
    container.style.backgroundColor = "white";
    container.style.color = "black";
    reset_timer();
}

function reset_timer() {
    clearInterval(timer_interval);
    timer_interval = null;
    
    hrs = 0;
    mins = 0;
    secs = 0;
    hrs_element.innerHTML = `0${hrs}`;
    mins_element.innerHTML = `0${mins}`;
    secs_element.innerHTML = `0${secs}`;

    for (let i of buttons) {
        i.style.display = "block";
    }

    play = 0;
    pause = false;
    stop_counter = false;

    // restoring button styling
    start_btn.classList.remove("disable_button");
    pause_btn.classList.add("disable_button");
    stop_btn.classList.add("disable_button");
}

increase_hrs.addEventListener("click", function () {
    increase("hrs");
});

increase_mins.addEventListener("click", function () {
    increase("mins");
});

increase_secs.addEventListener("click", function () {
    increase("secs");
});

decrease_hrs.addEventListener("click", function () {
    decrease("hrs");
});

decrease_mins.addEventListener("click", function () {
    decrease("mins");
});

decrease_secs.addEventListener("click", function () {
    decrease("secs");
});

start_btn.addEventListener("click", start_timer);
pause_btn.addEventListener("click", pause_timer);
stop_btn.addEventListener("click", stop_timer);
reset_btn.addEventListener("click", reset_timer);
