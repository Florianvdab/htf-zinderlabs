const api = function () {
  const baseURL = `https://htf2020.zinderlabs.com/api`;

  function getJson(url) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      method: "get",
    })
      .then((res) => res.json())
      .catch(console.log);
  }

  function postData(url, data) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      method: "post",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch(console.log);
  }

  function getTokenFromCookie() {
    if (
      !!getCookie("token") &&
      JSON.parse(getCookie("token")).hasOwnProperty("access_token")
    ) {
      return JSON.parse(getCookie("token")).access_token;
    } else return null;
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value, ttl) {
    let d = new Date();
    d.setTime(d.getTime() + ttl);
    document.cookie = `${name}=${value};expires=${d.toLocaleString()};path=/`;
  }

  return {
    authorize(user, pass) {
      let res = postData(`${baseURL}/login`, {
        username: user,
        password: pass,
      });
      setCookie("token", res, res.expires_in);
    },
    getDatacenters() {
      return getJson(`${baseURL}/datacenters`);
    },
    getDatacenterErrors(id) {
      return getJson(`${baseURL}/datacenters/${id}/errors`);
    },
    isolateDatacenter(id) {
      return postData(`${baseURL}/datacenters/${id}/isolate`, null);
    },
    getCriticalErrors() {
      return getJson(`${baseURL}/critical_errors`);
    },
    setCriticalErrors(value) {
      return postData(`${baseURL}/critical_errors`, { value: value });
    },
  };
};
