describe("addLayer adding a single marker",function(){var e,a;beforeEach(function(){a=document.createElement("div"),a.style.width="200px",a.style.height="200px",document.body.appendChild(a),e=L.map(a,{maxZoom:18}),e.fitBounds(new L.LatLngBounds([[1,1],[2,2]]))}),afterEach(function(){document.body.removeChild(a)}),it("appears when added to the group before the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]);a.addLayer(r),e.addLayer(a),expect(r._icon).to.not.be(void 0),expect(r._icon.parentNode).to.be(e._panes.markerPane)}),it("appears when added to the group after the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]);e.addLayer(a),a.addLayer(r),expect(r._icon).to.not.be(void 0),expect(r._icon.parentNode).to.be(e._panes.markerPane)}),it("appears (using animations) when added after the group is added to the map",function(){var a=new L.MarkerClusterGroup({animateAddingMarkers:!0}),r=new L.Marker([1.5,1.5]);e.addLayer(a),a.addLayer(r),expect(r._icon).to.not.be(void 0),expect(r._icon.parentNode).to.be(e._panes.markerPane)}),it("does not appear when too far away when added before the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([3.5,1.5]);a.addLayer(r),e.addLayer(a),expect(r._icon).to.be(void 0)}),it("does not appear when too far away when added after the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([3.5,1.5]);e.addLayer(a),a.addLayer(r),expect(r._icon).to.be(void 0)})});