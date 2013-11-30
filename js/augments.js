Object.prototype.inherits = function (Func) {
    "use strict"
    
    if (Func && typeof Func === "function") {
        console.log(Func.prototype.constructor.toString());
        var F = new Func(arguments[1]);        
        for (var k in F) {
            if (F.hasOwnProperty(k)) {
                this[k] = F[k];
            }
        }
        this.prototype = F.prototype;
    }
}