
        //Countdown Timer. How much time left in different occasions, lunch break, bathroom usage etc.


let countdown; // it is good to have the global variable here and pop it in IFEE and not having in a global name space;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]'); 

                            //------------CountDown timer fn---------------//

function timer(seconds){
    //we could've use setInterval() and pass function inside and decrement the number in setInterval but in IOS 
        // when scrolled it stops all the setIntervals and other browsers stop setInterval after sometime when laptop isn't in use.  
        //Probably they have some trigger for this. That is why we use different method here;
clearInterval(countdown);//clear all existing timers;
const now = Date.now(); // it is new static method which gives us current timebut does the same as (new Date()).getTime();...
const then = now + seconds * 1000; // we multiply by 1000 because now value is in miliseconds;
displayTimeLeft(seconds); //run this fn as soon as timer fn is invoked and then run timeLeft fn again as a part of setIntrvl
displayEndTime(then); // diplay the fn displayEndTime;
                    // here we need to display the amount of time left every second and this is where we use setInterval();
countdown = setInterval(()=>{   //setInterval doesnt know when to stop so we have to make it manually below;
            //setInterval doesn't start right away it starts after second or two, we have to change it and make it start right away to display;
    const secondsLeft = Math.round((then - Date.now()) / 1000); // we use Date.now to get current time and divide it by 1000 to get in mlseconds;
            //Check if need to stop it;
if(secondsLeft < 0){ // when it is 0 it will stop;
    clearInterval(countdown);   // and update the countdown variable;
    return;
}
        //Display it
displayTimeLeft(secondsLeft);
}, 1000)
}

                                    //-----------------Time Display--------------------//

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60); // to show the minutes and rounding it to number without decimal;
    const remainderSeconds = seconds % 60; // to calculate how much second left;
    // to display in a way of timer and make numbers < 10 display as 09 instead of just 9; 
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; 
    timerDisplay.textContent = display; // Bringing to the DOM by assigning the timerDisplay to div class and defining it as display varibale;
    document.title = display; // to display the countdown on a tab name;
}

                        //----------------------------Display countDown endTime-------------------------//

function displayEndTime(timestamp){ // timestamp is our then value; property which comes as a date/time stamp
    const end = new Date(timestamp); // we create new date object from timestamp;
    const hour = end.getHours();    // get hours
    const minutes = end.getMinutes();   // get minutes from timestamp;
    // it is good to leave it if we want to display military/EU time it will display as 15:00 if it is 3pm; or create a variable -
    //const adjustedHour = hour > 12 ? hour - 12 : hour instead of passing it below and pass that variable inside the syntax
    endTime.textContent = `I'll Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`; 
}


                                //----------------Buttons and forms-----------------//

function startTimer(){  //parseInt helps us to convert the string from data-time property in div tag to number 
    const seconds = parseInt(this.dataset.time); // the property from dataset data-time we indicated in div tag;
timer(seconds); //hook the buttons with fn above;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//working with inout forms. we can select it document.[propertyName & property name of nested tag input tag];
document.customForm.addEventListener('submit', function(e){
e.preventDefault(); //stop from reloading the page;
const mins = this.minutes.value; //this keyword here is our form tag
console.log(mins);
timer(mins * 60); // to pass the fn timer which takes seconds for that we pass mins and convert it to seconds;
this.reset();

})