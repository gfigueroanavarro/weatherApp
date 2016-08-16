require.config({
    baseUrl: '/lib',
    paths: {
        jQuery: '../../scripts/jquery-3.1.0.min',
        knockout: '../../knockout-3.4.0',
        'jasmine': '../../scripts/jasmine/jasmine',
        'jasmine-html': '../../scripts/jasmine/jasmine-html',
        spec: '../../scripts/jasmine/spec/'
    },
     shim: {
        'jQuery': {
            exports: '$'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});