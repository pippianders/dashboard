import React from "react"

const NetdataLogo = ({ width, height, fill = "#00AB44" }) => (
  <svg {...{ width, height }} viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.0002 0H0.630188L8.27019 24H19.0002C25.6202 24 31.0002 18.62 31.0002 12C31.0002 5.38 25.6202 0 19.0002 0Z"
      fill={fill}
    />
  </svg>
)

export default NetdataLogo
