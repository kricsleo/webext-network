export default function(props: {request: chrome.webRequest.WebRequestBodyDetails}) {
  const url = new URL(props.request.url)
  return (
    <div>
      <div className='border-2 border-sky-500'>
        {url.pathname}
      </div>
    </div>
  )
}