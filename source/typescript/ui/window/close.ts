export function visibilityHandler (element: any) {
    if (element.style.visibility === 'visible') {
        element.style.visibility = 'hidden';
    } else {
        element.style.visibility = 'visible';
    }
}