!function(){L.QuickHull={getDistant:function(n,t){var l=t[1].lat-t[0].lat,i=t[0].lng-t[1].lng;return i*(n.lat-t[0].lat)+l*(n.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(n,t){var l,i,u,e=0,o=null,a=[];for(l=t.length-1;l>=0;l--)i=t[l],u=this.getDistant(i,n),u>0&&(a.push(i),u>e&&(e=u,o=i));return{maxPoint:o,newPoints:a}},buildConvexHull:function(n,t){var l=[],i=this.findMostDistantPointFromBaseLine(n,t);return i.maxPoint?(l=l.concat(this.buildConvexHull([n[0],i.maxPoint],i.newPoints)),l=l.concat(this.buildConvexHull([i.maxPoint,n[1]],i.newPoints))):[n[0]]},getConvexHull:function(n){var t,l=!1,i=!1,u=null,e=null;for(t=n.length-1;t>=0;t--){var o=n[t];(l===!1||o.lat>l)&&(u=o,l=o.lat),(i===!1||o.lat<i)&&(e=o,i=o.lat)}var a=[].concat(this.buildConvexHull([e,u],n),this.buildConvexHull([u,e],n));return a}}}(),L.MarkerCluster.include({getConvexHull:function(){var n,t,l=this.getAllChildMarkers(),i=[];for(t=l.length-1;t>=0;t--)n=l[t].getLatLng(),i.push(n);return L.QuickHull.getConvexHull(i)}});