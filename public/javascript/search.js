var searchValues = [
];

$( document ).ready(function() {
  $( "#tags" ).autocomplete({
    source: searchValues,
    classes: {
      "ui-autocomplete": "main__input-choices"
    }
  });
  $( "#tags" ).keyup(function() {
    let url = "http://localhost:3000/getResult?value=" + $( "#tags" ).val();
    $.getJSON( url , function( results ) {
      searchValues = [];
      results.forEach(function(result) {
        // $('.input__list').append(
          searchValues.push(result._source.name ); //result._type says that it is battle - how to use this?
      // );
      });
      $( "#tags" ).autocomplete({
        source: searchValues
      });
    });
    if(event.code == 'Enter') {
      console.log('hi');
      console.log(searchValues)
      if(searchValues.indexOf($("#tags").val())>-1) {
        renderMap($("#tags").val());
      }
    }
    // checkIfSubmit
  });
});

function renderMap(id) {
  selectedBattle = id;
  console.log(id);
  showPage(0);
  drawPoint();
}
