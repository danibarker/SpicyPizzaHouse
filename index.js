const btnDate = document.getElementById('get-date')
const date = document.getElementById("myDate")
const dateSelect= document.getElementById("date-select")
const appt = document.getElementById('appt')
const btnTime = document.getElementById('get-time')
const timeSelect = document.getElementById('time-select')

function dateSelected() {

    dateSelect.textContent = date.value
    if(appt.value === "") {
      alert('Please Select Time')
    } else {
  timeSelect.textContent = appt.value + ' Hrs'
  }
  }


  btnDate.addEventListener('click', dateSelected)
  btnTime.addEventListener('click', timeSelected)