L.Control.Permalink.include({initialize_line:function(){this.on("update",this._set_line,this),this.on("add",this._onadd_line,this)},_onadd_line:function(){this.options.line&&(this.options.line.on("edit",this._update_line,this),this._update_line())},_update_line:function(){if(this.options.line){var i=this.options.line;if(i){var n=[],t=i.getLatLngs();if(!t.length)return this._update({line:null});for(var e in t)n.push(t[e].lat.toFixed(4)+","+t[e].lng.toFixed(4));this._update({line:n.join(";")})}}},_set_line:function(i){var n=i.params,t=this.options.line;if(t&&n.line){var e=[],s=n.line.split(";");for(var a in s){var l=s[a].split(",");2===l.length&&e.push(new L.LatLng(l[0],l[1]))}e.length&&(t.setLatLngs(e),this._map.hasLayer(t)||this._map.addLayer(t))}}});