var DOM_CONTROL = {
    NavSelection: function(selection) {
        var links = document.querySelectorAll(selection);
        if (links.length > 0) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener('click', function(e) {
                    var active = document.querySelector('a.active');
                    if(active!==null){
                        active.setAttribute('class', '');
                    }                    
                    this.setAttribute('class', 'active');
                });
            }
        }
    }
};

window.onload = function() {
    DOM_CONTROL.NavSelection('.nav-pills li a');
    DOM_CONTROL.NavSelection('div.console-panel ul li a');
};

console.log('DOM_CONTROL loaded');