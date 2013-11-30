$(document).ready(function(){
    var imgs= [];
    $.getJSON('scripts/k_macquarrie-tweets.txt?'+Math.random(), function(data){
        var statuses= data.statuses;
        $(statuses).each(function(){
            //var entities= this.entities;
            console.log(this.id_str);
            
            var media=this.entities.media;
            if(media!= undefined){
                var url= media[0].media_url;
                var pic= new Pic(url, this.user.screen_name, this.id_str);
                imgs.push(pic);
            }
        })
        
        var uniqueImgs = [];
        uniqueImgs[0]= imgs[0];
        $.each(imgs, function(i, el){
            var url= el.imgSrc;
            var unique = true;
            for(var j=0; j<uniqueImgs.length; j++){
                if(url==uniqueImgs[j].imgSrc){
                    unique= false;
                }
            }
            if(unique){
                uniqueImgs.push(el);
            }
        });
        
        for(var i=0; i<uniqueImgs.length; i++){
           $('#pics').append('<li class="tile"><a href="https://twitter.com/#!/twitter/status/'+uniqueImgs[i].id+'"><img src="'+uniqueImgs[i].imgSrc+'" alt="Dundee Sunset" ></a></li>');
        }
        if(uniqueImgs.length>1){
            var x= getRandomInt(0, uniqueImgs.length-1);  
            $('header').css('background-image', 'url('+uniqueImgs[x].imgSrc+')');
        }

    })
    .done(function() {
   // console.log( "done loading" );
        $('#pics').toggleClass('unloaded');
            var $container= $('#pics');
            $container.imagesLoaded(function(){
            console.log('loaded');
            $container.masonry({
                itemSelector: '.tile',
                gutter: 0,
                isAnimated: true,
                columnWidth: '.tile'
            });
        })
  })
  .fail(function() {
    console.log( "error" );
    $('#content').html('<p>error getting tweets</p>');
  })
    
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var Pic= function(imgSrc, user, id){
    this.imgSrc= imgSrc;
    this.user= user;
    this.id= id;
}

