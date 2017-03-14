(function() {
    'use strict';
    angular
        .module('main')
        .factory('Module', Module);

    Module.$inject = ['$resource','Config'];

    function Module ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/modules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();