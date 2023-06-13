import { useEffect, useState } from 'react'
import { createRoot } from "react-dom/client"
import RequestItem from './RequestItem'

import "~base.css"
import "~style.css"

const FontPicker = () => {
  const [har, setHar] = useState<any>()
  const [listened, setListened] = useState(false)
  const [requests, setRequests] = useState([])
  useEffect(() => {
    const listerner = (detail)  => {
      setRequests(prev => [...prev, detail])
      const cancel = detail.url.indexOf("nabc") != -1
      if(cancel) {
        const start = Date.now()
        while (Date.now() - start < 5000) {
        }
      }
      return { cancel };
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
      <span className='icon-[carbon--deployment-policy]' />
      <p className="border-2 border-sky-500">total: {requests.length}</p>
      {requests.map(request => <RequestItem request={request} />)}
      {/* <pre>{JSON.stringify(har, null, 2)}</pre> */}
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<FontPicker />)