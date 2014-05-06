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
        for (i = 0; i < dependencies.length; i++) {
            module = getModule(dependencies[i]);
            if (module.moduleObject === undefined) {
                module.moduleObject = root.require(module.dependencies, module.func);
            }
            dependenciesObjects[i] = module.moduleObject;
        }
        return func.apply(func, dependenciesObjects);
    };
}(window));