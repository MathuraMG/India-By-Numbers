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
      console.log(results);
      searchValues = [];
      results.forEach(function(result) {
        searchValues.push(result._source.name);
      });
      console.log(searchValues);
      /* THIS IS NOT EFFICIENT - FIX THIS */
      $( "#tags" ).autocomplete({
        source: searchValues,
        classes: {
          "ui-autocomplete": "main__input-choices"
        }
      });
    });
  });
});
