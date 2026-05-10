const age = document.getElementById("age");
const submit = document.getElementById("submit");

const currentAge = document.getElementById("currentAge");
const DOB = document.getElementById("DOB");
const InYears = document.getElementById("InYears");
const InMonths = document.getElementById("InMonths");
const InWeeks = document.getElementById("InWeeks");
const InDays = document.getElementById("InDays");
const InHours = document.getElementById("InHours");
const InMinutes = document.getElementById("InMinutes");
const InSeconds = document.getElementById("InSeconds");
const DaysLeft = document.getElementById("DaysLeft");

const today = new Date();

// Set max date to today so users can't born in the future
let maxDate = today.toISOString().substring(0, 10);
age.setAttribute("max", maxDate);

submit.addEventListener("click", function (e) {
    if (age.value === "" || new Date(age.value) > today) {
        alert("Please enter a valid Date of Birth.");
        return;
    }

    const birthday = new Date(age.value);
    const diff = today - birthday;

    // Time Constants
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneWeek = oneDay * 7;

    // 1. Calculate Cumulative Totals
    const TotalYears = today.getFullYear() - birthday.getFullYear();
    const TotalMonths = (today.getFullYear() - birthday.getFullYear()) * 12 + (today.getMonth() - birthday.getMonth());
    const TotalWeeks = Math.floor(diff / oneWeek);
    const TotalDays = Math.floor(diff / oneDay);
    const TotalHours = Math.floor(diff / oneHour);
    const TotalMinutes = Math.floor(diff / oneMinute);
    const TotalSeconds = Math.floor(diff / oneSecond);

    // 2. Format Date as MM/DD/YYYY
    const mm = String(birthday.getMonth() + 1).padStart(2, '0');
    const dd = String(birthday.getDate()).padStart(2, '0');
    const yyyy = birthday.getFullYear();
    const formattedDate = `${mm}/${dd}/${yyyy}`;

    // 3. Days Remaining until Next Birthday
    let nextBday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (today > nextBday) {
        nextBday.setFullYear(today.getFullYear() + 1);
    }
    // Use Math.ceil so that 0.5 days rounds up to 1 day remaining
    const totalDaysLeft = Math.ceil((nextBday - today) / oneDay);

    // 4. Update UI
    DOB.innerText = `${birthday.toLocaleString("default", { weekday:
        "long",
    })}, ${birthday.toLocaleString("default", {month:
        "long"
    })} ${birthday.getDate()},  ${birthday.getFullYear()}`;

    InYears.innerText = TotalYears;
    InMonths.innerText = TotalMonths;
    InWeeks.innerText = TotalWeeks.toLocaleString();
    InDays.innerText = TotalDays.toLocaleString();
    InHours.innerText = TotalHours.toLocaleString();
    InMinutes.innerText = TotalMinutes.toLocaleString();
    InSeconds.innerText = TotalSeconds.toLocaleString();
    nextBirthday.innerText = totalDaysLeft;

    // Simple display string
    if(today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()){
        currentAge.innerText = (`${TotalYears} Year(s) old Today! Happy Birthday🎂`)
        currentAge.classList.add("birthday-active");

        const end = Date.now + (2*1000);
        (function frame(){
            confetti({
                particleCount: 1000,
                angle: 60,
                spread: 100,
                origin: { x: 0 },
                colors: ['#bb0000', '#ffffff', '#ffea00', '#00ff00', '#ff0000']
            });
            confetti({
                particleCount: 1000,
                angle: 120,
                spread: 100,
                origin: { x: 1 },
                colors: ['#bb0000', '#ffffff', '#ffea00', '#00ff00', '#ff00cc']
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    } 
    else{
        currentAge.innerText = `${TotalYears} Years Old!`;
        currentAge.classList.remove("birthday-active");
    }
});