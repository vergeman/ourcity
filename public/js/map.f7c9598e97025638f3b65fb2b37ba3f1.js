window.onload = function() {

    function slugify(text) {
	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "-");
	return text;
    }

    /** populate data **/
    $.each(ourcityFeatures.features, function(name, value) {
	$('#neighborhoods').append(
	    '<li id="' + slugify(value.properties.name) + '">' + 
		'<a href=#>' + value.properties.name + '</a></li>');

    });


    //initalize map
    var map = L.map('map',  {

/* options to dicuss
	scrollWheelZoom: false,
	touchZoom: false,
        doubleClickZoom: false,
        zoomControl: false,
        dragging: false,
*/
        maxZoom:16,
        minZoom:8
    });
    

    /** center **/
    map.setView([32.7153292, -117.0402551], 11);

    /** tiles **/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    /** geojson layer - declared now for styling access **/
    var geojson;


    /** Control **/
    var info = L.control({position: 'bottomleft'});

    info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
    };


    /** update the control based on feature properties passed **/

    info.update = function (props) {
	this._div.innerHTML = (props ?
			       '<b>' + props.name + '</b><br />' :'' );
    };
    
    /* Styles: Neighborhood */

    var defaultStyle = {
        color: "#2262CC",
        weight: 2,
        opacity: 0.6,
        fillOpacity: 0.1,
        fillColor: "#2262CC"
    };
    
    var highlightStyle = {
        color: '#2262CC', 
        weight: 3,
        opacity: 0.6,
        fillOpacity: 0.65,
        fillColor: '#2262CC'
    };

    /** highlight event **/
    function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle(highlightStyle);

	if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
	}
	info.addTo(map);
	info.update(layer.feature.properties);
    }

    /** highlight event:reset **/
    function resetHighlight(e) {
	geojson.resetStyle(e.target);
	//info.update();
	info.removeFrom(map);
    }

    /** zoom on-click **/
    function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
    }

    /** attach events foreach feature **/
    function eachFeature(feature, layer) {

	layer.on({
	    mouseover: highlightFeature,
	    mouseout: resetHighlight,
	    click: zoomToFeature
	});


	$('#' + slugify(feature.properties.name)).hover(
	    function() {
		layer.fire("mouseover"); }, 
	    function() {
		layer.fire("mouseout"); }
	);

	$('#' + slugify(feature.properties.name)).click( 
	    function() {
		layer.fire("click");
	    }
	);

    }

    /** attach behaviors to map **/
    geojson = L.geoJson(ourcityFeatures, {
	style: defaultStyle,
	onEachFeature: eachFeature
    }).addTo(map);
}