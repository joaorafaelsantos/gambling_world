var soundSelect = new Audio('common/sounds/selection.wav');
var soundStart = new Audio('common/sounds/start.ogg');
var soundTheme = new Audio('common/sounds/theme.wav');

Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};

var doSound;

var flag = true;
$(function () {
    // Start theme song
    soundTheme.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    soundTheme.play();
    // Copy the div #sectionMenu to the variale initalContent
    var initialContent = $('#sectionMenu').clone();
    // Flag of mobile detection 
    var isMobile = false;
    // Size variables
    var width;
    var height;

    // Function that checks if the website is loading on mobile browser / Changes the flag depending on the results
    function checkMobile() {
        if (/Mobi/.test(navigator.userAgent)) {
            adjustMobile()
            isMobile = true;
        } else {
            isMobile = false;
        }
    }
    // Run the function on ready
    checkMobile();

    // Function that adjust the content to mobile (the game don't work on mobile)
    function adjustMobile() {
        $('#sectionMenu').remove();
        var content = "<div id='sectionMenu' class='row text-center'><h1>This game is not available on mobile</h1></div>";
        $('#sectionLogo').after(content);
        $('h2').css("padding-top", "0px")
    }

    // Load how to play section after click
    $('#howToPlay').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/how-to-play.html')
    });

    // Load game modes section after click
    $('#play').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/game-modes.html')
    });

    // Load credits section after click
    $('#credits').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/credits.html')
    });

    $('#btnBackMenu').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        location.reload();
    });

    $(".btnSound").on("mouseover", function () {
        soundSelect.stop();
        soundSelect.play();
    });

    $("a").find("i").click(function () {
        soundStart.play();
    })

    // Game Modes

    $('#vira').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/play-vira.html');
    });
    $('#hotSpin').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/play-hot-spin.html');
    });
    $('#bancaFrancesa').click(function () {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
        $('#sectionMenu').load('common/pages/play-banca-francesa.html');
    });

    // Configurations

    doSound = function doSound() {
        soundTheme.stop();
        soundSelect.stop();
        soundStart.play();
    }

    var players = []

    function restoreLocalStorage() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var y = JSON.parse(localStorage.getItem(key));
            players.push(y);
        }
    }

    // Save on localstorage
    function saveLocalStorage() {
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            // Store
            for (var i = 0; i < players.length; i++) {
                localStorage.setItem(i.toString(), JSON.stringify(players[i]));
            }
        } else {
            console.log("Error", "Sorry, your browser does not support Web Storage...", "error");
        }
    }

    // Vira configurations


    $('#playVira').click(function () {
        doSound();
        players = [];

        if (localStorage.length != 0) {
            restoreLocalStorage();
        }
        // Create object players with player info
        var player = {};
        if (players.length == 0) {
            player.name = $("#user").val();
            player.money = 100;
            player.probability = $("#sel1 option:selected").text();
            player.timestamp = new Date().getTime() / 1000;
            players.push(player);
        } else {
            var exists = false;
            var index = 0;
            for (var i = 0; i < players.length; i++) {
                var tempName = $("#user").val();
                var tempPlayer = players[i];
                if (tempPlayer.name == tempName) {
                    exists = true;
                    index = i;
                }
            }
            if (exists == true) {
                players[index].probability = $("#sel1 option:selected").text();
                players[index].timestamp = new Date().getTime() / 1000;
                if (players[index].money < 1) {
                    players[index].money = 1;
                }
            } else if (exists == false) {
                player.name = $("#user").val();
                player.money = 100;
                player.probability = $("#sel1 option:selected").text();
                player.timestamp = new Date().getTime() / 1000;
                players.push(player);
            }
        }

        // Save on localstorage
        saveLocalStorage();

        function reload() {
            window.location.replace('common/games/vira/vira.html');
        }
        setTimeout(reload, 1000);
    });

    $("#playHotSpin").click(function () {
        doSound();
        players = [];
        if (localStorage.length != 0) {
            restoreLocalStorage();
        }
        // Create object players with player info
        var player = {};
        if (players.length == 0) {
            player.name = $("#user").val();
            player.money = 100;
            player.timestamp = new Date().getTime() / 1000;
            players.push(player);
        } else {
            var exists = false;
            var index = 0;
            for (var i = 0; i < players.length; i++) {
                var tempName = $("#user").val();
                var tempPlayer = players[i];
                if (tempPlayer.name == tempName) {
                    exists = true;
                    index = i;
                }
            }

            if (exists == true) {
                players[index].timestamp = new Date().getTime() / 1000;
            } else if (exists == false) {
                player.name = $("#user").val();
                player.money = 100;
                player.timestamp = new Date().getTime() / 1000;
                players.push(player);
            }

        }
        // Save on localstorage
        saveLocalStorage();

        function reload() {
            window.location.replace('common/games/hot-spin/hot-spin.html');
        }
        setTimeout(reload, 1000);

    });




    $("#playBancaFrancesa").click(function () {
        doSound();
        players = [];
        if (localStorage.length != 0) {
            restoreLocalStorage();
        }
        // Create object players with player info
        var player = {};
        if (players.length == 0) {
            player.name = $("#user").val();
            player.money = 100;
            player.timestamp = new Date().getTime() / 1000;
            players.push(player);
        } else {
            var exists = false;
            var index = 0;
            for (var i = 0; i < players.length; i++) {
                var tempName = $("#user").val();
                var tempPlayer = players[i];
                if (tempPlayer.name == tempName) {
                    exists = true;
                    index = i;
                }
            }

            if (exists == true) {
                players[index].timestamp = new Date().getTime() / 1000;
            } else if (exists == false) {
                player.name = $("#user").val();
                player.money = 100;
                player.timestamp = new Date().getTime() / 1000;
                players.push(player);
            }

        }
        // Save on localstorage
        saveLocalStorage();

        function reload() {
            window.location.replace('common/games/banca-francesa/banca-francesa.html');
        }
        setTimeout(reload, 1000);

    });










});