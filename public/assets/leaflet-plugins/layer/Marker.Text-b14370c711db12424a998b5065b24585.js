L.Icon.Text=L.Icon.extend({initialize:function(t,i){this._text=t,L.Icon.prototype.initialize.apply(this,[i])},createIcon:function(){var t=document.createElement("div");return t.appendChild(document.createTextNode(this._text)),this._setIconStyles(t,"icon"),t.style.textShadow="2px 2px 2px #fff",t},createShadow:function(){return null}}),L.Marker.Text=L.Marker.extend({initialize:function(t,i,e){L.Marker.prototype.initialize.apply(this,[t,e]),this._fakeicon=new L.Icon.Text(i)},_initIcon:function(){L.Marker.prototype._initIcon.apply(this);var t=this._icon,i=this._shadow,e=this.options.icon;this._icon=this._shadow=null,this.options.icon=this._fakeicon,L.Marker.prototype._initIcon.apply(this),this.options.icon=e,i&&(i.parentNode.removeChild(i),this._icon.appendChild(i)),t.parentNode.removeChild(t),this._icon.appendChild(t);var n=this._icon.clientWidth,o=this._icon.clientHeight;this._icon.style.marginLeft=-n/2+"px";var c=new L.Point(n/2,0);L.Browser.webkit&&(c.y=-o),L.DomUtil.setPosition(t,c),i&&L.DomUtil.setPosition(i,c)}});