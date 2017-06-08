$(document).ready(function(){
    $("#logArea").css("height", $(window).height());
    $("#downTab").css("height", $(window).height() - $("#canvas-container").height());
    $("#downTab").css("background-size", "" + $("#downTab").width() + "px 700px" );

    $("#playBtn").click(function(){
        startSlotMachine();
    });

    $("#clearBtn").click(function(){
        $("#logArea").html("");
    });

    $("#homepBtn").click(function(){
        window.open("../../../../index.html","_self");
    });
});