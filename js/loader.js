(function () {

    var Obj = {};
    Obj.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // Preloading audio stuff
    var loadMusic = document.getElementById("start"),
        loadAngry = document.getElementById("angry_jump"),
        loadSad = document.getElementById("sad_jump"),
        loadHappy = document.getElementById("happy_jump"),
        loadFlap = document.getElementById("flap"),
        loadTing = document.getElementById("ting");

    // Preloading image stuff

    mit.audio = [
        loadMusic,
        loadAngry,
        loadSad,
        loadHappy,
        loadFlap,
        loadTing,
    ];

    var images = {
        angry_pakia: "res/angry_pakia.png",
        backtrees: "res/back_trees.png",
        berries: "res/berries.png",
        bg_combined: "res/bg_combined.png",
        branch: "res/branch.png",
        clouds: "res/clouds.png",
        coins: "res/coins.png",
        controls: "res/controls.png",
        //dig : "res/dig.png",
        fork_handle: "res/fork_handle.png",
        fork_head: "res/fork_head.png",
        fronttrees: "res/front_trees.png",
        grass: "res/grass.png",
        ground: "res/ground.png",
        happy_pakia: "res/happy_pakia.png",
        log: "res/log.png",
        pappu: "res/pappu.png",
        plank_bot: "res/plank_bot.png",
        plank_mid: "res/plank_mid.png",
        plank_top: "res/plank_top.png",
        sad_pakia: "res/sad_pakia.png",
        stand: "res/stand.png",
        star: "res/star.png"
    };

    mit.image = {};

    // Get the size of an Obj
    var size = Obj.size(images);
    size += mit.audio.length;

    var counter = 0,
        percent = 0;

    var loading = document.getElementById("bar");
    var loader = document.getElementById("loading");
    var loadText = document.getElementById("loadText");

    if (!($.browser.webkit && !$.browser.chrome)) {
        for (var i = 0; i < mit.audio.length; i++) {
            var file = mit.audio[i];

            if (isNaN(file.duration)) {
                file.addEventListener("loadeddata", function () {
                    counter++;
                    percent = Math.floor((counter / size * 100));
                    loading.style.width = percent + "%";
                    loadText.innerHTML = "Loading... " + percent + "%";

                    if (percent >= 100) {
                        $("#loading").fadeOut();
                        mit.main();
                    }
                });
            }

            else {
                counter++;
                percent = Math.floor((counter / size * 100));
                loading.style.width = percent + "%";
                loadText.innerHTML = "Loading... " + percent + "%";

                if (percent >= 100) {
                    $("#loading").fadeOut();
                    mit.main();
                }

            }
        }
    }

    else {
        counter += mit.audio.length
    }

    for (var src in images) {
        mit.image[src] = new Image();
        mit.image[src].onload = function () {
            counter++;

            percent = Math.floor(((counter) / size * 100));
            loading.style.width = percent + "%";
            loadText.innerHTML = "Loading... " + percent + "%";

            if (percent >= 100) {
                $("#loading").fadeOut();
                mit.main();
            }

        };

        mit.image[src].src = images[src];
    }

}());