export default (limit) => {
  const sign = Math.random() >  0.5 ? '+' : '-'
  if (sign === '+') {
    const a = Math.round((Math.random() * limit))
    const b = Math.round((Math.random() * (limit - a)))
   return [a, '+', b, '=', a + b] 
  }

  if (sign === '-') {
    const a = Math.round(Math.random() * limit) 
    const b = Math.round(Math.random() * a)
    return [a, '-', b, '=', a - b]
  }
}