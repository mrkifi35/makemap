(function(){!function(n){var o,t;return t=L.tileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg",{subdomains:"1234"}),n.map=new L.Map("map",{layers:t,center:new L.LatLng(23.974093,120.979903),zoom:8,minZoom:4}),o=L.Icon.extend({options:{iconSize:[64,64]}}),n.otherIcon=new o({iconUrl:"/assets/singing.png"}),n.factoryIcon=new o({iconUrl:"/assets/coal-power-plant-icon.png"}),n.myIcon=new L.Icon.Default,n.setMarkerOnMapArea=function(n,o,t){n.setLatLng(o,{draggable:"true"}),map.panTo(o),"undefined"!=typeof t&&t.call(this,o)},n.setLocationNumfunction=function(n){var o;o=$("#location_lat"),o.length&&($("#location_lat").val(n.lat),$("#location_lng").val(n.lng))}}(window)}).call(this);