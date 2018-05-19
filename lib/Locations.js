if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited.");
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");
  console.log("");
  console.log("meteor remove clinical:autopublish");
  console.log("");
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");
  console.log("meteor remove autopublish");
  console.log("meteor add clinical:autopublish");
  console.log("");
}





// create the object using our BaseModel
Location = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
Location.prototype._collection = Locations;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Locations = new Mongo.Collection('Locations');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Locations._transform = function (document) {
  return new Location(document);
};


if(Meteor.isServer){
  Locations._ensureIndex({ "location": "2dsphere"});
}




LocationSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "Location"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Unique code or number identifying the location to its users
  "status" : {
    optional: true,
    type: Code
  }, // active | suspended | inactive
  "name" : {
    optional: true,
    type: String
  }, // Name of the location as used by humans
  "description" : {
    optional: true,
    type: String
  }, // Description of the location
  "mode" : {
    optional: true,
    type: Code
  }, // instance | kind
  "type" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Type of function performed
  "telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
  }, // Contact details of the location
  "address" : {
    optional: true,
    type: AddressSchema
  }, // Physical location
  "physicalType" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Physical form of the location
  "position.longitude" : {
    decimal: true,
    type: Number
  }, // R!  Longitude with WGS84 datum
  "position.latitude" : {
    decimal: true,
    type: Number
  }, // R!  Latitude with WGS84 datum
  "position.altitude" : {
    optional: true,
    type: Number
  }, // Altitude with WGS84 datum
  "location" : {
    optional: true,
    blackbox: true,
    type: Object
  }, // Altitude with WGS84 datum
  "managingOrganization" : {
    optional: true,
    type: ReferenceSchema
  }, // Organization responsible for provisioning and upkeep
  "partOf" : {
    optional: true,
    type: ReferenceSchema
  } // Another Location this one is physically part of
}]);
Locations.attachSchema(LocationSchema);







//=================================================================


Locations.fetchBundle = function (query, parameters, callback) {
  var locationArray = Locations.find(query, parameters, callback).map(function(location){
    location.id = location._id;
    delete location._document;
    return location;
  });

  // console.log("locationArray", locationArray);

  var result = Bundle.generate(locationArray);

  // console.log("result", result.entry[0]);

  return result;
};


/**
 * @summary This function takes a FHIR resource and prepares it for storage in Mongo.
 * @memberOf Locations
 * @name toMongo
 * @version 1.6.0
 * @returns { Location }
 * @example
 * ```js
 *  let locations = Locations.toMongo('12345').fetch();
 * ```
 */

Locations.toMongo = function (originalLocation) {
  var mongoRecord;

  if (originalLocation.telecom && originalLocation.telecom[0]) {
    originalLocation.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }

  if (originalLocation.address && !originalLocation.address.resourceType) {
    originalLocation.address.resourceType = "Address";
  }

  return originalLocation;
};


/**
 * @summary Similar to toMongo(), this function prepares a FHIR record for storage in the Mongo database.  The difference being, that this assumes there is already an existing record.
 * @memberOf Locations
 * @name prepForUpdate
 * @version 1.6.0
 * @returns { Object }
 * @example
 * ```js
 *  let locations = Locations.findMrn('12345').fetch();
 * ```
 */

Locations.prepForUpdate = function (location) {

  if (location.telecom && location.telecom[0]) {
    process.env.TRACE && console.log("location.name", location.name);
  
    location.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }
  
  if (location.address && location.address) {  
    location.address.resourceType = "Address";
  }


  return location;
};


/**
 * @summary Scrubbing the location; make sure it conforms to v1.6.0
 * @memberOf Locations
 * @name scrub
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let locations = Locations.findMrn('12345').fetch();
 * ```
 */

Locations.prepForFhirTransfer = function (location) {
  //console.log("Locations.prepForBundle()");

  // // FHIR has complicated and unusual rules about dates in order
  // // to support situations where a family member might report on a location's
  // // date of birth, but not know the year of birth; and the other way around
  // if (location.birthDate) {
  //   location.birthDate = moment(location.birthDate).format("YYYY-MM-DD");
  // }
  

  if (location.telecom && location.telecom[0]) {
    location.telecom.forEach(function(telecom){
      delete telecom.resourceType;
    });
  }

  delete location.address.resourceType;

  process.env.TRACE && console.log("Locations.prepForBundle()", location);

  return location;
};

/**
 * @summary Returns the record in LatLng object
 * @memberOf Location
 * @name toLatLng
 * @version 1.2.3
 * @returns {Object}
 * @example
 * ```js
 * ```
 */

Location.prototype.toLatLng = function () {
  return {};
};


export default { Location, Locations, LocationSchema };