const btnDate = document.getElementById('get-date')
const date = document.getElementById("myDate")
const dateSelect= document.getElementById("date-select")
const appt = document.getElementById('appt')
const btnTime = document.getElementById('get-time')
const timeSelect = document.getElementById('time-select')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const number = document.getElementById('number')
const email = document.getElementById('email')
const guest = document.getElementById('guest')
const fulName = document.getElementById('full-name')


function dateSelected() {

    dateSelect.textContent = date.value
    if(appt.value === "" ||
    fname.value === '' ||
    number.value ==='') {
      alert('Please Select Time, Enter Name and Phone Number')
    } else {
  timeSelect.textContent = appt.value + ' Hrs';
  fulName.textContent = fname.value + " " + lname.value
  }
  }


  btnDate.addEventListener('click', dateSelected)
