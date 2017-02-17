(function() {
    'use strict';
    angular
        .module('main')
        .factory('Quotation', Quotation);

    Quotation.$inject = ['$resource', 'Config', 'DateUtils'];

    function Quotation ($resource, Config, DateUtils) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/quotations';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                },
                isArray:true
            },
            'update': { 
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.date = DateUtils.convertLocalDateToServer(copy.date);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();