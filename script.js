
const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');


menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})

const readers = document.querySelector('#readers');
const historyImg = document.querySelector('#history__img');

// readers.addEventListener('click', () => {
//     window.scrollTo()
// })

const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('click', ()=> {
       removeActive()
      panel.classList.add('active');

  })
})

function removeActive() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}


$(document).ready(function() {
    var list = $('.list');
    var list__block;

    for (var key in audio__list) {
        list__block = $('<div class="list__block"></div>');
        list.append(list__block);

        list__block.append('<span class="play__btn"><img class="play__icon" src="image/circled-play-w.png" alt="play" /><img class="pause__icon" src="image/pause-button-w.png" alt="pause"/></span>');
        list__block.append('<span class="audio__title">' + audio__list[key].title + '</span>');
        list__block.append('<span class="audio__qari">' + audio__list[key].qari + '</span>');
        list__block.append('<span class="audio__year">' + audio__list[key].year + '</span>');
        list__block.append('<span class="audio__duration">' + audio__list[key].duration + '</span>');
        list__block.append('<span class="audio__animation"><ul><li></li><li></li><li></li><li></li><li></li></ul></span>');
        list__block.append('<span class="track"><audio id="audio" controls><source src="sound/'+audio__list[key].track +'" type="audio/mp3"/></audio></span>');
        list__block.append('<span class="download__btn"><a target="_blank" href="sound/'+audio__list[key].track +'"><img class="download__icon" src="image/download-w.png" alt="play" /></a></span>');

    }

    // PLAY FUNCTIONALITY
    
    $(".list__block .play__btn .play__icon").on('click', function(current) {
        $(this).parent().find(".play__icon").css("display", "none");
        $(this).parent().find(".pause__icon").css("display", "inline-block");
        $(".play__icon").not(this).parent().find('.pause__icon').css("display", "none");
        $(".play__icon").not(this).parent().find('.play__icon').css('display', "inline-block");

         // ADD/REMOVE CLASS
    $(this).parent().parent().addClass("isPlaying");
    $(".play__icon").not(this).parent().parent().removeClass("isPlaying");

    // Animation play

    $(this).parent().parent().find('.audio__animation li').css("animation-play-state", "running").
    css("opacity", "1");
     $(".play__icon").not(this).parent().parent().find('.audio__animation li').css("animation-play-state", "paused").
    css("opacity", "0.1");
     

    // Pause current audio track when play next
    $('audio').each(function(e) {
        if(e !== current.currentTarget) {
            $(this)[0].pause();
        }
    })
    // PLAY CURRENT AUDIO track
    $(this).parent().parent().find(".track audio")[0].play();
    
    });
    
    $(".list__block .play__btn .pause__icon").on('click', function() {
        // hide puse icon
        $(this).parent().find(".pause__icon").css("display", "none");
        // show play icon
        $(this).parent().find(".play__icon").css("display", "inline-block");

        //  animation pause
         $(this).parent().parent().find('.audio__animation li').css("animation-play-state", "paused");

           //  Pause current audio track
       $(this).parent().parent().find(".track audio")[0].pause();

    });


    //auto play
    $(".autoplay__btn input").on("change", function() {
        if($(this).is(":checked")) {
            $("audio").on('ended', function() {
                $(this).parent().parent().next().find('audio')[0].play();

                $(".list__block").removeClass("isPlaying");
                     $(this).parent().parent().next().addClass("isPlaying");
                     $(this).parent().parent().next().find('.audio__animation li').css("animation-play-state", "running").
                     css("opacity", "1");
                      
                       $(this).parent().parent().next().find(".play__icon").css("display", "none");
                       $(this).parent().parent().next().find(".pause__icon").css("display", "inline-block");
                      

            });
        } else {
            $("audio").on("ended", function() {
               $('.audio__animation li').css("animation-play-state", "paused").css("opacity", "0.1");
                     $('.pause__icon').css("display", "none");
                     $(".play__icon").css("display", "inline-block");

            });
        }
    }).change();

});
