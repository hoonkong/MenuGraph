var JsonMenu;
(function (menuGraph) {
    var MenuSuper = function(text) {
    }
    
    var MenuItem = function (text) {
        
        this.inherits(MenuSuper, text);
        
        var children;
        var isVisible = true;
        
        var expandDomElement = (function () {
            var expandSpan = document.createElement("span");
            expandSpan.appendChild(document.createTextNode("+"));
            expandSpan.className = "showMore";
            return expandSpan;
        })();
        
        var collapseDomElement = (function () {
            var collapseSpan = document.createElement("span");
            collapseSpan.appendChild(document.createTextNode("-"));
            collapseSpan.className = "showMore";
            return collapseSpan;
        })();
        
        var domElement = (function () {
            var miDiv = document.createElement("div");            
            if (text) {   
                miDiv.appendChild(expandDomElement);
                miDiv.appendChild(collapseDomElement);
                miDiv.appendChild(document.createTextNode(text));
                
                miDiv.addEventListener("click", function (event) {
                    var i;                    
                    if (children && children.length && event.target === domElement)
                    {
                        toggleExapndCollapse();
                        for (i = 0; i < children.length; i++) {
                            children[i].setVisible(!children[i].getVisible());
                        }
                    }
                });              
            }      
            
            return miDiv;
        })();
        
        var toggleExapndCollapse = function () {
            var expandVal = expandDomElement.style.display;
            expandDomElement.style.display = (expandVal === "none") ? "inline-block" : "none";            
            var collapseVal = collapseDomElement.style.display;
            collapseDomElement.style.display = (collapseVal === "none") ? "inline-block" : "none";
        }
                
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
        
        var setVisible = function (visible) {
            isVisible = visible;
            domElement.style.display = visible ? "block" : "none";
        }
        
        var showExapand = function (visible) {            
            expandDomElement.style.display = "inline-block";
            collapseDomElement.style.display = "none";
        }
        
        var getVisible = function () {
            return isVisible;
        }
        
        this.appendChildItem = appendChildItem;
        this.getDomElement = getDomElement;
        this.toString = toString;
        this.setVisible = setVisible;
        this.getVisible = getVisible;
        this.showExpand = showExapand;
    }
    
    var createMenuHelper = function (menuJson, menuItem, level) {
        var i;
        var parentItem = menuItem;
        
        var parentDomElement = parentItem.getDomElement();
        
        for (i = 0; i < menuJson.length; i++) {            
            menuItem = parentItem.appendChildItem(menuJson[i].text);
            if (level > 0) {
                menuItem.setVisible(false);
            }
            parentDomElement.appendChild(menuItem.getDomElement());
            //console.log(menuItem.toString() + " - lvl: " + level);
            if (menuJson[i].children && menuJson[i].children.length && menuJson[i].children.constructor === Array) {
                menuItem.showExpand();
                createMenuHelper(menuJson[i].children, menuItem, level + 1);
            }
        }        
        
        return parentDomElement;
    }
    
    var createMenu = function (menuJson, containerId) {
        var headDomElement = createMenuHelper(menuJson, new MenuItem(), 0);
        document.getElementById(containerId).appendChild(headDomElement);
    }
    
    menuGraph.createMenu = createMenu;
})(JsonMenu|| (JsonMenu = {}));

document.addEventListener("DOMContentLoaded", function(event) {
    var menu = [
        {
            text: "Menu item 1",
            children: [
                { text: "Menu item 1-1" },
                { 
                    text: "Menu item 1-2",
                    children: [
                        { text :"Menu item 1-2-1" },
                        { text: "Menu item 1-2-2" },
                        { text: "Menu item 1-2-3" },
                        { text :"Menu item 1-2-4" },
                        { text: "Menu item 1-2-5" },
                        { text: "Menu item 1-2-6" },
                        { text :"Menu item 1-2-7" },
                        { text: "Menu item 1-2-8" },
                        { text: "Menu item 1-2-9" }
                    ]
                },
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
                        { 
                            text: "Menu item 3-3-2",
                            children: [
                                { text :"Menu item 3-3-2-1" },
                                { text: "Menu item 3-3-2-2" },
                                { text: "Menu item 3-3-2-3" }
                            ]
                        },
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
    
    JsonMenu.createMenu(menu, "menu");
});