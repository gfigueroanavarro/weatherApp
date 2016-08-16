define(function () {
    function apiType(code,name,modelInstance) {
        this.code = code;
        this.name = name;
        this.modelInstance = modelInstance;
    }

    apiType.prototype = {
        getCode: function () {
            return this.code;
        },
        getName: function () {
            return this.name;
        }
    };

    return apiType;
});