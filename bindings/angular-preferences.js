angular.module('angularPreferences', [])
.provider('preferences', function () {

	var name, defaults, options;

	this.name = function (value) {
		name = value;
	};

	this.defaults = function (value) {
		defaults = value;
	};

	this.options = function (value) {
		options = value;
	};

	this.$get = function () {

		return new PreferencesJS(this.name, this.defaults, this.options);

	};

})
.config(function (preferencesProvider) {
	preferencesProvider.name = 'angularPreferences';
	preferencesProvider.defaults = {
		installed: 1
	};
});