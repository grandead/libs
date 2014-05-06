(function (root) {
    'use strict';
    if (root.messenger !== undefined) {
        throw new root.Error('Can not initialize messenger.js');
    }
    var messages = {};
    root.messenger = {};
    root.messenger.send = function (message, data) {
        if (message === undefined) {
            throw new root.Error('Message is undefined.');
        }
        if (data === undefined) {
            throw new root.Error('Data is undefined.');
        }
        if (messages[message] === undefined) {
            throw new root.Error('Can not find message "' + message + '".');
        }
        var i;
        for (i = 0; i < messages[message].length; i++) {
            messages[message][i](data);
        }
    };
    root.messenger.subscribe = function (message, callback) {
        if (message === undefined) {
            throw new root.Error('Message is undefined.');
        }
        if (callback === undefined) {
            throw new root.Error('Callback is undefined.');
        }
        if (messages[message] === undefined) {
            messages[message] = [callback];
            return;
        }
        messages[message].push(callback);
    };
}(window));