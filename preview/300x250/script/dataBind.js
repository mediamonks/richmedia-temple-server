

import Parser from './dataBind/Parser';

function getObject(str) {
  let [type, ...path] = str.split(':');

  path = path.join(':');
  type = type.trim();

  switch (type) {
    default: {
      path = path.trim().split('.');
      break;
    }
    case 'style': {
      path = [''];
      break;
    }
  }

  return {
    type,
    path,
  };
}

/**
 *
 * @param {Object} model
 * @param {string[]} path
 * @return {{model: *, value: string}}
 */
function getValue(model, path) {
  let prevModel = model;
  let propName = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    if (model[p]) {
      prevModel = model;
      model = model[p];
      propName = p;
    }
  }

  if (typeof model !== 'string') {
    throw new Error(`defined path is wrong ${path.join('.')}`);
  }

  return { model: prevModel, name: propName, value: model };
}

function setValueOnElement(el, type, value) {

  switch (type) {
    case 'text': {
      el.innerText = value;

      break;
    }

    case 'style': {
      break;
    }

    case 'html': {
      el.innerHTML = value;
      break;
    }

    case 'href': {
      el.href = value;
      break;
    }

    case 'src': {
      el.src = value;
      break;
    }
  }
}

/**
 * @param {Object} model
 * @param {HTMLElement} element
 */
function dataBind(model, element) {
  const elements = element.querySelectorAll('[data-bind]');

  elements.forEach(el => {
    const parser = new Parser(model);
    parser.parse(`${el.getAttribute('data-bind')}`);
  });
  // parser.parse()
  return;
  const eventDispatcher = new EventDispatcher();
  leafs(model, function(val, obj, name, path) {
    const privateName = `__private_${name}`;

    if (!obj[privateName]) {
      obj[privateName] = val;
      Object.defineProperty(obj, name, {
        get() {
          return obj[privateName];
        },
        set(value) {
          obj[privateName] = value;

          eventDispatcher.dispatchEvent(path.join('.'), value);
        },
      });
    }
  });

  elements.forEach(el => {
    const { path, type } = getObject(el.getAttribute('data-bind'));
    const result = getValue(model, path);

    setValueOnElement(el, type, result.value);

    eventDispatcher.addEventListener(path.join('.'), value => {
      setValueOnElement(el, type, result.value);
    });

    // result.model[privateName] = result.value;
    // console.log(result.name, result.value);
    // Object.defineProperty(result.model, result.name, {
    //   get() {
    //     return result.model[privateName];
    //   },
    //   set(value) {
    //     result.model[privateName] = value;
    //     setValueOnElement(el, type, value);
    //   },
    // });
    // setValueOnElement(el, type, result.value);
  });
}

export default dataBind;
