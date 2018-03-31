import _ from 'lodash';
import '../scss/main.scss';
import pic from '../assets/images/screen.png';

import printMe from './print.js';

function component() {
    let element = document.createElement('div');
    element.id = 'yo';
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack!'], ' ');

    let img = new Image();
    img.src = pic;
    element.appendChild(img);

    let btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(function() {
    element.parentNode.removeChild(element);
  });
}
