var RALOBH = "76561198019033820";
var theSTRIG = "76561198045150039";

function theSTRIG1() {
  $.ajax({
    url:'https://crossorigin.me/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=45006881A2B6B7D0733AA48750D85531&format=json&steamids=76561198045150039',
    dataType:'json',
    success:function(result){

      var statOn;

      var check = result.response.players[0].personastate;
      if(check == 1){
        statOn = "Online";
      }
      else if(check == 2){
        statOn = "Busy";
      }
      else if(check == 3){
        statOn = "Away";
      }
      else if(check == 4){
        statOn = "Snooze";
      }
      else if(check == 5){
        statOn = "Looking for Trade";
      }
      else if(check == 6){
        statOn = "Looking to Play";
      }
      else{
        statOn = "Offline";
      }

      var avatar = check == 1 || check == 5 || check == 6 ? '<img class="img-responsive center-block" style="border-radius:100px;border:solid 5px;border-color:#1ca949;" src="'+result.response.players[0].avatarfull+'"></img>' : '<img class="img-responsive center-block" style="border-radius:100px;border:solid 5px;border-color:#becbdc;" src="'+result.response.players[0].avatarfull+'"></img>';

      var stat = check == 1 || check == 5 || check == 6 ? 'theSTRIG is <span style="color:#1ca949;">'+statOn+'</span>' : 'theSTRIG is <span style="color:#becbdc;">'+statOn+'</span>';

      var game = check == 1 && result.response.players[0].gameextrainfo != undefined  ? 'and is Now Playing '+result.response.players[0].gameextrainfo
   : "";

      var html =
          '<div class="row"><div class="col-sm-12">'+
          avatar+'</div></div><div class="row"><div class="col-sm-12"><h3 class="text-center">'+
          stat+'</h3></div></div><div class="row"><div class="col-sm-12"><h3 class="text-center">'+
          game+'</h3></div></div>';

      $("#steamed").html(html);
      //console.log(result.response.players[0]);
    }
  });
}

function theSTRIG2(){
  $.ajax({
    url:'https://crossorigin.me/https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=45006881A2B6B7D0733AA48750D85531&format=json&steamid=76561198045150039&include_appinfo=1&include_played_free_games=1',
    dataType:"json",
    success:function(result){
      var appid=570;
      var gameTime;

      for(var i = 0; i < (result.response.games).length; i++){
        if(result.response.games[i].appid == 570){
          gameTime = (result.response.games[i].playtime_forever)/60;
        }
      }

      $("#counter").html('<h3 class="text-center">'+Math.ceil(gameTime)+' Hours of Gameplay</h3>');
      //console.log(result.response.games[31]);
    }
  });
}


$(document).ready(function(){
  theSTRIG1();
  theSTRIG2();
});
