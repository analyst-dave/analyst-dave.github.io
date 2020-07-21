// from data.js
var tableData = data;
// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the weather data from data.js
console.log(data);

// d3 to map each key value to table row cell
tableData.forEach((ufo) => {
    var row = tbody.append("tr");
    Object.entries(ufo).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

// jquery to set active(focus) / inactive(blur) on filter btn-group (radio)
$(".btn-group > .btn").click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});

// jquery init for datatable with list of options
$(document).ready(function () {
    //$('#ufo-table').DataTable();
    $('#ufo-table').DataTable({
        "select": true,
        "autoWidth": true,
        "paging": true,
        "pagingType": "full_numbers",
        "scrollY": "400px",
        "scrollCollapse": false,
        "pageLength": 50,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "order": [[ 0, "asc" ]],
        "stripeClasses": [ 'odd', 'even' ]
    });
    $('.dataTables_length').addClass('bs-select');
    $('.dataTables_length').addClass('rounded');
});

// when user click on the close icon for filter search
function hideSearch() {
  $('#filter-body').addClass('hidden');
  $('#hidebtn').addClass('hidden');
  $('#showbtn').removeClass('hidden');
}

// when user click on the open icon for filter search
function showSearch() {
  $('#filter-body').removeClass('hidden');
  $('#showbtn').addClass('hidden');
  $('#hidebtn').removeClass('hidden');
}

// perform single column search on displayed data based on user selection
async function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("datetime");
    filter = input.value.toUpperCase();
    table = document.getElementById("ufo-table");
    tr = table.getElementsByTagName("tr");
    console.log(tr.length);
    var val = getRadioVal(document.getElementById('form'), 'options');
    
    // toggle loading button
    $('#filter-btn-loading').removeClass('hidden');
    $('#filter-btn').addClass('hidden');

    // add some delay here
    await sleep(2000);

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      // [0] == 1st col, [1] == 2nd col, [2] == 3rd col, etc..
      td = tr[i].getElementsByTagName("td")[val];
      if (td) {
        txtValue = td.textContent || td.innerText;
        console.log(txtValue);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          console.log(tr[i]);
        } else {
          tr[i].style.display = "none";
        }
      }
    }

    // toggle loading button
    $('#filter-btn').removeClass('hidden');
    $('#filter-btn-loading').addClass('hidden');
}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}