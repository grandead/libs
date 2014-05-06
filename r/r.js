//The following copyright message should appear at the top of all 
//source files. This file can be removed from your repository.

//Copyright (c) 2014 TvMan. All rights reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

(function (root) {
    'use strict';
    if (root.modules !== undefined || root.define !== undefined || root.require !== undefined) {
        throw new root.Error('Can not initialize r.js');
    }
    var getModule = function (name) {
        if (root.modules[name] === undefined) {
            throw new root.Error('Module ' + name + ' is undefined.');
        }
        return root.modules[name];
    };
    root.modules = {};
    root.define = function (name, dependencies, func) {
        if (root.modules[name] !== undefined) {
            throw new root.Error('Module with name ' + name + ' is exist.');
        }
        root.modules[name] = {
            func: func,
            dependencies: dependencies,
            moduleObject: undefined
        };
    };
    root.require = function (dependencies, func) {
        var dependenciesObjects = [],
            module,
            i;
        for (i = 0; i < dependencies.length; i += 1) {
            module = getModule(dependencies[i]);
            if (module.moduleObject === undefined) {
                module.moduleObject = root.require(module.dependencies, module.func);
            }
            dependenciesObjects[i] = module.moduleObject;
        }
        return func.apply(func, dependenciesObjects);
    };
}(window));