Package.describe({
  name: 'clinical:hl7-resource-location',
  version: '1.2.6',
  summary: 'HL7 FHIR Resource - Location',
  git: 'https://github.com/clinical-meteor/hl7-resource-location',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.5.0');
  
  api.use('simple:json-routes@2.1.0');
  api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@3.0.0');
  api.use('clinical:hl7-resource-bundle@1.3.10');

  api.addFiles('lib/hl7-resource-location.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.export('Location');
  api.export('Locations');
  api.export('LocationSchema');
});