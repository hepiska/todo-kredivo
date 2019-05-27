

export const CheckInput = (obj = {}) => {
  for (const key in obj) {
    if (obj[key] === '') {
      return false
    }
  }
  return true
}


export const getIsempty = (coupon, topLimit, limit1, limit2) => {
  if (coupon.limit_used >= topLimit) {
    return (coupon.limit_used - coupon.total_used <= limit1)
  }
  return (coupon.limit_used - coupon.total_used <= limit2)

}


export const ObjectChecker = (obj = {}) => Object.keys(obj).reduce((acc, key) => acc && Boolean(obj[key]), true)

export const queryStringToObj = (qs) => {
  qs = qs.replace('?', '')

  const result = qs.split('&').reduce((obj, keyvalue) => {
    const [key, value] = keyvalue.split('=')
    obj[key] = value
    return obj
  }, {})
  return result
}

export const capitalEachWord = (str) => {
  const words = str.toLowerCase().split(' ')
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}



export const formatRupiah = (value) => {
  if (!value) {
    return 'Rp0'
  }
  return `Rp${parseInt(value, 10).toLocaleString('de-DE', 'minimumFractionDigits', 2)}`
}

export const formatCur = (value) => {
  if (!value) {
    return '0'
  }
  return `${parseInt(value, 10).toLocaleString('de-DE', 'minimumFractionDigits', 2)}`
}

export const obj2qstr = (obj) => {
  const str = []
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      const val = obj[key].join(',')
      str.push(`${key}=${val}`)

    } else {
      str.push(`${key}=${obj[key]}`)
    }
  })
  return `?${str.join('&')}`
}

export const matchTrue = inputObj =>
  Object.keys(inputObj).reduce((acc, key) => {
    const ras = inputObj[key] && acc
    return ras
  }, true)