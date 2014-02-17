(function ($) {

    // Namespaces

    $.html5Audio = {
        defaultSettings: {},
        config: {},
        that: {},
        object: {},
        const : {
            autoClose: true
        },
        element: {
            audio: {},
            mainContainer: {},
            playPauseContainer: {},
            rightContainer: {},
            playBtn: {},
            pauseBtn: {},
            volumeMaxBtn: {},
            volumeMuteBtn: {},
            radioBtn: {},
            songNameContainer: {},
            songName: {},
            albumCoverContainer: {},
            albumCoverImg: {},
            songSources: []
        },
        styleClasses: {
            deactivated: 'h5aDeactivated',
            playerPlaying: 'h5aPlaying',
            playerPaused: 'h5aPaused',
            sourcePlaying: 'h5aSourcePlaying',
            sourcePaused: 'h5aSourcePaused',
            muted: 'h5aMuted',
            radioSource: '.radioSource'
        },
        animationClasses: {
            showHideSong: 'h5aAnimShowHideSong',
            showCover: 'h5aAnimShowCover'
        }
    };

    // Default Settings

    $.html5Audio.defaultSettings = {
        playButtonImgSrc: '/img/site/play.png',
        pauseButtonImgSrc: '/img/site/pause.png',
        volumeMaxButtonImgSrc: '/img/site/volume_max.png',
        volumeMuteButtonImgSrc: '/img/site/volume_muted.png',
        radioButtonImgSrc: '/img/site/radio.png',
        noMusicText: 'Nenhuma Musica Selecionada',
        defaultAlbumCover: '/img/site/cd.png',
        songSources: [],
        useRadio: false
    };

    // Plugin

    $.fn.html5Audio = function (userSettings) {

        //// ** CONSTRUCTOR ** ////

        $.html5Audio.that = $(this);
        $.html5Audio.config = $.extend({}, $.html5Audio.defaultSettings, userSettings); ;

        var constructor = $.html5Audio.object.constructor();
        $.html5Audio.object.configurator();
        var animator = $.html5Audio.object.animator();
        var behavior = $.html5Audio.object.behavior(constructor, animator);
        $.html5Audio.object.binder(behavior, animator);


        return {
            play: behavior.play,
            pause: behavior.pause,
            togglePlayPause: behavior.togglePlayPause,
            toggleMute: behavior.toggleMute
        };
    };

    // Objects

    $.html5Audio.object.constructor = function () {

        //// ** CONSTRUCTOR ** ////

        // Main Container

        $.html5Audio.element.mainContainer = $('<div>').addClass('html5Audio');

        // Controls Container

        var controlsContainer = $('<div>').addClass('h5aControls');
        controlsContainer.appendTo($.html5Audio.element.mainContainer);

        // Song Container

        $.html5Audio.element.songContainer = $('<div>').addClass('h5aSong');
        $.html5Audio.element.songContainer.appendTo($.html5Audio.element.mainContainer);

        // Song Name Container

        $.html5Audio.element.songNameContainer = $('<div>').addClass('h5aSongName');
        $.html5Audio.element.songNameContainer.appendTo($.html5Audio.element.songContainer);

        // Song Name

        $.html5Audio.element.songName = $('<p>').text($.html5Audio.config.noMusicText);
        $.html5Audio.element.songName.appendTo($.html5Audio.element.songNameContainer);

        // Album Cover Container

        $.html5Audio.element.albumCoverContainer = $('<div>').addClass('h5aAlbumCover');
        $.html5Audio.element.albumCoverContainer.appendTo($.html5Audio.element.songContainer);

        // Album Cover Image

        $.html5Audio.element.albumCoverImg = $('<img>').addClass('h5aDefaultAlbumCover').attr('src', $.html5Audio.config.defaultAlbumCover);
        $.html5Audio.element.albumCoverImg.appendTo($.html5Audio.element.albumCoverContainer);

        // Play / Pause Container

        $.html5Audio.element.playPauseContainer = $('<div>').addClass('h5aPlayPause');
        $.html5Audio.element.playPauseContainer.appendTo(controlsContainer);

        if ($.html5Audio.config.useRadio) {
            // Volume Container

            $.html5Audio.element.rightContainer = $('<div>').addClass('h5aRadioContainer');

            // passando a classe q o usuário informou como sendo o objeto q contém os atributos (data-*) necessários 
            // para obter a música da rádio para o objeto styleClasses q detém o nome das classes
            var radioSourceClass = $.html5Audio.styleClasses.radioSource = $.html5Audio.config.radioSource;
            // repassando os atributos da fonte da rádio para o rightContainer
            $.html5Audio.element.rightContainer.data($(radioSourceClass).data());
            $.html5Audio.element.rightContainer.addClass($.html5Audio.config.songSources.substring(1));

            $.html5Audio.element.rightContainer.appendTo(controlsContainer);
        } else {
            // Volume Container

            $.html5Audio.element.rightContainer = $('<div>').addClass('h5aVolume');
            $.html5Audio.element.rightContainer.appendTo(controlsContainer);
        }

        // Control Buttons

        $.html5Audio.element.playBtn = $('<img>').addClass('h5aPlayBtn').attr('src', $.html5Audio.config.playButtonImgSrc);
        $.html5Audio.element.pauseBtn = $('<img>').addClass('h5aPauseBtn').attr('src', $.html5Audio.config.pauseButtonImgSrc);

        $.html5Audio.element.playBtn.appendTo($.html5Audio.element.playPauseContainer);
        $.html5Audio.element.pauseBtn.appendTo($.html5Audio.element.playPauseContainer);

        if ($.html5Audio.config.useRadio) {
            // Radio Button

            $.html5Audio.element.radioBtn = $('<img>').addClass('h5aRadioBtn').attr('src', $.html5Audio.config.radioButtonImgSrc);
            $.html5Audio.element.radioBtn.appendTo($.html5Audio.element.rightContainer);
        } else {
            // Control Buttons

            $.html5Audio.element.volumeMaxBtn = $('<img>').addClass('h5aVolumeMaxBtn').attr('src', $.html5Audio.config.volumeMaxButtonImgSrc);
            $.html5Audio.element.volumeMuteBtn = $('<img>').addClass('h5aVolumeMuteBtn').attr('src', $.html5Audio.config.volumeMuteButtonImgSrc);
            $.html5Audio.element.volumeMaxBtn.appendTo($.html5Audio.element.rightContainer);
            $.html5Audio.element.volumeMuteBtn.appendTo($.html5Audio.element.rightContainer);
        }

        // Putting on markup

        $.html5Audio.element.mainContainer.appendTo($.html5Audio.that);


        //// ** METHODS ** ////

        var showMusicName = function (songSource) {
            //var artist = songSource.attr('data-h5a-song-artist');
            //var songName = songSource.attr('data-h5a-song-name');
            var artist = songSource.data().h5aSongArtist; // attr('data-h5a-song-artist');
            var songName = songSource.data().h5aSongName; // attr('data-h5a-song-name');

            $.html5Audio.element.songName.text(artist + ' - ' + songName);
        };

        var showAlbumCover = function (songSource) {
            var imgSrc = (songSource.data().h5aCoverUrl) ? songSource.data().h5aCoverUrl : $.html5Audio.defaultSettings.defaultAlbumCover;
            $.html5Audio.element.albumCoverImg.attr('src', imgSrc);
        };

        return {
            showMusicName: showMusicName,
            showAlbumCover: showAlbumCover
        };
    };

    $.html5Audio.object.configurator = function () {
        //// ** CONSTRUCTOR ** ////

        // Initial State: Deactivated

        $.html5Audio.element.mainContainer.addClass($.html5Audio.styleClasses.deactivated);

        // Setting Song Sources

        $.html5Audio.element.songSources = $($.html5Audio.config.songSources);
    };

    $.html5Audio.object.behavior = function (constructor, animator) {

        var deactivatedClass = $.html5Audio.styleClasses.deactivated;
        var playerPlayingClass = $.html5Audio.styleClasses.playerPlaying;
        var playerPausedClass = $.html5Audio.styleClasses.playerPaused;
        var sourcePlayingClass = $.html5Audio.styleClasses.sourcePlaying;
        var sourcePausedClass = $.html5Audio.styleClasses.sourcePaused;
        var volumeMuteClass = $.html5Audio.styleClasses.muted;

        //// ** METHODS ** ////

        var isActive = function () {
            return !$.html5Audio.element.mainContainer.hasClass(deactivatedClass);
        };

        var activate = function () {
            $.html5Audio.element.mainContainer.removeClass(deactivatedClass);
            $.html5Audio.element.mainContainer.addClass(playerPausedClass);
        };

        var play = function () {
            if (!isActive()) return;

            $.html5Audio.element.mainContainer.removeClass(playerPausedClass);
            $.html5Audio.element.mainContainer.addClass(playerPlayingClass);

            animator.animateSongName();
            $.html5Audio.element.audio.play();
        };

        var pause = function () {
            if (!isActive()) return;

            $.html5Audio.element.mainContainer.removeClass(playerPlayingClass);
            $.html5Audio.element.mainContainer.addClass(playerPausedClass);

            animator.stopAnimationSongName();
            $.html5Audio.element.audio.pause();
        };

        var togglePlayPause = function () {
            if (!isActive()) return;

            var mainContainer = $.html5Audio.element.mainContainer;

            if (mainContainer.hasClass(playerPlayingClass)) {
                var playingSong = $.html5Audio.element.songSources.filter('.' + sourcePlayingClass);
                playingSong.removeClass(sourcePlayingClass).addClass(sourcePausedClass);
                pause();
            }
            else {
                var playingSong = $.html5Audio.element.songSources.filter('.' + sourcePausedClass);
                playingSong.addClass(sourcePlayingClass).removeClass(sourcePausedClass);
                play();
            }
        };

        var playSong = function (songUrl) {
            if (!isActive()) { activate(); }

            var mainContainer = $.html5Audio.element.mainContainer;
            mainContainer.find('audio').remove();

            $.html5Audio.element.audio = $('<audio>').attr({ src: songUrl }).appendTo(mainContainer).get(0);

            loud();
            play();
            animator.showHideSong();
        };

        var togglePlaySongSource = function (songSource) {
            if (songSource.hasClass(sourcePlayingClass)) {
                songSource.removeClass(sourcePlayingClass).addClass(sourcePausedClass);
                pause();
            }
            else if (songSource.hasClass(sourcePausedClass)) {
                songSource.removeClass(sourcePausedClass).addClass(sourcePlayingClass);
                play();
            }
            else {
                $.html5Audio.element.songSources.removeClass(sourcePlayingClass).removeClass(sourcePausedClass);
                songSource.addClass(sourcePlayingClass);
                var songUrl = songSource.data().h5aSongUrl;
                constructor.showMusicName(songSource);
                constructor.showAlbumCover(songSource);
                playSong(songUrl);
            }
        };

        var loud = function () {
            $.html5Audio.element.mainContainer.removeClass(volumeMuteClass);
        };

        var mute = function () {
            $.html5Audio.element.mainContainer.addClass(volumeMuteClass);
        };

        var toggleMute = function () {
            var isMuted = $.html5Audio.element.audio.muted;

            if (isMuted) {
                loud();
            }
            else {
                mute();
            }

            $.html5Audio.element.audio.muted = !isMuted;
        };


        return {
            play: play,
            pause: pause,
            togglePlayPause: togglePlayPause,
            playSong: playSong,
            togglePlaySongSource: togglePlaySongSource,
            toggleMute: toggleMute
        }
    };

    $.html5Audio.object.animator = function () {
        //// ** CONSTRUCTOR ** ////

        var showHideSongAnimationClass = $.html5Audio.animationClasses.showHideSong;
        var showCoverAnimationClass = $.html5Audio.animationClasses.showCover;

        //// ** METHODS ** ////

        var animateSongName = function () {
            var songName = $.html5Audio.element.songName;
            var width = songName.text().length * 8;
            songName.css({ left: '100px' });
            songName.stop().animate({ left: '-=' + (100 + width) }, 8000, 'linear', animateSongName);
        };

        var stopAnimationSongName = function () {
            var songName = $.html5Audio.element.songName;
            songName.stop();
            songName.css({ left: 0 });
        };

        var showHideSong = function () {
            $.html5Audio.element.songContainer.removeClass(showHideSongAnimationClass);
            setTimeout(function () { $.html5Audio.element.songContainer.addClass(showHideSongAnimationClass); }, 200);
        };

        var showSong = function (autoClose) {
            $.html5Audio.element.albumCoverContainer.addClass(showCoverAnimationClass);
        };

        var hideSong = function () {
            $.html5Audio.element.albumCoverContainer.removeClass(showCoverAnimationClass);
        };


        return {
            animateSongName: animateSongName,
            stopAnimationSongName: stopAnimationSongName,
            showSong: showSong,
            hideSong: hideSong,
            showHideSong: showHideSong
        };
    };

    $.html5Audio.object.binder = function (behavior, animator) {
        //// ** CONSTRUCTOR ** ////

        var songSources = $.html5Audio.element.songSources;

        if (!$.isEmptyObject(songSources)) {
            songSources.click(function (e) {
                e.preventDefault();
                var _this = $(e.currentTarget);
                behavior.togglePlaySongSource(_this);
            });
        }

        $.html5Audio.element.playPauseContainer.click(function (e) { behavior.togglePlayPause(); });

        if (!$.html5Audio.config.useRadio) {
            $.html5Audio.element.rightContainer.click(function (e) { behavior.toggleMute(); });
        }
    };

})(jQuery);

//(function ($) {

//    // Namespaces

//    $.html5Audio = {
//        defaultSettings: {},
//        config: {},
//        that: {},
//        object: {},
//        const : {
//            autoClose: true
//        },
//        element: {
//            audio: {},
//            mainContainer: {},
//            playPauseContainer: {},
//            rightContainer: {},
//            playBtn: {},
//            pauseBtn: {},
//            volumeMaxBtn: {},
//            volumeMuteBtn: {},
//            radioBtn: {},
//            songNameContainer: {},
//            songName: {},
//            albumCoverContainer: {},
//            albumCoverImg: {},
//            songSources: []
//        },
//        styleClasses: {
//            deactivated: 'h5aDeactivated',
//            playerPlaying: 'h5aPlaying',
//            playerPaused: 'h5aPaused',
//            sourcePlaying: 'h5aSourcePlaying',
//            sourcePaused: 'h5aSourcePaused',
//            muted: 'h5aMuted'
//        },
//        animationClasses: {
//            showHideSong: 'h5aAnimShowHideSong',
//            showCover: 'h5aAnimShowCover'
//        }
//    };

//    // Default Settings

//    $.html5Audio.defaultSettings = {
//        playButtonImgSrc: '/img/site/play.png',
//        pauseButtonImgSrc: '/img/site/pause.png',
//        volumeMaxButtonImgSrc: '/img/site/volume_max.png',
//        volumeMuteButtonImgSrc: '/img/site/volume_muted.png',
//        radioButtonImgSrc: '/img/site/radio.png',
//        noMusicText: 'Nenhuma Musica Selecionada',
//        defaultAlbumCover: '/img/site/cd.png',
//        songSources: [],
//        useRadio: false
//    };

//    // Plugin

//    $.fn.html5Audio = function (userSettings) {

//        //// ** CONSTRUCTOR ** ////

//        $.html5Audio.that = $(this);
//        $.html5Audio.config = $.extend({}, $.html5Audio.defaultSettings, userSettings); ;

//        var constructor = $.html5Audio.object.constructor();
//        $.html5Audio.object.configurator();
//        var animator = $.html5Audio.object.animator();
//        var behavior = $.html5Audio.object.behavior(constructor, animator);
//        $.html5Audio.object.binder(behavior, animator);


//        return {
//            play: behavior.play,
//            pause: behavior.pause,
//            togglePlayPause: behavior.togglePlayPause,
//            toggleMute: behavior.toggleMute
//        };
//    };

//    // Objects

//    $.html5Audio.object.constructor = function () {

//        //// ** CONSTRUCTOR ** ////

//        // Main Container

//        $.html5Audio.element.mainContainer = $('<div>').addClass('html5Audio');

//        // Controls Container

//        var controlsContainer = $('<div>').addClass('h5aControls');
//        controlsContainer.appendTo($.html5Audio.element.mainContainer);

//        // Song Container

//        $.html5Audio.element.songContainer = $('<div>').addClass('h5aSong');
//        $.html5Audio.element.songContainer.appendTo($.html5Audio.element.mainContainer);

//        // Song Name Container

//        $.html5Audio.element.songNameContainer = $('<div>').addClass('h5aSongName');
//        $.html5Audio.element.songNameContainer.appendTo($.html5Audio.element.songContainer);

//        // Song Name

//        $.html5Audio.element.songName = $('<p>').text($.html5Audio.config.noMusicText);
//        $.html5Audio.element.songName.appendTo($.html5Audio.element.songNameContainer);

//        // Album Cover Container

//        $.html5Audio.element.albumCoverContainer = $('<div>').addClass('h5aAlbumCover');
//        $.html5Audio.element.albumCoverContainer.appendTo($.html5Audio.element.songContainer);

//        // Album Cover Image

//        $.html5Audio.element.albumCoverImg = $('<img>').addClass('h5aDefaultAlbumCover').attr('src', $.html5Audio.config.defaultAlbumCover);
//        $.html5Audio.element.albumCoverImg.appendTo($.html5Audio.element.albumCoverContainer);

//        // Play / Pause Container

//        $.html5Audio.element.playPauseContainer = $('<div>').addClass('h5aPlayPause');
//        $.html5Audio.element.playPauseContainer.appendTo(controlsContainer);

//        if ($.html5Audio.config.useRadio) {
//            // Volume Container

//            $.html5Audio.element.rightContainer = $('<div>').addClass('h5aVolume');
//            $.html5Audio.element.rightContainer.appendTo(controlsContainer);    
//        } else {
//            // Volume Container

//            $.html5Audio.element.rightContainer = $('<div>').addClass('h5aVolume');
//            $.html5Audio.element.rightContainer.appendTo(controlsContainer);
//        }

//        $.html5Audio.element.rightContainer = $('<div>').addClass('h5aVolume');
//        $.html5Audio.element.rightContainer.appendTo(controlsContainer);

//        // Control Buttons

//        $.html5Audio.element.playBtn = $('<img>').addClass('h5aPlayBtn').attr('src', $.html5Audio.config.playButtonImgSrc);
//        $.html5Audio.element.pauseBtn = $('<img>').addClass('h5aPauseBtn').attr('src', $.html5Audio.config.pauseButtonImgSrc);
//        $.html5Audio.element.volumeMaxBtn = $('<img>').addClass('h5aVolumeMaxBtn').attr('src', $.html5Audio.config.volumeMaxButtonImgSrc);
//        $.html5Audio.element.volumeMuteBtn = $('<img>').addClass('h5aVolumeMuteBtn').attr('src', $.html5Audio.config.volumeMuteButtonImgSrc);

//        $.html5Audio.element.playBtn.appendTo($.html5Audio.element.playPauseContainer);
//        $.html5Audio.element.pauseBtn.appendTo($.html5Audio.element.playPauseContainer);
//        $.html5Audio.element.volumeMaxBtn.appendTo($.html5Audio.element.rightContainer);
//        $.html5Audio.element.volumeMuteBtn.appendTo($.html5Audio.element.rightContainer);

//        // Putting on markup

//        $.html5Audio.element.mainContainer.appendTo($.html5Audio.that);


//        //// ** METHODS ** ////

//        var showMusicName = function (songSource) {
//            var artist = songSource.attr('data-h5a-song-artist');
//            var songName = songSource.attr('data-h5a-song-name');

//            $.html5Audio.element.songName.text(artist + ' - ' + songName);
//        };

//        var showAlbumCover = function (songSource) {
//            var imgSrc = (songSource.data().h5aCoverUrl) ? songSource.data().h5aCoverUrl : $.html5Audio.defaultSettings.defaultAlbumCover;
//            $.html5Audio.element.albumCoverImg.attr('src', imgSrc);
//        };

//        return {
//            showMusicName: showMusicName,
//            showAlbumCover: showAlbumCover
//        };
//    };

//    $.html5Audio.object.configurator = function () {
//        //// ** CONSTRUCTOR ** ////

//        // Initial State: Deactivated

//        $.html5Audio.element.mainContainer.addClass($.html5Audio.styleClasses.deactivated);

//        // Setting Song Sources

//        $.html5Audio.element.songSources = $($.html5Audio.config.songSources);
//    };

//    $.html5Audio.object.behavior = function (constructor, animator) {

//        var deactivatedClass = $.html5Audio.styleClasses.deactivated;
//        var playerPlayingClass = $.html5Audio.styleClasses.playerPlaying;
//        var playerPausedClass = $.html5Audio.styleClasses.playerPaused;
//        var sourcePlayingClass = $.html5Audio.styleClasses.sourcePlaying;
//        var sourcePausedClass = $.html5Audio.styleClasses.sourcePaused;
//        var volumeMuteClass = $.html5Audio.styleClasses.muted;

//        //// ** METHODS ** ////

//        var isActive = function () {
//            return !$.html5Audio.element.mainContainer.hasClass(deactivatedClass);
//        };

//        var activate = function () {
//            $.html5Audio.element.mainContainer.removeClass(deactivatedClass);
//            $.html5Audio.element.mainContainer.addClass(playerPausedClass);
//        };

//        var play = function () {
//            if (!isActive()) return;

//            $.html5Audio.element.mainContainer.removeClass(playerPausedClass);
//            $.html5Audio.element.mainContainer.addClass(playerPlayingClass);

//            animator.animateSongName();
//            $.html5Audio.element.audio.play();
//        };

//        var pause = function () {
//            if (!isActive()) return;

//            $.html5Audio.element.mainContainer.removeClass(playerPlayingClass);
//            $.html5Audio.element.mainContainer.addClass(playerPausedClass);

//            animator.stopAnimationSongName();
//            $.html5Audio.element.audio.pause();
//        };

//        var togglePlayPause = function () {
//            if (!isActive()) return;

//            var mainContainer = $.html5Audio.element.mainContainer;

//            if (mainContainer.hasClass(playerPlayingClass)) {
//                var playingSong = $.html5Audio.element.songSources.filter('.' + sourcePlayingClass);
//                playingSong.removeClass(sourcePlayingClass).addClass(sourcePausedClass);
//                pause();
//            }
//            else {
//                var playingSong = $.html5Audio.element.songSources.filter('.' + sourcePausedClass);
//                playingSong.addClass(sourcePlayingClass).removeClass(sourcePausedClass);
//                play();
//            }
//        };

//        var playSong = function (songUrl) {
//            if (!isActive()) { activate(); }

//            var mainContainer = $.html5Audio.element.mainContainer;
//            mainContainer.find('audio').remove();

//            $.html5Audio.element.audio = $('<audio>').attr({ src: songUrl, loop: 'loop' }).appendTo(mainContainer).get(0);

//            loud();
//            play();
//            animator.showHideSong();
//        };

//        var togglePlaySongSource = function (songSource) {
//            if (songSource.hasClass(sourcePlayingClass)) {
//                songSource.removeClass(sourcePlayingClass).addClass(sourcePausedClass);
//                pause();
//            }
//            else if (songSource.hasClass(sourcePausedClass)) {
//                songSource.removeClass(sourcePausedClass).addClass(sourcePlayingClass);
//                play();
//            }
//            else {
//                $.html5Audio.element.songSources.removeClass(sourcePlayingClass).removeClass(sourcePausedClass);
//                songSource.addClass(sourcePlayingClass);
//                var songUrl = songSource.attr('data-h5a-song-url');
//                constructor.showMusicName(songSource);
//                constructor.showAlbumCover(songSource);
//                playSong(songUrl);
//            }
//        };

//        var loud = function () {
//            $.html5Audio.element.mainContainer.removeClass(volumeMuteClass);
//        };

//        var mute = function () {
//            $.html5Audio.element.mainContainer.addClass(volumeMuteClass);
//        };

//        var toggleMute = function () {
//            var isMuted = $.html5Audio.element.audio.muted;

//            if (isMuted) {
//                loud();
//            }
//            else {
//                mute();
//            }

//            $.html5Audio.element.audio.muted = !isMuted;
//        };


//        return {
//            play: play,
//            pause: pause,
//            togglePlayPause: togglePlayPause,
//            playSong: playSong,
//            togglePlaySongSource: togglePlaySongSource,
//            toggleMute: toggleMute
//        }
//    };

//    $.html5Audio.object.animator = function () {
//        //// ** CONSTRUCTOR ** ////

//        var showHideSongAnimationClass = $.html5Audio.animationClasses.showHideSong;
//        var showCoverAnimationClass = $.html5Audio.animationClasses.showCover;

//        //// ** METHODS ** ////

//        var animateSongName = function () {
//            var songName = $.html5Audio.element.songName;
//            var width = songName.text().length * 8;
//            songName.css({ left: '100px' });
//            songName.stop().animate({ left: '-=' + (100 + width) }, 8000, 'linear', animateSongName);
//        };

//        var stopAnimationSongName = function () {
//            var songName = $.html5Audio.element.songName;
//            songName.stop();
//            songName.css({ left: 0 });
//        };

//        var showHideSong = function () {
//            $.html5Audio.element.songContainer.removeClass(showHideSongAnimationClass);
//            setTimeout(function () { $.html5Audio.element.songContainer.addClass(showHideSongAnimationClass); }, 200);
//        };

//        var showSong = function (autoClose) {
//            $.html5Audio.element.albumCoverContainer.addClass(showCoverAnimationClass);
//        };

//        var hideSong = function () {
//            $.html5Audio.element.albumCoverContainer.removeClass(showCoverAnimationClass);
//        };


//        return {
//            animateSongName: animateSongName,
//            stopAnimationSongName: stopAnimationSongName,
//            showSong: showSong,
//            hideSong: hideSong,
//            showHideSong: showHideSong
//        };
//    };

//    $.html5Audio.object.binder = function (behavior, animator) {
//        //// ** CONSTRUCTOR ** ////

//        var songSources = $.html5Audio.element.songSources;

//        if (!$.isEmptyObject(songSources)) {
//            songSources.click(function (e) {
//                e.preventDefault();
//                var _this = $(e.currentTarget);
//                behavior.togglePlaySongSource(_this);
//            });
//        }

//        $.html5Audio.element.playPauseContainer.click(function (e) { behavior.togglePlayPause(); });
//        $.html5Audio.element.rightContainer.click(function (e) { behavior.toggleMute(); });
//    };

//})(jQuery);