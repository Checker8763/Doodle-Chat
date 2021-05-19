export function dragUiElement(element) {
    let posX = 0, posY = 0, posXFetch = 0, posYFetch = 0;
    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        posXFetch = e.clientX;
        posYFetch = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        posX = posXFetch - e.clientX;
        posY = posYFetch - e.clientY;
        posXFetch = e.clientX;
        posYFetch = e.clientY;
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}