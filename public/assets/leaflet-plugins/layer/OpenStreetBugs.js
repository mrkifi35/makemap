function putAJAXMarker(t,e,o,n,i){var s,a=n.split(/<hr \/>/),r=[],p=[],l=[],u=null,c=0;for(s=0;s<a.length;s++)u=null,c=0,a[s]=a[s].replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),c=a[s].lastIndexOf("["),c>0?(r[s]=a[s].substr(0,c-1),u=a[s].substr(c+1),p[s]=u.substr(0,u.lastIndexOf(",")),l[s]=u.substr(u.lastIndexOf(",")+2),l[s]=l[s].substr(0,l[s].lastIndexOf("]"))):r[s]=a[s];var d=putAJAXMarker.bugs[t];putAJAXMarker.bugs[t]=[new L.LatLng(o,e),a,i,n,r,p,l];var m=(d&&d[3])!==n;for(s=0;s<putAJAXMarker.layers.length;s++)putAJAXMarker.layers[s].createMarker(t,m)}function osbResponse(t){t&&alert("Error: "+t)}L.OpenStreetBugs=L.FeatureGroup.extend({options:{serverURL:"http://openstreetbugs.schokokeks.org/api/0.1/",readonly:!1,setCookie:!0,username:"NoName",cookieLifetime:1e3,cookiePath:null,permalinkZoom:14,permalinkUrl:null,opacity:.7,showOpen:!0,showClosed:!0,iconOpen:"http://openstreetbugs.schokokeks.org/client/open_bug_marker.png",iconClosed:"http://openstreetbugs.schokokeks.org/client/closed_bug_marker.png",iconActive:void 0,editArea:.01,popupOptions:{autoPan:!1},dblClick:!0},initialize:function(t){var e=L.Util.extend({},this.options.popupOptions,(t||{}).popupOptions);L.Util.setOptions(this,t),this.options.popupOptions=e,putAJAXMarker.layers.push(this),this.bugs={},this._layers={};var o=this.get_cookie("osbUsername");o&&(this.options.username=o),L.OpenStreetBugs.setCSS()},onAdd:function(t){L.FeatureGroup.prototype.onAdd.apply(this,[t]),this._map.on("moveend",this.loadBugs,this),this.loadBugs(),this.options.readonly||(this.options.dblClick?(t.doubleClickZoom.disable(),t.on("dblclick",this.addBug,this)):t.on("click",this.addBug,this)),this.fire("add")},onRemove:function(t){this._map.off("moveend",this.loadBugs,this),this._iterateLayers(t.removeLayer,t),delete this._map,this.options.readonly||(this.options.dblClick?(t.doubleClickZoom.enable(),t.off("dblclick",this.addBug,this)):t.off("click",this.addBug,this)),this.fire("remove")},set_cookie:function(t,e){new Date((new Date).getTime()+6048e5).toGMTString();document.cookie=t+"="+encodeURIComponent(e)+";"},get_cookie:function(t){for(var e=(document.cookie||"").split(/;\s*/),o=0;o<e.length;o++){var n=e[o].split("=");if(n[0]===t)return decodeURIComponent(n[1])}return null},loadBugs:function(){function t(t,e){var o=Math.pow(10,e);return Math.round(t*o)/o}var e=this._map.getBounds();if(!e)return!1;var o=e.getSouthWest(),n=e.getNorthEast();this.apiRequest("getBugs?t="+t(n.lat,5)+"&r="+t(n.lng,5)+"&b="+t(o.lat,5)+"&l="+t(o.lng,5))},apiRequest:function(t,e){var o=document.createElement("script");o.type="text/javascript",o.src=this.options.serverURL+t+"&nocache="+(new Date).getTime();var n=this;o.onload=function(){document.body.removeChild(this),e&&n.loadBugs()},document.body.appendChild(o)},createMarker:function(t,e){var o=putAJAXMarker.bugs[t];if(this.bugs[t]){if(!e&&this.bugs[t].osb.closed===o[2])return;this.removeLayer(this.bugs[t])}var n=o[2];if((!n||this.options.showClosed)&&(n||this.options.showOpen)){var i=null,s=" osb";o[2]?(i=this.options.iconClosed,s+=" osbClosed"):1===o[1].length?(i=this.options.iconOpen,s+=" osbOpen"):this.options.iconActive?(i=this.options.iconActive,s+=" osbActive"):(i=this.options.iconOpen,s+=" osbOpen");var a=new L.Marker(o[0],{icon:new this.osbIcon({iconUrl:i})});a.osb={id:t,closed:n},this.addLayer(a),this.bugs[t]=a,this.setPopupContent(t),a._popup.options.className+=s,this.options.bugid&&parseInt(this.options.bugid)===t&&a.openPopup()}},osbIcon:L.Icon.extend({options:{iconUrl:"http://openstreetbugs.schokokeks.org/client/open_bug_marker.png",iconSize:new L.Point(22,22),shadowSize:new L.Point(0,0),iconAnchor:new L.Point(11,11),popupAnchor:new L.Point(0,-11)}}),setPopupContent:function(t){function e(t,e){var o=L.DomUtil.create("a",null,L.DomUtil.create("li",null,t));return o.href="#",o.textContent=L.i18n(e),o}function o(e,o){a.textContent_old=a.textContent,a.textContent=L.i18n(e);var n=b.createCommentForm();return n.osbid.value=t,n.cancel.onclick=function(){a.textContent=a.textContent_old,s.removeChild(n),s.appendChild(h)},n.ok.onclick=function(){return g.closePopup(),o?b.submitComment(n):b.closeBug(n),!1},s.appendChild(n),s.removeChild(h),!1}if(!this.bugs[t]._popup_content){var n=putAJAXMarker.bugs[t],i=n[2],s=L.DomUtil.create("div","osb-popup"),a=L.DomUtil.create("h1",null,s);a.textContent=L.i18n(n[2]?"Fixed Error":1===n[1].length?"Unresolved Error":"Active Error");for(var r=L.DomUtil.create("div","osb-info",s),p=L.DomUtil.create("table","osb-table",r),l=0;l<n[1].length;l++){var u=L.DomUtil.create("tr","osb-tr-info",p);u.setAttribute("valign","top");var c=L.DomUtil.create("td","osb-td-nickname",u);c.textContent=n[5][l]+":";var d=L.DomUtil.create("td","osb-td-datetime",u);d.textContent=n[6][l];var m=L.DomUtil.create("td","osb-td-comment",L.DomUtil.create("tr","osb-tr-comment",p));m.setAttribute("colspan","2"),m.setAttribute("charoff","2"),m.textContent=n[4][l]}var h=L.DomUtil.create("ul",null,s),b=this,g=this.bugs[t];if(!i&&!this.options.readonly){var f;f=e(h,"Add comment"),f.onclick=function(){return o("Add comment",!0)},f=e(h,"Mark as Fixed"),f.onclick=function(){return o("Close bug",!1)}}var v=e(h,"JOSM");v.onclick=function(){b.remoteEdit(n[0])};var k=e(h,"Link"),C={lat:n[0].lat,lon:n[0].lng,zoom:this.options.permalinkZoom,bugid:t};k.href=this.options.permalinkUrl?L.Util.template(this.options.permalinkUrl,C):location.protocol+"//"+location.host+location.pathname+L.Util.getParamString(C),g._popup_content=s,g.bindPopup(s,this.options.popupOptions),g._popup.options.maxWidth=410,g._popup.options.minWidth=410,g.on("mouseover",g.openTempPopup,g)}},submitComment:function(t){if(t.osbcomment.value){var e=t.osbnickname.value||this.options.username;this.apiRequest("editPOIexec?id="+encodeURIComponent(t.osbid.value)+"&text="+encodeURIComponent(t.osbcomment.value+" ["+e+"]")+"&format=js",!0),this.set_cookie("osbUsername",e),this.options.username=e}},closeBug:function(t){var e=t.osbid.value;this.submitComment(t),this.apiRequest("closePOIexec?id="+encodeURIComponent(e)+"&format=js",!0)},createCommentForm:function(t){var e=L.DomUtil.create("form","osb-add-comment",t),o="";return o+='<input name="osbid" type="hidden"/>',o+='<input name="osblat" type="hidden"/>',o+='<input name="osblon" type="hidden"/>',o+='<div><span class="osb-inputlabel">'+L.i18n("Nickname")+':</span><input type="text" name="osbnickname"></div>',o+='<div><span class="osb-inputlabel">'+L.i18n("Comment")+':</span><input type="text" name="osbcomment"></div>',o+='<div class="osb-formfooter"><input type="submit" name="ok"/><input type="button" name="cancel"/></div>',e.innerHTML=o,e.ok.value=L.i18n("OK"),e.cancel.value=L.i18n("Cancel"),e.osbnickname.value=this.options.username,e},addBug:function(t){var e=L.DomUtil.create("div","osb-popup");e.innerHTML+="<h1>"+L.i18n("New bug")+"</h1>",e.innerHTML+='<div class="osbCreateInfo">'+L.i18n("Find your bug?")+"<br />"+L.i18n("Contact details and someone will fix it.")+"</div>";var o=new L.Popup,n=this,i=this.createCommentForm(e);i.osblat.value=t.latlng.lat,i.osblon.value=t.latlng.lng,i.ok.value=L.i18n("Add comment"),i.onsubmit=function(){return n._map.closePopup(o),n.createBug(i),!1},i.cancel.onclick=function(){n._map.closePopup(o)},o.setLatLng(t.latlng),o.setContent(e),o.options.maxWidth=410,o.options.minWidth=410,o.options.className+=" osb osbCreate",this._map.openPopup(o)},createBug:function(t){if(t.osbcomment.value){var e=t.osbnickname.value||this.options.username;this.apiRequest("addPOIexec?lat="+encodeURIComponent(t.osblat.value)+"&lon="+encodeURIComponent(t.osblon.value)+"&text="+encodeURIComponent(t.osbcomment.value+" ["+e+"]")+"&format=js",!0),this.set_cookie("osbUsername",e),this.options.username=e}},remoteEdit:function(t){var e=this.options.editArea||.01,o=2*e,n=["left="+(t.lng-o),"bottom="+(t.lat-e),"right="+(t.lng+o),"top="+(t.lat+e)],i="http://localhost:8111/load_and_zoom?"+n.join("&"),s=L.DomUtil.create("iframe",null);return s.style.display="none",s.src=i,document.body.appendChild(s),s.onload=function(){document.body.removeChild(s)},!1}}),L.OpenStreetBugs.setCSS=function(){if(!L.OpenStreetBugs.setCSS.done){L.OpenStreetBugs.setCSS.done=!0;var t=0,e=function(e,o){var n,i=document.styleSheets[0];n=i.addRule?i.addRule(e,o,t):i.insertRule(e+" { "+o+" }",t),i.style=L.Util.extend(i.style||{},o),t++};e(".osb-popup dl","margin:0; padding:0;"),e(".osb-popup dt","margin:0; padding:0; font-weight:bold; float:left; clear:left;"),e(".osb-popup dt:after",'content: ":\xa0";'),e("* html .osb-popup dt","margin-right:1ex;"),e(".osb-popup dd","margin:0; padding:0;"),e(".osb-popup ul.buttons","list-style-type:none; padding:0; margin:0;"),e(".osb-popup ul.buttons li","display:inline; margin:0; padding:0;"),e(".osb-popup h3","font-size:1.2em; margin:.2em 0 .7em 0;")}},putAJAXMarker.layers=[],putAJAXMarker.bugs={},L.Marker.include({openTempPopup:function(){function t(){this.off("mouseout",e,this),this.off("click",t,this),this.on("click",this.openPopup,this)}function e(){t.call(this),this.closePopup()}this.openPopup(),this.off("click",this.openPopup,this),this.on("mouseout",e,this),this.on("click",t,this)}}),L.i18n=function(t){return(L.i18n.lang[L.i18n.current]||{})[t]||t},L.i18n.current="ru",L.i18n.lang={},L.i18n.extend=function(t,e){L.i18n.lang[t]=L.Util.extend(L.i18n.lang[t]||{},e)},L.i18n.extend("ru",{"Fixed Error":"\u041e\u0448\u0438\u0431\u043a\u0430 \u0438\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430","Unresolved Error":"\u041d\u0435\u0438\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430","Active Error":"\u041e\u0448\u0438\u0431\u043a\u0430 \u0443\u0442\u043e\u0447\u043d\u044f\u0435\u0442\u0441\u044f",Description:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",Comment:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435","Add comment":"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c","Mark as Fixed":"\u0418\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e",Link:"\u0421\u0441\u044b\u043b\u043a\u0430",Cancel:"\u041e\u0442\u043c\u0435\u043d\u0430","New bug":"\u042f \u043d\u0430\u0448\u0435\u043b \u043e\u0448\u0438\u0431\u043a\u0443","Find your bug?":"\u041d\u0430\u0448\u043b\u0438 \u043e\u0448\u0438\u0431\u043a\u0443?","Contact details and someone will fix it.":"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u0438 \u043a\u0442\u043e-\u043d\u0438\u0431\u0443\u0434\u044c \u0435\u0451 \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442."});