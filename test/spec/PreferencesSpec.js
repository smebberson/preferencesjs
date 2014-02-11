describe("Preferences", function() {

	var preferences;

	beforeEach(function() {
		preferences = new PreferencesJS('PreferencesTestSuite', {
			instantiated: true,
			completed: false,
			string: 'string',
			obj: { prop: 'value' }
		});
	});

	it("should be able to instantiate", function() {
		expect(preferences instanceof PreferencesJS).toBeTruthy();
	});

	describe("should store multiple data types", function () {

		it("including strings", function () {
			expect(typeof preferences.string === 'string').toBeTruthy();
		});

		it("including objects", function () {
			expect(typeof preferences.obj === 'object').toBeTruthy();
		});

		describe("with boolean", function () {

			it("should map true (string) to true (boolean)", function () {
				expect(preferences.get('instantiated')).toBe(true);
			});

			it("should map false (string) to false (boolean)", function () {
				expect(preferences.get('completed')).toBe(false);
			});

		});

	});
	
});