$(document).ready(function(){

    $("#nameButton").click(function(){
      let colorPick = addColors();
      let search = $("#searchInput").val();
      var $query = $.getJSON('https://api.magicthegathering.io/v1/cards?name=' + search + colorPick);
      $query.done((data) => {
        if($query.status !== 200){
          return;
        }
        console.log(data);
        display(data);
      })
    })

    $("#typeButton").click(function(){
      let colorPick = addColors();
      let search = $("#searchInput").val();
      var $query = $.getJSON('https://api.magicthegathering.io/v1/cards?subtypes=' + search + colorPick);
      $query.done((data) => {
        if($query.status !== 200){
          return;
        }
        console.log(data);
        display(data);
      })
    })

    $("#setsButton").click(function(){
      var $query = $.getJSON('https://api.magicthegathering.io/v1/sets');
      $query.done((data) => {
        if($query.status !== 200){
          return;
        }
        console.log(data);
        let result = data.sets;
        $('#result').empty();
        for(let i = 0; i < result.length; i++){
          $('#result').append("<p>Name: " + result[i].name + " (" + result[i].code + ")</p>");
          $('#result').append("<p>Year: " + result[i].releaseDate + "</p>");
          //$('#result').append("<p>Name: " + result[i].name + "</p>");
        }
      })
    })

    $('#boosterButton').click(function(){
      let set = $("#setSearch").val();
      var $query = $.getJSON('https://api.magicthegathering.io/v1/sets/' + set + '/booster');
      $query.done((data) => {
        if($query.status !== 200){
          return;
        }
        console.log(data);
        display(data);
      })
    })

    function addColors(){
      if ($("#blue:checked").val() != "blue"
      && $("#black:checked").val() != "black"
      && $("#red:checked").val() != "red"
      && $("#green:checked").val() != "green"
      && $("#white:checked").val() != "white"){
        return "";
      } else {
        let colorSearch = "&colors=";
        if ($("#blue:checked").val() == "blue") {colorSearch += "blue";}
        if ($("#black:checked").val() == "black") {colorSearch += "|black";}
        if ($("#red:checked").val() == "red") {colorSearch += "|red";}
        if ($("#green:checked").val() == "green") {colorSearch += "|green";}
        if ($("#white:checked").val() == "white") {colorSearch += "|white";}
        return colorSearch
      }
    }

    function display(data){
      $('#result').empty();
      let result = data.cards;
      for(let i =0; i < result.length; i++){
        $('#result').append("<img class='pokePic' src=" + result[i].imageUrl + ">");
        $('#result').append("<p>Name: " + result[i].name + "</p>");
        $('#result').append("<p>Colors: " + result[i].colors + "</p>");
        $('#result').append("<p>subtype: " + result[i].subtypes + "</p>");
        $('#result').append("<p>Cost: " + result[i].manaCost + "</p>");
        $('#result').append("<p>text: " + result[i].text + "</p>");
      }
    }

})
