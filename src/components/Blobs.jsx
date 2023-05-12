import blobTop from '../assets/blob-top.svg'
import blobBottom from '../assets/blob-bottom.svg'

export default function Blobs() {
  return (
    <>
      <img src={blobTop} className="blob-top" />
      <img src={blobBottom} className="blob-bottom" />
    </>
  )
}
