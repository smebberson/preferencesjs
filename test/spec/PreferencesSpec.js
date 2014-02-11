describe("Preferences", function() {

	var preferences;

	beforeEach(function() {
		preferences = new PreferencesJS('PreferencesTestSuite', {
			instantiated: true,
			completed: false,
			string: 'string'
		});
	});

	it("should be able to instantiate", function() {
		expect(preferences instanceof PreferencesJS).toBeTruthy();
	});

	describe("should store multiple data types", function () {

		it("strings", function () {
			expect(typeof preferences.string).toBeTruthy();
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