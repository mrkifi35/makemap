L.Control.Distance=L.Control.extend({options:{position:"topleft",popups:!0},initialize:function(t){L.Util.setOptions(this,t),this._line=new L.Polyline([],{editable:!0}),this._line.on("edit",this._update,this),this._line.on("click",function(){}),this._active=!1},getLine:function(){return this._line},onAdd:function(){function t(){this._active?this._calc_disable():this._calc_enable()}{var i="leaflet-control-distance",e=this._container=L.DomUtil.create("div",i);this._link=this._createButton("Edit","leaflet-control-distance leaflet-control-distance-edit",e,t,this),this._link_delete=this._createButton("Delete","leaflet-control-distance leaflet-control-distance-delete",e,this._reset,this),this._text=L.DomUtil.create("div","leaflet-control-distance-text",e)}return this._map.addLayer(this._line),this._calc_disable(),e},_createButton:function(t,i,e,n,s){var l=L.DomUtil.create("a",i,e);return l.href="#",l.title=t,L.DomEvent.addListener(l,"click",L.DomEvent.stopPropagation).addListener(l,"click",L.DomEvent.preventDefault).addListener(l,"click",n,s),l},onRemove:function(){this._calc_disable()},_calc_enable:function(){this._map.on("click",this._add_point,this),this._map.getContainer().style.cursor="crosshair",L.DomUtil.addClass(this._link,"leaflet-control-distance-active"),this._container.appendChild(this._link_delete),this._container.appendChild(this._text),this._active=!0,this._line.editing.enable(),this._map.hasLayer(this._line)||this._map.addLayer(this._line),this._update()},_calc_disable:function(){this._map.off("click",this._add_point,this),this._map.getContainer().style.cursor="default",this._container.removeChild(this._link_delete),this._container.removeChild(this._text),L.DomUtil.removeClass(this._link,"leaflet-control-distance-active"),this._active=!1,this._line.editing.disable()},_add_point:function(t){this._line.getLatLngs().length;this._line.addLatLng(t.latlng),this._line.editing.updateMarkers(),this._line.fire("edit",{})},_reset:function(){this._line.setLatLngs([]),this._line.fire("edit",{}),this._line.redraw(),this._line.editing.updateMarkers()},_update:function(){console.info("Update"),this._text.textContent=this._d2txt(this._distance_calc())},_d2txt:function(t){return 2e3>t?t.toFixed(0)+" m":(t/1e3).toFixed(1)+" km"},_distance_calc:function(){for(var t=this._line.getLatLngs(),i=0,e=null,n=0;n<t.length;n++){if(n&&(i+=e.distanceTo(t[n])),this.options.popups){var s=this._line.editing._markers[n];s&&(s.bindPopup(this._d2txt(i)),s.on("mouseover",s.openPopup,s),s.on("mouseout",s.closePopup,s))}e=t[n]}return i}});