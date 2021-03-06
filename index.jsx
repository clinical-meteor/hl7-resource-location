

import LocationsSimplePage from './client/LocationsSimplePage';
import LocationsPage from './client/LocationsPage';
import LocationsTable from './client/LocationsTable';
import { Location, Locations, LocationSchema } from './lib/Locations';

var DynamicRoutes = [{
  'name': 'LocationsPage',
  'path': '/locations',
  'component': LocationsPage,
  'requireAuth': true
}, {
  'name': 'LocationsSimplePage',
  'path': '/locations-basic',
  'component': LocationsSimplePage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Locations',
  'to': '/locations',
  'href': '/locations'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  LocationsPage,
  LocationsTable
};


