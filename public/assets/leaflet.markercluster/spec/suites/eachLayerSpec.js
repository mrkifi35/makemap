describe("eachLayer",function(){var e,n;beforeEach(function(){n=document.createElement("div"),n.style.width="200px",n.style.height="200px",document.body.appendChild(n),e=L.map(n,{maxZoom:18}),e.fitBounds(new L.LatLngBounds([[1,1],[2,2]]))}),afterEach(function(){document.body.removeChild(n)}),it("hits polygons and markers before adding to map",function(){var e=new L.MarkerClusterGroup,n=new L.Polygon([[1.5,1.5],[2,1.5],[2,2],[1.5,2]]),t=new L.Marker([1.5,1.5]);e.addLayers([n,t]);var a=[];e.eachLayer(function(e){a.push(e)}),expect(a.length).to.be(2),expect(a).to.contain(t),expect(a).to.contain(n)}),it("hits polygons and markers after adding to map",function(){var n=new L.MarkerClusterGroup,t=new L.Polygon([[1.5,1.5],[2,1.5],[2,2],[1.5,2]]),a=new L.Marker([1.5,1.5]);n.addLayers([t,a]),e.addLayer(n);var o=[];n.eachLayer(function(e){o.push(e)}),expect(o.length).to.be(2),expect(o).to.contain(a),expect(o).to.contain(t)})});