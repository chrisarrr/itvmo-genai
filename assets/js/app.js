// Add your custom javascript here
// console.log("Hi from Federalist");
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

async function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  //Retrive the date
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  console.log(month);
  console.log(year);

  if(year === 2022)
  {
      //This variable use to point at the specific json file that will be use to retrive this month events.
      var thisMonthEvent;
      //Janurary is 0 to December is 11
      if(month === 0) thisMonthEvent = '../assets/events/2022/janurary.json';
      else if(month === 1) thisMonthEvent = '../assets/events/2022/february.json';
      else if(month === 2) thisMonthEvent = '../assets/events/2022/march.json';
      else if(month === 3) thisMonthEvent = '../assets/events/2022/april.json';
      else if(month === 4) thisMonthEvent = '../assets/events/2022/may.json';
      else if(month === 5) thisMonthEvent = '../assets/events/2022/june.json';
      else if(month === 6) thisMonthEvent = '../assets/events/2022/july.json';
      else if(month === 7) thisMonthEvent = '../assets/events/2022/august.json';
      else if(month === 8) thisMonthEvent = '../assets/events/2022/september.json';
      else if(month === 9) thisMonthEvent = '../assets/events/2022/october.json';
      else if(month === 10) thisMonthEvent = '../assets/events/2022/november.json'
      else if(month === 11) thisMonthEvent = '../assets/events/2022/december.json'
      //retrive the month information
      const res = await fetch(thisMonthEvent);
      const thisMonthEvents = await res.json(); //data in this case is array list of items
      console.log(thisMonthEvents);
  
  } 


  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

//Save the event 
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}
//Remove the event
function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

//Go to next month
function initButtons() {

  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    //Insert paraemeter here to intake the data and can display on the calendar
    load();
  });
//Go to previous month
  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();