describe("addLayers adding multiple markers",function(){var e,a;beforeEach(function(){a=document.createElement("div"),a.style.width="200px",a.style.height="200px",document.body.appendChild(a),e=L.map(a,{maxZoom:18}),e.fitBounds(new L.LatLngBounds([[1,1],[2,2]]))}),afterEach(function(){document.body.removeChild(a)}),it("creates a cluster when 2 overlapping markers are added before the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]),n=new L.Marker([1.5,1.5]);a.addLayers([r,n]),e.addLayer(a),expect(r._icon).to.be(void 0),expect(n._icon).to.be(void 0),expect(e._panes.markerPane.childNodes.length).to.be(1)}),it("creates a cluster when 2 overlapping markers are added after the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]),n=new L.Marker([1.5,1.5]);e.addLayer(a),a.addLayers([r,n]),expect(r._icon).to.be(void 0),expect(n._icon).to.be(void 0),expect(e._panes.markerPane.childNodes.length).to.be(1)}),it("creates a cluster and marker when 2 overlapping markers and one non-overlapping are added before the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]),n=new L.Marker([1.5,1.5]),t=new L.Marker([3,1.5]);a.addLayers([r,n,t]),e.addLayer(a),expect(r._icon).to.be(void 0),expect(n._icon).to.be(void 0),expect(t._icon.parentNode).to.be(e._panes.markerPane),expect(e._panes.markerPane.childNodes.length).to.be(2)}),it("creates a cluster and marker when 2 overlapping markers and one non-overlapping are added after the group is added to the map",function(){var a=new L.MarkerClusterGroup,r=new L.Marker([1.5,1.5]),n=new L.Marker([1.5,1.5]),t=new L.Marker([3,1.5]);e.addLayer(a),a.addLayers([r,n,t]),expect(r._icon).to.be(void 0),expect(n._icon).to.be(void 0),expect(t._icon.parentNode).to.be(e._panes.markerPane),expect(e._panes.markerPane.childNodes.length).to.be(2)})});