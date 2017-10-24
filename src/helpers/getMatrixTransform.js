export default function getMatrix(transform) {
  const { rotate, translate } = transform
  const ScaleX = 1
  const ScaleY = 1
  const DepthY = 0
  const DepthX = 0
  const B = Math.cos(rotate.y * (Math.PI / 180))
  const F = Math.sin(rotate.y * (Math.PI / 180))
  const Y = Math.cos(rotate.x * (Math.PI / 180))
  const Z = Math.sin(rotate.x * (Math.PI / 180))
  const I = Math.cos(rotate.z * (Math.PI / 180))
  const P = Math.sin(rotate.z * (Math.PI / 180))

  let a = new Array(16)
  a[0] = B * I * ScaleX
  a[1] = -1 * P
  a[2] = F
  a[3] = DepthY
  a[4] = P
  a[5] = Y * I * ScaleY
  a[6] = Z
  a[7] = DepthX
  a[8] = -1 * F
  a[9] = -1 * Z
  a[10] = B * Y
  a[11] = 0
  a[12] = translate.x
  a[13] = translate.y
  a[14] = translate.z
  a[15] = 1

  let matrix3d = ''
  for (let i = 0; i < a.length; i++) {
    const cm = i === 0 ? '' : ','
    matrix3d = matrix3d.concat(cm + a[i])
  }
  return matrix3d
}
