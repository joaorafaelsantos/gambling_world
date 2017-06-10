$(document).ready(function () {
    $("#logArea").css("height", $(window).height());
    $("#downTab").css("height", $(window).height() - $("#canvas-container").height());
    $("#downTab").css("background-size", "" + $("#downTab").width() + "px 700px");

    $("#playBtn").click(function () {
        startSlotMachine();
    });

    $("#clearBtn").click(function () {
        $("#logArea").html("");
    });

    $("#homepBtn").click(function () {
        window.open("../../../../index.html", "_self");
    });

    // JOÃO UPDATE

    // if (localStorage.length != 0) {
    //     restoreLocalStorage(function () {

    //         for (var i = 0; i < players.length; i++) {
    //             var tempPlayer = players[i];
    //             var tempDate = new Date().getTime() / 1000;
    //             if (tempDate - tempPlayer.timestamp <= 10) {
    //                 name = tempPlayer.name;
    //                 money = tempPlayer.money;
    //                 $("#playerName").text(name);
    //                 $("#playerMoney").text(money + "€");
    //             }
    //         }
    //     });
    // }

});
// var players = [];

// function restoreLocalStorage(callback) {
//     players = [];
//     for (var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var y = JSON.parse(localStorage.getItem(key));
//         players.push(y);
//     }
//     callback();
// }

// END OF JOÃO UPDATE