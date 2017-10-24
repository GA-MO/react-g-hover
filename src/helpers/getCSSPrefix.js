const transformPrefix = [
  'transform',
  'msTransform',
  'webkitTransform',
  'mozTransform',
  'oTransform'
]
const transitionPrefix = [
  'transition',
  'msTransition',
  'webkitTransition',
  'mozTransition',
  'oTransition'
]

const prefix = {
  transform: transformPrefix,
  transition: transitionPrefix
}

export default function getCSSPrefix(prefixType) {
  for (var i = 0; i < prefix[prefixType].length; i++) {
    if (typeof document.body.style[prefix[prefixType][i]] !== 'undefined') {
      return prefix[prefixType][i]
    }
  }
  return null
}
