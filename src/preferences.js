
/**
* Constructor
*
*/
function Preferences (name, defaults, options, callback) {

	// support alternate signature Preferences (name, options, callback)
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	// setup the default options
	options.prefix = '';

	this.name = name;
	this.defaults = defaults;
	this.options = options;
	this.initCallback = callback;
	this.storage = window.localStorage;

	// setup the prefix
	this.prefix = this.determinePrefix(name, options);

	// set the defaults on the database and load the rest
	this.preferences = this.loadPreferences();

	callback(null, this.preferences);

}

Preferences.prototype.determinePrefix = function (name, options) {

	return name + '-' + ((options.prefix && options.prefix.length) ? options.prefix + '' : '');

};

Preferences.prototype.prefixedKey = function (key) {

	return this.prefix + '-' + key;

};

Preferences.prototype.loadPreferences = function () {

	var preferences = {};

	for (key in this.defaults) {
		preferences[key] = this.set(key, this.get(key) || this.defaults[key]);
	}

	return preferences;

};

Preferences.prototype.set = function (key, value) {

	if (this.get(key) !== value) {
		this.store(key, value);
	}

	// define property
	if (Object.defineProperty && !this[key]) {

		Object.defineProperty(this, key, {
			enumerable: true,
			set: function (newValue) {
				this.store(key, newValue);
			},
			get: function () {
				return this.get(key);
			}
		});

	}

	return this.get(key);

};

Preferences.prototype.get = function (key) {
	return this.storage[this.prefixedKey(key)];
};

Preferences.prototype.getObject = function () {
	return this.preferences = this.loadPreferences();
};

Preferences.prototype.store = function (key, value) {

	this.storage[this.prefixedKey(key)] = value;

	return this;


};

window.Preferences = Preferences;