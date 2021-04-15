import prettyBytes from 'pretty-bytes'

const state: { display: HTMLElement, urls: Set<string> } = {
  display: document.createElement('ol'),
  urls: new Set<string>()
}

function getNetflixTitle(callback: (title: string) => void) {
  chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, 'title', callback)
}

chrome.devtools.panels.create('Netflix AAC Capture',
  'MyPanelIcon.png',
  'pages/devtools/panel.html',
  function (panel) {
    panel.onShown.addListener(w => {
      w.document.body.append(state.display)
    })
  }
)

chrome.devtools.network.onRequestFinished.addListener(function (r) {
  const url = new URL(r.request.url)

  if (!url.hostname.endsWith('nflxvideo.net')) {
    return
  }

  const logUrl = new URL(r.request.url)
  logUrl.pathname = ''
  logUrl.searchParams.delete('sc')
  const logKey = logUrl.toString()

  if (state.urls.has(logKey)) {
    return
  }

  url.pathname = 'range/144-147'

  const headers = new Headers()
  r.request.headers.forEach(o => {
    switch (o.name) {
    case 'User-Agent':
    case 'Accept-Encoding':
    case 'Accept-Language':
    case 'Referer':
      headers.append(o.name, o.value)
    }
  })
  headers.append('Connection', 'close')

  const requestInit: RequestInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: headers,
    redirect: 'error',
    referrerPolicy: 'no-referrer'
  }
  fetch(url.toString(), requestInit)
    .catch()
    .then(r => r.text())
    .then(t => {
      if (t == 'free') {
        const fullUrl = new URL(url.toString())
        fullUrl.pathname = ''

        // TODO: Await
        getNetflixTitle(title => {
          if (!title) {
            return
          }

          fetch(fullUrl.toString(), {method: 'HEAD'})
            .then(resp => {
              const sLength = resp?.headers?.get('Content-Length')
              return sLength ? parseInt(sLength) : 0
            })
            .then(length => {
              state.display.insertAdjacentHTML('beforeend', `
                <li>
                  <a href="${fullUrl.toString()}" download="${title}.aac">${title}</a> (${prettyBytes(length)})<br/>
                </li>
              `)
              state.urls.add(logKey)
            })
        })
      } else {
        state.urls.add(logKey)
      }
    })
})
