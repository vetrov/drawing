var shapeController = (function () {
    return {
        addShape: function(type) {
            var canvas = document.getElementById('canvas');
            var shape = document.createElement('div');
            shape.className = type;
            shape.setAttribute('shapeType', type);

            canvas.appendChild(shape);

            dragController.makeDraggable(shape);
        }
    }

}());

['Rectangle', 'Square', 'Ellipse', 'Circle', 'Label'].forEach(function (shape) {
    var elem = document.getElementById('add' + shape);
    elem.onclick = function () {
        shapeController.addShape(shape.toLowerCase());
    }
});

var modeButton = document.getElementById('toggleMode');
modeButton.onclick = function (e) {
    var mode = dragController.toggleMode();
    e.target.value = 'current mode: ' + mode;
}
