
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var streetAdd = $("#street").val();
    var city = $("#city").val();
    var address = streetAdd  + "," + city;

    //$greeting.remove();
        $greeting.text(' So you want to live at ' + address );

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    //append the address to the image src

    var imageURL = 'https://maps.googleapis.com/maps/api/streetview?size=400x600&location=' + address +'';

    $body.append('<img class="bgimg" src="' + imageURL + '">');
    //document.write("<h3>Test</h3>");

      var nyTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4463d95e707f4e20858f551f4a2100b1&sort=newest&q="+ city + "";
      $.getJSON(nyTimesURL,function(data){
         var web_url = new Array(20);
         var snippet = new Array(20);
         var headline = new Array(20);
         var i = 0;

         data.response.docs.forEach(function(element) {
                  web_url[i] =  element.web_url;
                  snippet[i] = element.snippet;
                  headline[i] = element.headline.main;
                  i++;
                  });
                    var j = 0;
                    $nytElem.text('New York Times Articles about' + city);
                    while(web_url[j]){
                        $nytElem.append('<li class="article"><a href=' + web_url[j] + '>' + headline[j] + '</a>');
                        $nytElem.append('<p>' + snippet[j] + '</p></li>');
                      j++;
                   }
                   // $nytElem.append('</ul>');
              }).fail(function() {
             $nytElem.text('Cant retrieve articles from NYtimes');
        });

    /*fire off JSON-P request with $.ajax()
      //include datatype and success parameters
      iterate through response
      present articles on the page inside <ul id = "wikipedia=links"></ul> */

      var wikiURL = "https://en.wikipedia.org/w/api.php";
      wikiURL += '?' + $.param({
          'action' : 'opensearch',
          'search' : city,
          'prop'  : 'revisions',
          'rvprop' : 'content',
          'format' : 'json',
          'limit' : 5
      });

      var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to retrieve wiki articles");
      },5000);

       $.ajax( {
          url: wikiURL,
          dataType: 'jsonp',
          success: function(data) {
             var i = 0;
             while(i < 5){
              $wikiElem.append('<li id = "wikipedia-links"><a href='+ data[3][i] + '>'
              + data[1][i]+'</a></li>');
              i = i + 1;
            }
              clearTimeout(wikiRequestTimeout);
          }
      } );
   return false;
  };

$('#form-container').submit(loadData);

//4463d95e707f4e20858f551f4a2100b1

