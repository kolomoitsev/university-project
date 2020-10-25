export function bindMethods(context, methodNames)  {
  methodNames.forEach((method) => {
    context[method] = context[method].bind(context)
  })
}
export default {
  bindMethods
}