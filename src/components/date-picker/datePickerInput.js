import React, { useState, useEffect, useCallback } from "react"
import { format, isValid, parse, getTime } from "date-fns"
import { formatOffset } from "./utils"
import { StyledDateInput } from "../datePicker/styled"
import { useDateTime } from "@/src/utils/date-time"

const DatePickerInput = ({
  name = "",
  value = "",
  onDatesChange,
  onFocus,
  placeholderText = "",
}) => {
  const { utcOffset } = useDateTime()
  const [inputValue, setInputValue] = useState("")
  const onChange = useCallback(e => {
    const date = e.target.value
    setInputValue(date)
  }, [])
  const setFormattedValue = useCallback(value => {
    if (isValid(value)) {
      const formattedDate = format(value, "MMMM d yyyy, H:mm")
      setInputValue(formattedDate)
    }
  }, [])
  const onBlur = useCallback(
    e => {
      const parsedDate = parse(
        `${e.target.value} ${formatOffset(utcOffset)}`,
        "MMMM d yyyy, H:mm xxx",
        Date.now()
      )
      const isValidDate = isValid(parsedDate) && getTime(parsedDate) > 0
      if (isValidDate) {
        const timestamp = getTime(parsedDate)
        onDatesChange(timestamp, () => setFormattedValue(value))
      } else setFormattedValue(value)
    },
    [value, utcOffset]
  )

  useEffect(() => setFormattedValue(value), [value])

  return (
    <StyledDateInput
      type="text"
      name={name}
      value={inputValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholderText}
      data-testid="datePicker-input"
    />
  )
}

export default DatePickerInput
