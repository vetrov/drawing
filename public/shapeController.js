var shapeController = (function () {
    return {
        addShape: function(type, callback) {
            var canvas = document.getElementById('canvas');
            var shape = document.createElement('div');
            shape.className = type;
            shape.setAttribute('shapeType', type);

            if (type === 'label') {
                shape.innerHTML = 'I am a text label';
            }

            canvas.appendChild(shape);

            dragController.makeDraggable(shape);
            callback.call(null, shape);
        }
    }

}());

['Rectangle', 'Square', 'Ellipse', 'Circle', 'Label'].forEach(function (shape) {
    var elem = document.getElementById('add' + shape);
    elem.onclick = function () {
        shapeController.addShape(shape.toLowerCase(), function (shape) {
            alert(shape.getAttribute('shapeType') + ' added');
        });
    }
});

var modeButton = document.getElementById('toggleMode');
modeButton.onclick = function (e) {
    var mode = dragController.toggleMode();
    e.target.value = 'current mode: ' + mode;
}
