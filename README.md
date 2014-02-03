Preferences.js
==============

A library to make storing preferences in JavaScript super simple. Browser tested only at this stage.

Usage
-----

Setup preferences, passing in an object of the defaults.

	// setup the default preferences
	var preferences = new window.Preferences('applicationName', {
		email: 'someemailaddress@domain.com',
		emailUponCompletion: true
	});

You can also use a callback:

	// setup the default preferences
	var preferences = new window.Preferences('applicationName', {
		email: 'someemailaddress@domain.com',
		emailUponCompletion: true
	}, function (err, prefsObject) {
		// do something with prefsObject
	});

You can also retrieve values individually (following on from above):

	preferences.get('email');

And set values individually,

	preferences.set('email', 'anotheremailaddress@domain.com');

You can even access preferences via a property on the preferences object of the same name:

	var email = preferences.email;

And set them directly too:

	preferences.email = 'anotheremailaddress@domain.com';

When setting in such a fashion, new values are automatically persisted.
