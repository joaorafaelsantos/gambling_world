$(function () {
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

    // // On window resize detect the size of the window and do the mobile function
    // $(window).on('resize', function () {
    //     width = $(window).width();
    //     height = $(window).height();
    //     checkMobile();
    //     // If the page isn't loading from mobile browser but have a width smaller or equal than 1024, it adjust to mobile
    //     if (!isMobile && width <= 1024) {
    //         adjustMobile()
    //         // If the page isn't loading from mobile browser but have a width greater than 1024, it adjust to desktop
    //     } else if (!isMobile && width > 1024) {
    //         adjustDesktop();
    //     }
    // });

    // Function that adjust the content to mobile (the game don't work on mobile)
    function adjustMobile() {
        $('#sectionMenu').remove();
        var content = "<div id='sectionMenu' class='row text-center'><h1>This game is not available on mobile</h1></div>";
        $('#sectionLogo').after(content);
        $('h2').css("padding-top", "0px")
    }
    // // Function that adjust the content to desktop
    // function adjustDesktop() {
    //     $('#sectionMenu').remove();
    //     $('#sectionLogo').after(initialContent);
    //     $('h2').css("padding-top", "125px")
    // }

    // Load how to play section after click
    $('#howToPlay').click(function () {
        $('#sectionMenu').load('pages/howToPlay.html')
    });

    // Load game modes section after click
    $('#play').click(function () {
        $('#sectionMenu').load('pages/gameModes.html')
    });

    // Load credits section after click
    $('#credits').click(function () {
        $('#sectionMenu').load('pages/credits.html')
    });

    $('#btnBackMenu').click(function () {
        location.reload();
    });



});