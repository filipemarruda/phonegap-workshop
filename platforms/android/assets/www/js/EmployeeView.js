var EmployeeView = function(employee) {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.$el.on('click', '.add-location-btn', this.addLocation);
        this.$el.on('click', '.change-pic-btn', this.changePicture);
        this.$el.on('click', '.add-contact-btn', this.addToContacts);
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
	  var options =   {   quality: 50,
	                      destinationType: Camera.DestinationType.DATA_URL,
	                      sourceType: Camera.PictureSourceType.CAMERA,
	                      encodingType: 0,
	                      correctOrientation: true
	                  };

	  navigator.camera.getPicture(
	      function(imgData) {
	          $('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData);
	      },
	      function() {
	          alert('Error taking picture', 'Error');
	      },
	      options);

	  return false;
	};

	this.addToContacts = function(event) {
    event.preventDefault();
	    
	    console.log('addToContacts');
	    
	    if (!navigator.contacts) {
	        alert("Contacts API not supported", "Error");
	        return;
	    }
	    
	    var save = confirm("Do you really want save " + employee.firstName + " " + employee.lastName + " in your contacts?");
	    alert(save);

	    if(save){
		
		    var contact = navigator.contacts.create();
		    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		    var phoneNumbers = [];
		    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
		    contact.phoneNumbers = phoneNumbers;
		    contact.save();
	    	
	    }
		
		return false;
	
	};

    this.initialize();

}
