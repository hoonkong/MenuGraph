var MenuGraph;
(function (menuGraph) {
    var MenuItem = function (text, parentDomNode) {
        
        var createDomElement = function (displayText) {
            var miDiv = document.createElement("div");
            miDiv.appendChild(document.createTextNode(displayText));
            return miDiv;
        }
        
        var children;
        var domElement = createDomElement(text);         
        
        var appendChildItem = function (displayText) {
            if (!children) {
                children = [];
            }
            
            var item = new MenuItem(displayText, domElement);
            children.push(item);
            
            domElement.appendChild(createDomElement);
            
            return item;
        }
        
        var toString = function ()
        {
            return "MenuItem: " + text;
        }
        
        this.appendChildItem = appendChildItem;
        this.toString = toString;
    }
    
    var createMenu = function (menuJson, parentItem) {
        var i, menuItem;
        parentItem = parentItem || new MenuItem("Head");
        
        //console.log(parentItem.toString());
        
        for (i = 0; i < menuJson.length; i++) {            
            menuItem = parentItem.appendChildItem(menuJson[i].text);
            console.log(parentItem.toString() + " - " + menuItem.toString());
            if (menuJson[i].children && menuJson[i].children.length && menuJson[i].children.constructor === Array) {
                //console.log("processing children " + menuJson[i].children);
                createMenu(menuJson[i].children, menuItem);
            }
        }
        return parentItem;
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
                { text: "Menu item 3-3" },
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
    console.log("DOM fully loaded and parsed");
    
    var headItem = MenuGraph.createMenu(menu, document.getElementById("menu"));
});