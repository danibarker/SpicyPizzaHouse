const btn = document.getElementById('get-date')

function myFunction() {
    var x = document.getElementById("myDate").value;
    document.getElementById("date-selected").innerHTML = x;
  }

  btn.addEventListener('click', myFunction)