var MenuGraph;
(function (menuGraph) {
    var MenuItem = function (text) {        
        var children;
        var domElement = (function () {
            var miDiv = document.createElement("div");
            if (text) {
                miDiv.appendChild(document.createTextNode(text));
            }
            return miDiv;
        })();
        
        var appendChildItem = function (displayText) {
            if (!children) {
                children = [];
            }            
            var item = new MenuItem(displayText);
            children.push(item);
            return item;
        }
        
        var toString = function () {
            return text;
        }
        
        var getDomElement = function () {
            return domElement;
        }
        
        this.appendChildItem = appendChildItem;
        this.getDomElement = getDomElement;
        this.toString = toString;
    }
    
    var createMenuHelper = function (menuJson, menuItem) {
        var i;
        var parentItem = menuItem;
        
        var parentDomElement = parentItem.getDomElement();
        
        for (i = 0; i < menuJson.length; i++) {            
            menuItem = parentItem.appendChildItem(menuJson[i].text);
            parentDomElement.appendChild(menuItem.getDomElement());
            console.log(parentItem.toString() + " - " + menuItem.toString());
            if (menuJson[i].children && menuJson[i].children.length && menuJson[i].children.constructor === Array) {                
                createMenuHelper(menuJson[i].children, menuItem);
            }
        }
        
        return parentDomElement;
    }
    
    var createMenu = function (menuJson, containerId) {
        var headDomElement = createMenuHelper(menuJson, new MenuItem());
        document.getElementById(containerId).appendChild(headDomElement);
    }
    
    menuGraph.createMenu = createMenu;
})(MenuGraph || (MenuGraph = {}));

document.addEventListener("DOMContentLoaded", function(event) {
    var menu = [
        {
            text: "Menu item 1",
            children: [
                { text: "Menu item 1-1" },
                { text: "Menu item 1-2" },
                { text: "Menu item 1-3" },
                { text: "Menu item 1-4" }
            ]
        },
        {
            text: "Menu item 2",
            children: [
                { text :"Menu item 2-1" },
                { text: "Menu item 2-2" },
                { text: "Menu item 2-3" }
            ]
        },
        {
            text: "Menu item 3",
            children: [
                { text: "Menu item 3-1" },
                { text: "Menu item 3-2" },
                { 
                    text: "Menu item 3-3",
                    children: [
                        { text :"Menu item 3-3-1" },
                        { text: "Menu item 3-3-2" },
                        { text: "Menu item 3-3-3" }
                    ]
                },
                { text: "Menu item 3-4" },
                { text: "Menu item 3-5" }
            ]
        },
        {
            text: "Menu item 4",
            children: [
                { text: "Menu item 4-1" },
                { text: "Menu item 4-2" },
                { text: "Menu item 4-3" }                            
            ]
        },
        {
            text: "Menu item 5",
            children: [
                { text: "Menu item 5-1" },
                { text: "Menu item 5-2" },
                { text: "Menu item 5-3" },
                { text: "Menu item 5-4" }                
            ]
        }
    ];
    
    MenuGraph.createMenu(menu, "menu");
});