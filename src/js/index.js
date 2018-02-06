$(function () {

    var about = document.getElementsByClassName("about-modal");
    var careers = document.getElementsByClassName("careers-modal");
    var projects = document.getElementsByClassName("portfolio-modal");

    // Setup request
    $.ajax({
        // GET 
        type: 'GET',
        // Fix for the Firefox Parsing Error
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        },

        // Directory to JSON File 
        url: './js/modal.json',
        dataType: 'json',
        contentType: "application/json",

        // On success
        success: function (data) {
            // Logging the JSON Data 
            // console.log(data);

            // About JSON Data
            var aboutTitle = data.about[0].title,
                aboutStr1 = "<p>" + data.about[1].str1 + "</p>",
                aboutStr2 = "<p>" + data.about[2].str2 + "</p>",
                aboutImgSrc = data.about[3].img.src,
                aboutImgAlt = data.about[3].img.alt;

            // Careers JSON Data
            var careersTitle = data.careers[0].title,
                careersStr1 = "<p>" + data.careers[1].str1 + "</p>",
                careersStr2 = "<p>" + data.careers[2].str2 + "</p>",
                careersStr3 = "<p>" + data.careers[3].str3 + "</p>",
                careersStr4 = "<p>" + data.careers[4].str4 + "</p>";


            imgModalInformation = function (x) {
                // Projects 
                var projectsTitle = '',
                    projectsStr1 = '<p class="str1">' + data.projects.str1 + '</p>',
                    projectsStr2 = '<p class="str2">' + data.projects.str2 + '</p>',
                    projectImgSrc = '',
                    projectImgAlt = '';
                // console.log(el);

                console.log(data.projects.carousel);

                for (var i = 0; i < data.projects.carousel.length; i++) {

                    var el = $(x).attr('id');

                    if (data.projects.carousel[i].id == el) {
                        projectsTitle += data.projects.carousel[i].title;
                        projectImgSrc += data.projects.carousel[i].src;
                        projectImgAlt += data.projects.carousel[i].alt;
                    }

                }
                $(projects)
                    .find(".string-content p")
                    .siblings()
                    .remove();
    
                $(projects)
                    .find("h3")
                    .text(projectsTitle);
    
                $(projects)
                    .find(".string-content")
                    .append(projectsStr1, projectsStr2);

                $(projects)
                    .find("img")
                    .attr({
                        "src": projectImgSrc,
                        "alt": projectImgAlt
                    });
            };



            //  Append modal information
            $(about)
                .find("h3")
                .text(aboutTitle);
            $(about)
                .find(".string-content")
                .append(aboutStr1)
                .append(aboutStr2);
            $(about)
                .find("img")
                .attr({
                    "src": aboutImgSrc,
                    "alt": aboutImgAlt
                });

            $(careers)
                .find("h3")
                .text(careersTitle);
            $(careers)
                .find(".string-content")
                .append(careersStr1, careersStr2, careersStr3, careersStr4);
        }
    });

    // Modal open
    var anchorAbout = document.getElementsByClassName("about");
    var anchorCareers = document.getElementsByClassName("careers");
    var anchorProjects = document.getElementsByClassName("proj-item");
    var close = document.getElementsByClassName("close-btn");

    $(anchorAbout).on('click', function (e) {

        // prevents native anchor behavior
        e.preventDefault();

        // Hide Careers Modal if open already
        $(careers).hide();

        // close mobile menu
        $("nav.mobile-menu").hide(500);

        // Show About Modal
        $(about).show();

    });

    $(anchorCareers).on('click', function (e) {

        // prevents native anchor behavior
        e.preventDefault();

        // Hide About Modal if open already
        $(about).hide();

        // close mobile menu
        $("nav.mobile-menu").hide(500);

        // Show Careers Modal
        $(careers).show();
    });

    $(anchorProjects).on('click', function (e) {
        e.preventDefault();

        imgModalInformation($(this));
        $(projects).show();
    });
    

    $(close).on('click', function (e) {

        // Hide all modals
        $(about).hide();
        $(careers).hide();
        $(projects).hide();
    });


    // Mobile Menu
    $("a.mobile-menu-toggle").on('click', function () {
        // console.log('Event: ', 'clicked');
        $("nav.mobile-menu").show(500);
    });

    // Click off Mobile Menu
    $(".close-mobile-menu").on('click', function () {
        // console.log('Event: ', 'clicked');
        $("nav.mobile-menu").hide(500);
    });


    // Scroll to  target given anchor with an id
    $("a[href^=\\#]").on('click', function (e) {

        // prevents native anchor behavior
        e.preventDefault();

        // store destination
        var dest = $(this).attr('href');

        // close mobile menu
        $("nav.mobile-menu").hide(500);

        // animate towards the dest via 2ms
        $('html, body').animate({
            scrollTop: $(dest).offset().top
        }, 2000);
    });
});
