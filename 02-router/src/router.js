import $ from 'jquery'

var routes = [];

export default function (route, fn) {
  if(route == null)
  {
    addEventListeners();
  }
  else
  {
    registerRoutes(route, fn);
  }
}

function addEventListeners () {
  $(document).on('click', 'a', e => {

    var rel = $(e.currentTarget).attr('rel');

    if (rel === 'external' || rel === 'download' || $(event.currentTarget).get(0).host !== location.host)
      return

    e.preventDefault()

    var href = $(e.currentTarget).attr('href');

    goto(href);
  })

  window.addEventListener('popstate', e => {
    let state = e.state
    if (state !== null)
      goto(history.state)
  })

  $(window).on('load', e =>{
    goto(location.pathname);
  });
}

function goto(href) {
  var isRegistered = false;

  for (var obj of routes) {
    if (obj.route.test(href)) {
      isRegistered = true;

      if (href != history.state) {
        history.pushState(href, " ", href);
      }

      obj.func(href.split('/')[2]);
      break;
    }
  }
  if(!isRegistered) {
    routes[routes.length - 1].func();
  }
}

function registerRoutes(route, func) {

  route = getRegExOfRoute(route);

  var obj = {
    route,
    func
  };
  routes.push(obj);
}

function getRegExOfRoute(route) {
  var regExToReplace = /:[a-z]{0,}(?=\/|$)/g;
  var replaceWith = "[a-z]{1,}(?=\/|$)";

  if(route !== '*') {
    route = route.replace(regExToReplace, replaceWith);
  }
  else {
    route = '\\*';
  }

  return new RegExp(route + '$');
}




