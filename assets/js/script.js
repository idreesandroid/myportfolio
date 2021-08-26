function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function () {
  progressBarScroll();
};

function myMap() {
            const myLatLng = {
                lat: 33.624711,
                lng: 73.035879
            };
            var mapProp = {
                center: new google.maps.LatLng(myLatLng),
                zoom: 14,
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            const image = "assets/images/pakistan_flag.png";
            var icon = {
                url: image, // url
                scaledSize: new google.maps.Size(100, 100), // scaled size
                //origin: new google.maps.Point(0, 0), // origin
                //anchor: new google.maps.Point(0, 0) // anchor
            };
            const marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: "Muhammad Idrees!",
                icon: icon
            });

            const circle = new google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map,
              center: myLatLng,
              radius: 900,
            });

        }
        window.fbAsyncInit = function() {
            FB.init({
                xfbml: true,
                version: 'v10.0'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        $(document).ready(function() {
            $('.html').easyPieChart({
                delay: 4000,
                barColor : "#E96327",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.js').easyPieChart({
                delay: 4000,
                barColor : "#F7E018",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.css').easyPieChart({
                delay: 4000,
                barColor : "#264DE4",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.php').easyPieChart({
                delay: 4000,
                barColor : "#777BB3",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.laravel').easyPieChart({
                delay: 4000,
                barColor : "#FF2C1F",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.codeigniter').easyPieChart({
                delay: 4000,
                barColor : "#F13700",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.zend').easyPieChart({
                delay: 4000,
                barColor : "#63AD04",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            }); 
            $('.googleMap').easyPieChart({
                delay: 4000,
                barColor : "#D3473E",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            }); 
            $('.mysql').easyPieChart({
                delay: 4000,
                barColor : "#005C83",
                trachColor: "#cecece",
                lineWidth: 4,
                trachWidth: 2,
                size : 55
            });
            $('.wordpress').easyPieChart({
                delay: 4000,
                barColor : "#006E92",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });

            $('.shopify').easyPieChart({
                delay: 4000,
                barColor : "#8DB543",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });
            $('.photoshop').easyPieChart({
                delay: 4000,
                barColor : "#00BEF2",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });
            $('.bootstrap').easyPieChart({
                delay: 4000,
                barColor : "#7510EC",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });
            $('.git').easyPieChart({
                delay: 4000,
                barColor : "#E44C30",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });
            $('.jquery').easyPieChart({
                delay: 4000,
                barColor : "#1064A4",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });

            $('.mongodb').easyPieChart({
                delay: 4000,
                barColor : "#0EA14C",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });

            $('.communicationSkill').easyPieChart({
                delay: 4000,
                barColor : "#024694",
                trachColor: "#fff",
                lineWidth: 4,
                trachWidth: 5,
                size : 55
            });
        });

