(function () {
    "use strict";

    $(window).scroll(() => {
        const scrollTop = $(window).scrollTop();

        if (scrollTop > 200) $("#fh5co-nav").addClass("fixed");
        else $("#fh5co-nav").removeClass("fixed");
    });

    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
            if (
                !container.is(e.target) &&
                container.has(e.target).length === 0
            ) {
                if ($("body").hasClass("offcanvas")) {
                    $("body").removeClass("offcanvas");
                    $(".js-fh5co-nav-toggle").removeClass("active");
                }
            }
        });
    };

    var offcanvasMenu = function () {
        $("#page").prepend('<div id="fh5co-offcanvas" />');
        $("#fh5co-nav").prepend(
            '<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>'
        );
        var clone1 = $(".menu-1 > ul").clone();
        $("#fh5co-offcanvas").append(clone1);

        $("#fh5co-offcanvas ul li a").each((key, link) => {
            $(link).click((e) => {
                e.preventDefault();
                const href = link.getAttribute("href");
                window.location.href = href;
                $("body").removeClass("offcanvas");
                $(".js-fh5co-nav-toggle").removeClass("active");
            });
        });

        $("#fh5co-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
        $("#fh5co-offcanvas").find("li").removeClass("has-dropdown");

        // Hover dropdown menu on mobile
        $(".offcanvas-has-dropdown")
            .mouseenter(function () {
                var $this = $(this);

                $this
                    .addClass("active")
                    .find("ul")
                    .slideDown(500, "easeOutExpo");
            })
            .mouseleave(function () {
                var $this = $(this);
                $this
                    .removeClass("active")
                    .find("ul")
                    .slideUp(500, "easeOutExpo");
            });

        $(window).resize(function () {
            if ($("body").hasClass("offcanvas")) {
                $("body").removeClass("offcanvas");
                $(".js-fh5co-nav-toggle").removeClass("active");
            }
        });
    };

    var burgerMenu = function () {
        $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
            var $this = $(this);

            if ($("body").hasClass("offcanvas")) {
                $("body").removeClass("offcanvas");
            } else {
                $("body").addClass("offcanvas");
            }
            $this.toggleClass("active");
            event.preventDefault();
        });
    };

    var contentWayPoint = function () {
        var i = 0;
        $(".animate-box").waypoint(
            function (direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("animated-fast")
                ) {
                    i++;

                    $(this.element).addClass("item-animate");
                    setTimeout(function () {
                        $("body .animate-box.item-animate").each(function (k) {
                            var el = $(this);
                            setTimeout(
                                function () {
                                    var effect = el.data("animate-effect");
                                    if (effect === "fadeIn") {
                                        el.addClass("fadeIn animated-fast");
                                    } else if (effect === "fadeInLeft") {
                                        el.addClass("fadeInLeft animated-fast");
                                    } else if (effect === "fadeInRight") {
                                        el.addClass(
                                            "fadeInRight animated-fast"
                                        );
                                    } else {
                                        el.addClass("fadeInUp animated-fast");
                                    }

                                    el.removeClass("item-animate");
                                },
                                k * 200,
                                "easeInOutExpo"
                            );
                        });
                    }, 100);
                }
            },
            { offset: "85%" }
        );
    };

    var dropdown = function () {
        $(".has-dropdown")
            .mouseenter(function () {
                var $this = $(this);
                $this
                    .find(".dropdown")
                    .css("display", "block")
                    .addClass("animated-fast fadeInUpMenu");
            })
            .mouseleave(function () {
                var $this = $(this);

                $this
                    .find(".dropdown")
                    .css("display", "none")
                    .removeClass("animated-fast fadeInUpMenu");
            });
    };

    var testimonialCarousel = function () {
        var owl = $(".owl-carousel-fullwidth");
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            responsiveClass: true,
            nav: false,
            dots: true,
            smartSpeed: 800,
            autoHeight: true,
        });
    };

    var goToTop = function () {
        $(".js-gotop").on("click", function (event) {
            event.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: $("html").offset().top,
                },
                500,
                "easeInOutExpo"
            );

            return false;
        });

        $(window).scroll(function () {
            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $(".js-top").addClass("active");
            } else {
                $(".js-top").removeClass("active");
            }
        });
    };

    // Loading page
    var loaderPage = function () {
        $(".fh5co-loader").fadeOut("slow");
    };

    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        mobileMenuOutsideClick();
        parallax();
        offcanvasMenu();
        burgerMenu();
        contentWayPoint();
        dropdown();
        testimonialCarousel();
        goToTop();
        loaderPage();
    });

    $(".modal-venue").each(function () {
        var jumbo = $(this).find(".jumbo-img");
        var thumbs = $(this).find(".img-thumbs img");

        thumbs.each(function () {
            $(this).on("click", function () {
                thumbs.removeClass("on");

                var src = $(this).attr("src");
                jumbo.attr("src", src);

                $(this).addClass("on");
            });
        });
    });

    $(".send-email-btn").on("click", () => {
        const data = {
            service_id: "",
            template_id: "",
            user_id: "",
            template_params: {
                name: $("#name").val(),
                phone: $("#phone").val(),
                message: $("#message").val(),
            },
        };
        $.ajax({
            url: "https://api.emailjs.com/api/v1.0/email/send",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
        })
            .done(function () {
                swal(
                    "Pesan Terkirim!",
                    "Terimakasih telah mengirim pesan kepada kami!",
                    "success"
                );
                $("#name").val("");
                $("#phone").val("");
                $("#message").val("");
            })
            .fail(function () {
                swal(
                    "Pesan Tidak Terkirim!",
                    "Mohon dicoba di lain kesempatan!",
                    "error"
                );
            });
    });
})();
