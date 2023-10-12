export const validateCommentMessage = (message: string): string => {
  if (message.length === 0) {
    return 'コメントは必須です'
  }
  if (message.length > 200) {
    return 'コメントは200文字以内で入力してください'
  }
  return ''
}
