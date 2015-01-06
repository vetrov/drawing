var dragController = (function () {
    var clickOffset, dragObject, mouseOffset, startSize, currentMode = 'drag';

    function getMouseOffset(target, e) {
        var docPos = getAbsolutePosition(target);
        return {
            x: e.pageX - docPos.x,
            y: e.pageY - docPos.y
        };
    }

    function makeActive() {
        if (dragObject) {
            dragObject.style.borderStyle = 'dashed';
        }
    }

    function makeInactive() {
        if (dragObject) {
            dragObject.style.borderStyle = 'solid';
        }
    }

    function mouseDown(e) {
        if (e.which !== 1 ) return;

        makeInactive();
        dragObject = this;
        makeActive();

        if (currentMode === 'drag') {
            mouseOffset = getMouseOffset(this, e);
            document.onmousemove = mouseMove;
        }
        if (currentMode === 'resize') {
            clickOffset = {
                x: e.clientX,
                y: e.clientY
            };
            startSize = {
                width: dragObject.clientWidth,
                height: dragObject.clientHeight
            };
            document.onmousemove = mouseResize;
        }

        document.onmouseup = mouseUp;

        // disable browser's native drag and text selection
        document.ondragstart = function() { return false; }
        document.body.onselectstart = function() { return false; }

        return false;
    }

    function mouseMove(e) {
        dragObject.style.position = 'absolute';
        dragObject.style.top = e.pageY - mouseOffset.y + 'px';
        dragObject.style.left = e.pageX - mouseOffset.x + 'px';
        return false;
    }

    function mouseResize(e) {
        dragObject.style.position = 'absolute';

        var type = dragObject.getAttribute('shapeType');
        var newWidth = (startSize.width + e.clientX - clickOffset.x) + 'px';
        var newHeight = (startSize.height + e.clientY - clickOffset.y) + 'px';

        if (type === 'circle' || type === 'square') {
            dragObject.style.width = newWidth;
            dragObject.style.height = newWidth;
        } else {
            dragObject.style.width = newWidth;
            dragObject.style.height = newHeight;
        }

        return false;
    }

    function mouseUp(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        document.ondragstart = null;
        document.body.onselectstart = null;
    }

    return {
        toggleMode: function() {
            currentMode === 'drag' ? currentMode = 'resize' : currentMode = 'drag';
            return currentMode;
        },

        makeDraggable: function(element) {
            element.onmousedown = mouseDown;
        }
    }

}());

function getAbsolutePosition(e) {
    var left = 0;
    var top = 0;

    while (e.offsetParent) {
        left += e.offsetLeft;
        top  += e.offsetTop;
        e = e.offsetParent;
    }

    left += e.offsetLeft;
    top += e.offsetTop;

    return {x: left, y: top};
}
