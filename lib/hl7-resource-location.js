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




LocationSchema = new SimpleSchema({
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
    optional: true,
    type: Number
  }, // R!  Longitude with WGS84 datum
  "position.latitude" : {
    optional: true,
    type: Number
  }, // R!  Latitude with WGS84 datum
  "position.altitude" : {
    optional: true,
    type: Number
  }, // Altitude with WGS84 datum
  "managingOrganization" : {
    optional: true,
    type: ReferenceSchema
  }, // Organization responsible for provisioning and upkeep
  "partOf" : {
    optional: true,
    type: ReferenceSchema
  } // Another Location this one is physically part of

});
Locations.attachSchema(LocationSchema);
