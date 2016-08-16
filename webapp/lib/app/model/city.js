define([], function () {
    function city(code,name,lat,longi,country,fullName) {
        this.code = code;
        this.name = name;
        this.lat = lat;
        this.longi = longi;
        this.country = country;
        this.fullName = fullName;
    }
    return city;
});

