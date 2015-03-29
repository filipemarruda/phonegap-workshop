var EmployeeView = function(employee) {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.$el.on('click', '.add-location-btn', this.addLocation);
        this.$el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function() {
        this.$el.html(this.template(employee));
        return this;
    };

    this.addLocation = function(event) {
	  event.preventDefault();
	  navigator.geolocation.getCurrentPosition(
	      function(position) {
	          alert(position.coords.latitude + ',' + position.coords.longitude);
	      },
	      function(error) {
	          alert('Error getting location : ' + error);
	      });
	  return false;
	};

	this.changePicture = function(event) {
	  event.preventDefault();
	  if (!navigator.camera) {
	      alert("Camera API not supported", "Error");
	      return;
	  }
	  navigator.camera.getPicture(
	  	function(imageURI) {
		    var image = document.getElementById('myImage');
		    image.src = imageURI;
		},
		function(message) {
		    alert('Failed because: ' + message);
		}, 
		{ quality: 50, destinationType: Camera.DestinationType.FILE_URI }
	  );
	  return false;
	};

    this.initialize();

}
