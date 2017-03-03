(function() {
    'use strict';

    angular
        .module('main')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$state', '$sessionStorage', '$translate', 'JhiLanguageService', 'translationHandler', '$window',
        'Auth', 'Principal', 'VERSION','Config'];

    function stateHandler($rootScope, $state, $sessionStorage, $translate, JhiLanguageService, translationHandler, $window,
        Auth, Principal, VERSION, Config) {
        return {
            initialize: initialize
        };

        function initialize() {
            $rootScope.VERSION = VERSION;
            $rootScope.CLOUNDINARY_URL = Config.ENV.CLOUNDINARY_URL;
            var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;

                // Redirect to a state with an external URL (http://stackoverflow.com/a/30221248/1098564)
                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

                if (Principal.isIdentityResolved()) {
                    Auth.authorize();
                }

                
                    // Update the language
                JhiLanguageService.getCurrent().then(function (language) {
                            $translate.use(language);
                        });
                
            });


            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                    stateChangeStart();
                }
                if(angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null){
                    stateChangeSuccess();
                }
            });
        }
    }
})();
