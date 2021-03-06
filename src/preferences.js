
/**
* Constructor
*
*/
(function () {

	function Preferences (name, defaults, options, callback) {

		// support alternate signature Preferences (name, options, callback)
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		options = options || {};
		defaults = defaults || {};

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

		if (callback !== undefined && typeof callback === 'function') callback(null, this.preferences);

	}

	Preferences.prototype.determinePrefix = function (name, options) {

		return name + '-' + ((options.prefix && options.prefix.length) ? options.prefix + '-' : '');

	};

	Preferences.prototype.prefixedKey = function (key) {

		return this.prefix + key;

	};

	Preferences.prototype.loadPreferences = function () {

		var preferences = {},
		key;

		// loop through anything that is currently within storage and load it in
		for (key in this.storage) {

			var regex = new RegExp('(?:' + this.prefix + ')(.+)$'),
				match = key.match(regex);

			if (match) {
				key = match[1];
				preferences[key] = this.set(key, this.get(key));
			}
		}

		// now loop through the defaults and assign anything that was missed via storage
		for (key in this.defaults) {
			preferences[key] = this.set(key, this.get(key) || this.defaults[key]);
		}

		return preferences;

	};

	Preferences.prototype.set = function (key, value) {

		/* manage complex data types */
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}

		if (this.get(key) !== value) {
			this.store(key, value);
		}

		// define property, only once
		if (Object.defineProperty && this[key] === undefined) {

			Object.defineProperty(this, key, {
				enumerable: true,
				set: function (newValue) {
					this.set(key, newValue);
				},
				get: function () {
					return this.get(key);
				}
			});

		}

		return this.get(key);

	};

	Preferences.prototype.get = function (key) {

		var value = this.storage[this.prefixedKey(key)];

		if (typeof value === 'string' && (value === 'true' || value === 'false')) {
			value = value === 'true';
		} else if (typeof value === 'string') {
			try {
				value = JSON.parse(value);
			} catch (e) {
				// no-op
			}
		}

		return value;

	};

	Preferences.prototype.getObject = function () {
		return this.preferences = this.loadPreferences();
	};

	Preferences.prototype.store = function (key, value) {

		this.storage[this.prefixedKey(key)] = value;
		// this.emit('store', key, value)

		return this;


	};

	window.PreferencesJS = Preferences;

})();