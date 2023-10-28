export const validateDirectMessage = (message: string): string => {
  if (message.length === 0) {
    return 'メッセージは必須です'
  }
  if (message.length > 100) {
    return 'メッセージは100文字以内で入力してください'
  }
  return ''
}
