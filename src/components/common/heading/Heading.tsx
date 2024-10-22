import { ReactNode } from "react"

function Heading({children}: {children : ReactNode}) {
  return (
    <h2 className="mb-3 font-semibold text-lg">{children}</h2>
  )
}

export default Heading