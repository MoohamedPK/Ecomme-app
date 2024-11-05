import { memo } from "react";

const Heading = memo(({title}: {title:  React.ReactNode}) => {
  console.log("fire Heading")
  return (
    <h2 className="mb-3 font-semibold text-lg">{title}</h2>
  )
})

export default Heading