describe("spiderfy",function(){var e,r,a;beforeEach(function(){a=sinon.useFakeTimers(),r=document.createElement("div"),r.style.width="200px",r.style.height="200px",document.body.appendChild(r),e=L.map(r,{maxZoom:18}),e.fitBounds(new L.LatLngBounds([[1,1],[2,2]]))}),afterEach(function(){a.restore(),document.body.removeChild(r)}),it("Spiderfies 2 Markers",function(){var r=new L.MarkerClusterGroup,a=new L.Marker([1.5,1.5]),n=new L.Marker([1.5,1.5]);r.addLayer(a),r.addLayer(n),e.addLayer(r),a.__parent.spiderfy(),expect(a._icon.parentNode).to.be(e._panes.markerPane),expect(n._icon.parentNode).to.be(e._panes.markerPane)}),it("Spiderfies 2 CircleMarkers",function(){var r=new L.MarkerClusterGroup,a=new L.CircleMarker([1.5,1.5]),n=new L.CircleMarker([1.5,1.5]);r.addLayer(a),r.addLayer(n),e.addLayer(r),a.__parent.spiderfy(),expect(a._container.parentNode).to.be(e._pathRoot),expect(n._container.parentNode).to.be(e._pathRoot)}),it("Spiderfies 2 Circles",function(){var r=new L.MarkerClusterGroup,a=new L.Circle([1.5,1.5],10),n=new L.Circle([1.5,1.5],10);r.addLayer(a),r.addLayer(n),e.addLayer(r),a.__parent.spiderfy(),expect(a._container.parentNode).to.be(e._pathRoot),expect(n._container.parentNode).to.be(e._pathRoot)}),describe("zoomend event listener",function(){it("unspiderfies correctly",function(){var r=new L.MarkerClusterGroup,a=new L.Circle([1.5,1.5],10),n=new L.Circle([1.5,1.5],10);r.addLayer(a),r.addLayer(n),e.addLayer(r),a.__parent.spiderfy(),expect(r._spiderfied).to.not.be(null),e.fire("zoomend"),expect(r._spiderfied).to.be(null)})})});