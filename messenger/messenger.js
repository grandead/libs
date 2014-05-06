//The following copyright message should appear at the top of all 
//source files. This file can be removed from your repository.

//Copyright (c) 2014 TvMan. All rights reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//    Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

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
        for (i = 0; i < messages[message].length; i += 1) {
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