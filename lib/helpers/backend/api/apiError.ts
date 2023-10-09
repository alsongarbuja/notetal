export const apiError = (error: any) => {
  const { message } = error;

  const errors = message.split(":")
  const errorObject = {
    [errors[1].slice(1)]: errors[2],
  }
  return errorObject
}