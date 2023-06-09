export const zeropad = (x: string | number) => {
  if (x > -10 && x < 10) {
    return `0${x}`
  }
  return `${x}`
}

interface ScalableUnits {
  [unitGroupName: string]: {
    [unitName: string]: number
  }
}

export const leaveAtLeast1Decimal = (number: number) => {
  const decimalPortion = `${number}`.split(".")[1]
  if (decimalPortion && decimalPortion.length > 1) {
    return `${number}`
  }

  let tms = number * 10
  const integer = Math.floor(tms / 10)

  tms -= integer * 10
  return `${integer}.${tms}`
}

type TimeUnit = "MINUTES" | "HOURS" | "DAYS"
const seconds2time = (seconds: number, maxTimeUnit: TimeUnit) => {
  let secondsReturn = Math.abs(seconds)

  const days = maxTimeUnit === "DAYS" ? Math.floor(secondsReturn / 86400) : 0
  secondsReturn -= days * 86400

  const hours =
    maxTimeUnit === "DAYS" || maxTimeUnit === "HOURS" ? Math.floor(secondsReturn / 3600) : 0
  secondsReturn -= hours * 3600

  const minutes = Math.floor(secondsReturn / 60)
  secondsReturn -= minutes * 60

  const daysString = maxTimeUnit === "DAYS" ? `${days}d:` : ""
  const hoursString = maxTimeUnit === "DAYS" || maxTimeUnit === "HOURS" ? `${zeropad(hours)}:` : ""
  const minutesString = `${zeropad(minutes)}:`
  let secondsString = zeropad(secondsReturn.toFixed(2))

  return `${daysString}${hoursString}${minutesString}${secondsString}`
}

const scalableUnits: ScalableUnits = {
  "packets/s": {
    pps: 1,
    Kpps: 1000,
    Mpps: 1000000,
  },
  pps: {
    pps: 1,
    Kpps: 1000,
    Mpps: 1000000,
  },
  "kilobits/s": {
    "bits/s": 1 / 1000,
    "kilobits/s": 1,
    "megabits/s": 1000,
    "gigabits/s": 1000000,
    "terabits/s": 1000000000,
  },
  "bytes/s": {
    "bytes/s": 1,
    "kilobytes/s": 1024,
    "megabytes/s": 1024 * 1024,
    "gigabytes/s": 1024 * 1024 * 1024,
    "terabytes/s": 1024 * 1024 * 1024 * 1024,
  },
  "kilobytes/s": {
    "bytes/s": 1 / 1024,
    "kilobytes/s": 1,
    "megabytes/s": 1024,
    "gigabytes/s": 1024 * 1024,
    "terabytes/s": 1024 * 1024 * 1024,
  },
  "B/s": {
    "B/s": 1,
    "KiB/s": 1024,
    "MiB/s": 1024 * 1024,
    "GiB/s": 1024 * 1024 * 1024,
    "TiB/s": 1024 * 1024 * 1024 * 1024,
  },
  "KB/s": {
    "B/s": 1 / 1024,
    "KB/s": 1,
    "MB/s": 1024,
    "GB/s": 1024 * 1024,
    "TB/s": 1024 * 1024 * 1024,
  },
  "KiB/s": {
    "B/s": 1 / 1024,
    "KiB/s": 1,
    "MiB/s": 1024,
    "GiB/s": 1024 * 1024,
    "TiB/s": 1024 * 1024 * 1024,
  },
  bytes: {
    bytes: 1,
    kilobytes: 1024,
    megabytes: 1024 * 1024,
    gigabytes: 1024 * 1024 * 1024,
    terabytes: 1024 * 1024 * 1024 * 1024,
  },
  Hz: {
    Hz: 1,
    kHz: 10 ** 3,
    MHz: 10 ** 6,
    GHz: 10 ** 9,
    THz: 10 ** 12,
    PHz: 10 ** 15,
    EHz: 10 ** 18,
    ZHz: 10 ** 21,
  },
  B: {
    B: 1,
    KiB: 1024,
    MiB: 1024 * 1024,
    GiB: 1024 * 1024 * 1024,
    TiB: 1024 * 1024 * 1024 * 1024,
    PiB: 1024 * 1024 * 1024 * 1024 * 1024,
  },
  KB: {
    B: 1 / 1024,
    KB: 1,
    MB: 1024,
    GB: 1024 * 1024,
    TB: 1024 * 1024 * 1024,
  },
  KiB: {
    B: 1 / 1024,
    KiB: 1,
    MiB: 1024,
    GiB: 1024 * 1024,
    TiB: 1024 * 1024 * 1024,
  },
  MB: {
    B: 1 / (1024 * 1024),
    KB: 1 / 1024,
    MB: 1,
    GB: 1024,
    TB: 1024 * 1024,
    PB: 1024 * 1024 * 1024,
  },
  MiB: {
    B: 1 / (1024 * 1024),
    KiB: 1 / 1024,
    MiB: 1,
    GiB: 1024,
    TiB: 1024 * 1024,
    PiB: 1024 * 1024 * 1024,
  },
  GB: {
    B: 1 / (1024 * 1024 * 1024),
    KB: 1 / (1024 * 1024),
    MB: 1 / 1024,
    GB: 1,
    TB: 1024,
    PB: 1024 * 1024,
    EB: 1024 * 1024 * 1024,
  },
  GiB: {
    B: 1 / (1024 * 1024 * 1024),
    KiB: 1 / (1024 * 1024),
    MiB: 1 / 1024,
    GiB: 1,
    TiB: 1024,
    PiB: 1024 * 1024,
    EiB: 1024 * 1024 * 1024,
  },
  /*
  'milliseconds': {
      'seconds': 1000
  },
  'seconds': {
      'milliseconds': 0.001,
      'seconds': 1,
      'minutes': 60,
      'hours': 3600,
      'days': 86400
  }
  */
}

let currentTemperatureSetting: "celsius" | "fahrenheit"
let currentSecondsAsTimeSetting: boolean
interface ConvertibleUnits {
  [unitIn: string]: {
    [unitOut: string]: {
      check: ((number: number) => boolean) | (() => boolean)
      convert: (number: number) => number | string
    }
  }
}

const twoFixed =
  (multiplier: number = 1) =>
  (value: number) =>
    (value * multiplier).toFixed(2)

const convertibleUnits: ConvertibleUnits = {
  Celsius: {
    Fahrenheit: {
      check() {
        return currentTemperatureSetting === "fahrenheit"
      },
      convert(value: number) {
        return (value * 9) / 5 + 32
      },
    },
  },
  celsius: {
    fahrenheit: {
      check() {
        return currentTemperatureSetting === "fahrenheit"
      },
      convert(value: number) {
        return (value * 9) / 5 + 32
      },
    },
  },
  milliseconds: {
    microseconds: {
      check: (max: number) => max < 1,
      convert: twoFixed(1000),
    },
    milliseconds: {
      check: (max: number) => max >= 1 && max < 1000,
      convert: twoFixed(),
    },
    seconds: {
      check: (max: number) => max >= 1000 && max < 60000,
      convert: twoFixed(0.001),
    },
    "MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 60000 && max < 3600_000,
      convert: (value: number) => seconds2time(value / 1000, "MINUTES"),
    },
    "HH:MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 3600_000 && max < 86_400_000,
      convert: (value: number) => seconds2time(value / 1000, "HOURS"),
    },
    "dHH:MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 86_400_000,
      convert: (value: number) => seconds2time(value / 1000, "DAYS"),
    },
  },

  seconds: {
    microseconds: {
      check: (max: number) => max < 0.001,
      convert: twoFixed(1000_000),
    },
    milliseconds: {
      check: (max: number) => max >= 0.001 && max < 1,
      convert: twoFixed(1000),
    },
    seconds: {
      check: (max: number) => max >= 1 && max < 60,
      convert: twoFixed(1),
    },
    "MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 60 && max < 3600,
      convert: (value: number) => seconds2time(value, "MINUTES"),
    },
    "HH:MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 3600 && max < 86_400,
      convert: (value: number) => seconds2time(value, "HOURS"),
    },
    "dHH:MM:SS.ms": {
      check: (max: number) => currentSecondsAsTimeSetting && max >= 86_400,
      convert: (value: number) => seconds2time(value, "DAYS"),
    },
  },
}

const identity = (value: number) => value

interface Keys {
  [commonUnitsKey: string]: {
    [uuid: string]: {
      divider: number
      units: string
    }
  }
}
interface Latest {
  [commonUnitsKey: string]: {
    divider: number
    units: string
  }
}
export const unitsConversionCreator = {
  // todo lift the state
  keys: {} as Keys, // keys for data-common-units
  latest: {} as Latest, // latest selected units for data-common-units

  globalReset() {
    this.keys = {}
    this.latest = {}
  },

  // get a function that converts the units
  // + every time units are switched call the callback
  get(
    uuid: string,
    min: number,
    max: number,
    units: string | undefined,
    desiredUnits: undefined | null | string,
    commonUnitsName: string | null | undefined,
    switchUnitsCallback: (units: string) => void,
    temperatureSetting: "celsius" | "fahrenheit",
    secondsAsTimeSetting: boolean
  ) {
    // validate the parameters
    if (typeof units === "undefined") {
      // eslint-disable-next-line no-param-reassign
      units = "undefined"
    }

    // it will be removed when we'll lift the state to redux
    currentTemperatureSetting = temperatureSetting
    currentSecondsAsTimeSetting = secondsAsTimeSetting

    // check if we support units conversion
    if (typeof scalableUnits[units] === "undefined"
      && typeof convertibleUnits[units] === "undefined"
    ) {
      // we can't convert these units
      // console.log('DEBUG: ' + uuid.toString() + ' can\'t convert units: ' + units.toString());
      return (value: number) => value
    }

    // check if the caller wants the original units
    if (desiredUnits === undefined || desiredUnits === null || desiredUnits === "original"
      || desiredUnits === units
    ) {
      // console.log('DEBUG: ' + uuid.toString() + ' original units wanted');
      switchUnitsCallback(units)
      return identity
    }

    // now we know we can convert the units
    // and the caller wants some kind of conversion

    let tunits = null
    let tdivider = 0

    if (typeof scalableUnits[units] !== "undefined") {
      // units that can be scaled
      // we decide a divider

      if (desiredUnits === "auto") {
        // the caller wants to auto-scale the units

        // find the absolute maximum value that is rendered on the chart
        // based on this we decide the scale
        /* eslint-disable no-param-reassign */
        min = Math.abs(min)
        max = Math.abs(max)
        if (min > max) {
          max = min
        }
        /* eslint-enable no-param-reassign */

        const scalableUnitsGroup = scalableUnits[units]
        Object.keys(scalableUnitsGroup).forEach((unit) => {
          const unitDivider = scalableUnitsGroup[unit]
          if (unitDivider <= max && unitDivider > tdivider) {
            tunits = unit
            tdivider = unitDivider
          }
        })

        if (tunits === null || tdivider <= 0) {
          // we couldn't find auto-scaling candidate for unit
          switchUnitsCallback(units)
          return identity
        }

        if (typeof commonUnitsName === "string") {
          // the caller wants several charts to have the same units
          // data-common-units

          const commonUnitsKey = `${commonUnitsName}-${units}`

          // add our divider into the list of keys
          let t = this.keys[commonUnitsKey]
          if (typeof t === "undefined") {
            this.keys[commonUnitsKey] = {}
            t = this.keys[commonUnitsKey]
          }
          t[uuid] = {
            units: tunits,
            divider: tdivider,
          }

          // find the max divider of all charts
          let commonUnits = t[uuid]
          // todo remove imperative forEach
          Object.keys(t).forEach((x) => {
            if (t[x].divider > commonUnits.divider) {
              commonUnits = t[x]
            }
          })

          // save our common_max to the latest keys
          const latest = {
            units: commonUnits.units,
            divider: commonUnits.divider,
          }
          this.latest[commonUnitsKey] = latest

          tunits = latest.units
          tdivider = latest.divider

          // apply it to this chart
          switchUnitsCallback(tunits)
          return (value: number) => {
            if (tdivider !== latest.divider) {
              // another chart switched our common units
              // we should switch them too
              tunits = latest.units
              tdivider = latest.divider
              switchUnitsCallback(tunits)
            }

            return value / tdivider
          }
        }
        // the caller did not give data-common-units
        // this chart auto-scales independently of all others

        switchUnitsCallback(tunits)
        return (value: number) => value / tdivider
      }
      // the caller wants specific units

      if (typeof scalableUnits[units][desiredUnits] !== "undefined") {
        // all good, set the new units
        tdivider = scalableUnits[units][desiredUnits]
        switchUnitsCallback(desiredUnits)
        return (value: number) => value / tdivider
      }
      // oops! switch back to original units
      // eslint-disable-next-line no-console
      console.log(`Units conversion from ${units.toString()} to ${desiredUnits.toString()}
       is not supported.`)

      switchUnitsCallback(units)
      return identity
    } if (typeof convertibleUnits[units] !== "undefined") {
      // units that can be converted
      if (desiredUnits === "auto") {
        let newConvertFunction: ((number: number) => number | string) | undefined
        Object.keys(convertibleUnits[units]).forEach((x) => {
          if (newConvertFunction) { return }
          if (convertibleUnits[(units as string)][x].check(max)) {
            // converting
            switchUnitsCallback(x)
            newConvertFunction = convertibleUnits[(units as string)][x].convert
          }
        })
        if (newConvertFunction) {
          return newConvertFunction
        }

        // none checked ok (no conversion available)
        switchUnitsCallback(units)
        return identity
      } if (typeof convertibleUnits[units][desiredUnits] !== "undefined") {
        switchUnitsCallback(desiredUnits)
        return convertibleUnits[units][desiredUnits].convert
      }
      // eslint-disable-next-line no-console
      console.log(`Units conversion from ${units.toString()} to ${desiredUnits.toString()}
       is not supported.`)
      switchUnitsCallback(units)
      return identity
    }
    // hm... did we forget to implement the new type?
    // eslint-disable-next-line no-console
    console.log(`Unmatched unit conversion method for units ${units.toString()}`)
    switchUnitsCallback(units)
    return identity
  },
}
