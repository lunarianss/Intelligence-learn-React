interface SelectObj {
  name: string
  select: string
}

export const createHomeNavMap = (): globalThis.Map<string, string> => {
  const map: globalThis.Map<string, string> = new Map()

  const configObj: SelectObj[] = [
    { name: '/setting', select: '0' },
    { name: '/learn', select: '1' },
    { name: '/teach', select: '2' },
    { name: '/learn', select: '1' },
    { name: '/inbox', select: '3' },
    { name: '/exam', select: '4' },
    { name: '/profile', select: '5' }
  ]

  configObj.forEach((configObj: SelectObj) => map.set(configObj.name, configObj.select))
  return map
}

export const createClassNavMap = (): globalThis.Map<string, string> => {
  const map: globalThis.Map<string, string> = new Map()

  const configObj: SelectObj[] = [
    { name: '/class', select: '1' },
    { name: '/chapter', select: '2' },
    { name: '/exam', select: '3' },
    { name: '/resource', select: '4' },
    { name: '/discuss', select: '5' },
    { name: '/questionbank', select: '6' },
    { name: '/knowledge', select: '7' }
  ]

  configObj.forEach((configObj: SelectObj) => map.set(configObj.name, configObj.select))
  return map
}
