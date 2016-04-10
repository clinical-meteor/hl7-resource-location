
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


if (Meteor.isClient){
  Meteor.subscribe("Locations");
}

if (Meteor.isServer){
  Meteor.publish("Locations", function (argument){
    if (this.userId) {
      return Locations.find();
    } else {
      return [];
    }
  });
}



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
