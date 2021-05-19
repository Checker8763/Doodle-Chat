export function visibilityHandler (element) {
    if (element.style.visibility === 'visible') {
        element.style.visibility = 'hidden';
    } else {
        element.style.visibility = 'visible';
    }
}