export default (unique => url =>
  new Promise(rs => {
    let script = document.createElement('script')
    let name = "_jsonp_" + unique++

    if (url.match(/\?/)) url += "&callback="+name
    else url += "?callback="+name

    script.src = url
    window[name] = json => {
      rs(new Response(JSON.stringify(json)))
      script.remove()
      delete window[name]
    }

    document.body.appendChild(script)
  })
)(0);
