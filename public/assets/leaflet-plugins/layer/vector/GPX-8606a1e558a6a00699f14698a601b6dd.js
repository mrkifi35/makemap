L.GPX=L.FeatureGroup.extend({initialize:function(e,t){L.Util.setOptions(this,t),this._gpx=e,this._layers={},e&&this.addGPX(e,t,this.options.async)},loadXML:function(e,t,n,a){void 0===a&&(a=this.options.async),void 0===n&&(n=this.options);var i=new window.XMLHttpRequest;i.open("GET",e,a);try{i.overrideMimeType("text/xml")}catch(r){}i.onreadystatechange=function(){4===i.readyState&&200===i.status&&t(i.responseXML,n)},i.send(null)},_humanLen:function(e){return 2e3>e?e.toFixed(0)+" m":(e/1e3).toFixed(1)+" km"},_polylineLen:function(e){for(var t=e._latlngs,n=0,a=null,i=0;i<t.length;i++)i&&a&&(n+=a.distanceTo(t[i])),a=t[i];return n},addGPX:function(e,t,n){var a=this,i=function(e,t){a._addGPX(e,t)};this.loadXML(e,i,t,n)},_addGPX:function(e,t){var n=this.parseGPX(e,t);n&&(this.addLayer(n),this.fire("loaded"))},parseGPX:function(e,t){var n,a,i,r=[],s=!1,o=[["rte","rtept"],["trkseg","trkpt"]];for(n=0;n<o.length;n++)for(i=e.getElementsByTagName(o[n][0]),a=0;a<i.length;a++)for(var l=this.parse_trkseg(i[a],e,t,o[n][1]),h=0;h<l.length;h++)this.parse_name(i[a],l[h])&&(s=!0),r.push(l[h]);if(i=e.getElementsByTagName("wpt"),t.display_wpt!==!1)for(a=0;a<i.length;a++){var d=this.parse_wpt(i[a],e,t);d&&(this.parse_name(i[a],d)&&(s=!0),r.push(d))}if(r.length){var p=r[0];return r.length>1&&(p=new L.FeatureGroup(r)),s||this.parse_name(e,p),p}},parse_name:function(e,t){var n,a,i,r="",s="",o=0;for(a=e.getElementsByTagName("name"),a.length&&(i=a[0].childNodes[0].nodeValue),a=e.getElementsByTagName("desc"),n=0;n<a.length;n++)for(var l=0;l<a[n].childNodes.length;l++)s+=a[n].childNodes[l].nodeValue;return t instanceof L.Path&&(o=this._polylineLen(t)),i&&(r+="<h2>"+i+"</h2>"+s),o&&(r+="<p>"+this._humanLen(o)+"</p>"),t&&void 0===t._popup&&t.bindPopup(r),r},parse_trkseg:function(e,t,n,a){var i=e.getElementsByTagName(a);if(!i.length)return[];for(var r=[],s=0;s<i.length;s++){var o=new L.LatLng(i[s].getAttribute("lat"),i[s].getAttribute("lon"));o.meta={};for(var l in i[s].childNodes){var h=i[s].childNodes[l];h.tagName&&(o.meta[h.tagName]=h.textContent)}r.push(o)}var d=[new L.Polyline(r,n)];return this.fire("addline",{line:d}),d},parse_wpt:function(e,t,n){var a=new L.Marker(new L.LatLng(e.getAttribute("lat"),e.getAttribute("lon")),n);return this.fire("addpoint",{point:a}),a}});