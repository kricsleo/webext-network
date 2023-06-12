import { useEffect, useState } from 'react'
import { createRoot } from "react-dom/client"

const FontPicker = () => {
  const [har, setHar] = useState<any>()
  const [listened, setListened] = useState(false)
  useEffect(() => {
    const listerner = (details)  => {
      if(!listened) {
        setListened(true)
      }
      const cancel = details.url.indexOf("nabc") != -1
      if(cancel) {
        const start = Date.now()
        while (Date.now() - start < 5000) {
        }
      }
      return {cancel };
    }
    chrome.webRequest.onBeforeRequest.addListener(
      listerner,
      {urls: ["<all_urls>"]},
      ["blocking"]
    )
    return () => chrome.webRequest.onBeforeRequest.removeListener(listerner)
  }, [])
  chrome.devtools.network.getHAR(har => {
    setHar(har)
  })
  return (
    <>
      <h2>har</h2>
      <p>listened: {listened ? 'true' : 'false'}</p>
      <pre>{JSON.stringify(har, null, 2)}</pre>
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<FontPicker />)