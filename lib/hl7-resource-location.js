
Locations = new Meteor.Collection('locations');

if (Meteor.isClient){
  Meteor.subscribe('locations');
}



LocationSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Location"
    }
});
Locations.attachSchema(LocationSchema);
