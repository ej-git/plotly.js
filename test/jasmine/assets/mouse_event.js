var Lib = require('../../../src/lib');

module.exports = function(type, x, y, opts) {
    var visibility = document.visibilityState;
    if(visibility && visibility !== 'visible') {
        throw new Error('document.visibilityState = "' + visibility + '" - Please make the window visible.');
    }

    var fullOpts = {
        bubbles: true,
        clientX: x,
        clientY: y,
        cancelable: true
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    if(opts && opts.button) {
        fullOpts.button = opts.button;
    }
    if(opts && opts.buttons) {
        fullOpts.buttons = opts.buttons;
    }
    if(opts && opts.altKey) {
        fullOpts.altKey = opts.altKey;
    }
    if(opts && opts.ctrlKey) {
        fullOpts.ctrlKey = opts.ctrlKey;
    }
    if(opts && opts.metaKey) {
        fullOpts.metaKey = opts.metaKey;
    }
    if(opts && opts.shiftKey) {
        fullOpts.shiftKey = opts.shiftKey;
    }

    var el = (opts && opts.element) || document.elementFromPoint(x, y),
        ev;

    if(type === 'scroll' || type === 'mousewheel') {
        // somehow table needs this to be mouswheel but others need wheel.
        // yet they all work the same in the browser?
        type = (type === 'scroll') ? 'wheel' : 'mousewheel';
        ev = new window.WheelEvent(type, Lib.extendFlat({}, fullOpts, opts));
    } else {
        ev = new window.MouseEvent(type, fullOpts);
    }

    el.dispatchEvent(ev);

    return el;
};
