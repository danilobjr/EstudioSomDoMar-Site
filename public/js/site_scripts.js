jQuery(document).ready(function() {
   	var h_cont=856;
	var h, new_h;
	setHeight();
	h=new_h;
	setSize();
	function setHeight(){
		new_h=$(window).height();
	}
	function setSize(){
		if (h>h_cont) {
			$('#content').stop().animate({paddingTop:~~((h-h_cont)/2)});	
		} else {
			$('#content').stop().animate({paddingTop:0});	
		}
	}
	setInterval(setNew,1);
	function setNew(){
		setHeight();
		if (h!=new_h) {
			h=new_h;
			setSize();
		}
	}
    /*---------------------------------------------------*/
        jQuery('#carousel').jcarousel({
            auto: 3,
            wrap: 'circular'
        });
        jQuery('#carousel2').jcarousel({wrap: 'circular'});
        jQuery('#carousel3').jcarousel({wrap: 'circular'});
});

$(window).load(function () {
    //Gallery arrows-------------------------------------------------------------------------------------
    /* TIREI O EFEITO DA SOBREPOSIÇÃO DE IMAGENS NO CARROSSEL
    $('#carousel .img_act').css({opacity:0});	
    $('#carousel a').hover(function(){
    $(this).find('.img_act').stop().animate({opacity:1})						 
    }, function(){
    $(this).find('.img_act').stop().animate({opacity:0})						 
    });
    
    $('#carousel2 .img_act').css({opacity:0});	
    $('#carousel2 a').hover(function(){
    $(this).find('.img_act').stop().animate({opacity:1})						 
    }, function(){
    $(this).find('.img_act').stop().animate({opacity:0})						 
    });

    $('#carousel3 .img_act').css({opacity:0});	
    $('#carousel3 a').hover(function(){
    $(this).find('.img_act').stop().animate({opacity:1})						 
    }, function(){
    $(this).find('.img_act').stop().animate({opacity:0})						 
    });
    */
    //carousel2 zoomImg ---------------------------------------------------------------------------------
    //$('.zoomImg, .playSong').fadeTo(500, 0);

    /*$('.zoomImg, .playSong').hover(function () {
    $(this).stop().fadeTo(500, 0.5);
    }, function () {
    $(this).stop().fadeTo(500, 0);
    });
    */
    //Hover a -------------------------------------------------------------------------------------------
    $('.col1 p a').hover(function () {
        $(this).stop().animate({ color: '#37a101' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#606060' }, 300, "easeOutSine")
    })
    $('.ex-8').hover(function () {
        $(this).stop().animate({ color: '#d24c40' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#fff' }, 300, "easeOutSine")
    })
    $('.col-icons a').hover(function () {
        $(this).stop().animate({ color: '#d24c40' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#fff' }, 300, "easeOutSine")
    })
    $('.col6 a').hover(function () {
        $(this).stop().animate({ color: '#fff' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#d24c3f' }, 300, "easeOutSine")
    })
    $('.col9 a').hover(function () {
        $(this).stop().animate({ color: '#d24c40' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#fff' }, 300, "easeOutSine")
    })
    $('.privacy a').hover(function () {
        $(this).stop().animate({ color: '#d24c3f' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#8d8d8d' }, 300, "easeOutSine")
    })
    $('.contacts a').hover(function () {
        $(this).stop().animate({ color: '#d24c3f' }, 400, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#fff' }, 300, "easeOutSine")
    });

    $('.sub_menu a').hover(function () {
        $(this).stop().animate({ color: '#fff' }, 200, "easeOutSine")
    }, function () {
        $(this).stop().animate({ color: '#b0aba1' }, 200, "easeOutSine")
    });

    //Button read more-----------------------------------------------------------------------------------
    $('.more1, .ex-8').sprites({ method: 'gStretch', hover: true })
    //Content switch----------------------------------------------------------------------------------------------
    $('ul#menu').superfish({
        delay: 800,
        animation: { height: 'show' },
        speed: 600,
        autoArrows: false,
        dropShadows: false
    });
    var content = $('#content'),
	    nav = $('.menu');
    var firstSpl = true;
    content.tabs({
        actFu: function (_) {
            if (_.curr) {
                if (firstSpl == true) {
                    _.curr.css({ left: '1750px' }).stop(true).delay(1050).animate({ left: "0px" }, 800, 'easeOutExpo');
                    firstSpl = false;
                }
                else {
                    _.curr.css({ left: '1750px' }).stop(true).delay(225).animate({ left: "0px" }, 800, 'easeOutExpo');
                }
            }

            if (_.prev) {
                _.prev
					.stop(true).animate({ left: "-1750px" }, 550, 'easeInCubic', function () { })
            }
        },
        preFu: function (_) {
            $('header').css({ top: '-150px' }).delay(100).animate({ top: 0 });
            $('.menu').css({ top: '130px', opacity: 0 }).delay(600).animate({ top: '90px', opacity: 1 }, 200, 'easeOutSine').animate({ top: '115px' }, 200, 'easeOutSine').animate({ top: '110px' }, 300, 'easeOutSine');
            $('#logo').css({ left: '-1500px', opacity: 0 }).delay(400).animate({ left: '10px', opacity: 1 }, 400, 'easeOutExpo').animate({ left: '0' }, 400, 'easeOutSine');
            $('#player').css({ 'top': '120px', opacity: 0 }).delay(750).animate({ 'top': '73px', opacity: 1 }, 200, 'easeOutSine').animate({ 'top': '88px' }, 200, 'easeOutSine').animate({ 'top': '83px' }, 300, 'easeOutSine');
            //$('#social').css({ top: '-40px' }).delay(900).animate({ top: '18px' }, 400, 'easeOutExpo').animate({ top: '9px' }, 400, 'easeOutSine');
            content.css({ display: 'block' });
            _.li.css({ left: "2000px" })
        }
    })

    //Main menu---------------------------------------------------------------------------------------------------    

    nav.navs({
        useHash: true,
        //defHash: '#!/page_home',
        defHash: '#!/home',
        hoverIn: function (li) {
            $(".mText", li).stop().animate({ color: "#fff" }, 750, 'easeOutExpo');
        },
        hoverOut: function (li) {
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $(".mText", li).stop().animate({ color: "#b0aba1" }, 500, 'easeOutExpo');
            }
        }
    })

    nav.navs(function (n, _) {
        content.tabs(n);
    })

    // Services Menu ---------------------------------------------------------------------------------------------

    $('.sub_menu a').click(function (e) {
        e.preventDefault();
        var _this = $(this);
        var _menu = _this.closest('nav');
        _menu.find('a').removeClass('activeMenu');

        var slider = _menu.siblings('.sub_menu_content').find('.slider');
        var slideId = _this.attr('href');

        _menu.find('a[href=' + slideId + ']').addClass('activeMenu');

        var leftPosition =
            slider
                .children().filter('[id=' + slideId + ']')
                .attr('data-slide-left-position');
        slider.stop().animate({ left: leftPosition }, 400, 'easeOutExpo');
    });

    // Scroll

    $('.scrollable').mCustomScrollbar();

    // html5Audio

    $('#player').html5Audio({ songSources: '.song', useRadio: true, radioSource: '.radioSource' });

    // page_artists

    //$('#page_artists a')
    $('#artistas a')
        .mouseenter(function (e) {
            var currentTarget = $(e.currentTarget);
            var figcaption = currentTarget.find('figcaption');
            var height = figcaption.outerHeight();
            var top = figcaption.position().top;
            figcaption.css('top', top - height);
        })
        .mouseleave(function (e) {
            var currentTarget = $(e.currentTarget);
            var figcaption = currentTarget.find('figcaption');
            figcaption.css('top', '159px');
        });

    // banner

    $(".banner").revolution(
    {
        delay: 9000,
        startheight: 490,
        startwidth: 890,

        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        onHoverStop: "on",
        hideThumbs: 200,
        navigationType: "bullet",
        navigationStyle: "round",
        navigationArrows: "verticalcentered",

        touchenabled: "on",

        navOffsetHorizontal: 0,
        navOffsetVertical: 20,
        shadow: 3,
        fullWidth: "off"
    });

    var caseUpFirstLetter = function (elements) {
        elements.each(function (i, obj) {
            var _this = $(obj);
            var palavraComPrimeiraLetraMaiuscula = _this.text().toLowerCase().replace(/\b[a-z]/g, function (letra) {
                return letra.toUpperCase();
            });
            _this.text(palavraComPrimeiraLetraMaiuscula);
        });
    };

    var checkExistHttpInHref = function (sentenca) {
        var exist = false;

        if (sentenca.indexOf('http://') >= 0) {
            exist = true;
        }

        if ((sentenca.indexOf('https://') >= 0) && !exist) {
            exist = true;
        }

        return exist;
    };

    var putHttpInHref = function (elements) {
        elements.each(function (i, obj) {
            var _this = $(obj);
            if (!checkExistHttpInHref(_this.attr('href'))) {
                _this.attr('href', 'http://' + _this.attr('href'));
            }
        });
    };

    putHttpInHref($('.social a'));
    caseUpFirstLetter($('.phone'));
});
