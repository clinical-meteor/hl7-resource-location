describe('clinical:hl7-resources-location', function () {
  var server = meteor();
  var client = browser(server);

  it('Locations should exist on the client', function () {
    return client.execute(function () {
      expect(Locations).to.exist;
    });
  });

  it('Locations should exist on the server', function () {
    return server.execute(function () {
      expect(Locations).to.exist;
    });
  });

});
