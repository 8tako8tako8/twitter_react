export const validateTweetMessage = (message: string): string => {
  if (message.length === 0) {
    return 'ツイートは必須です'
  }
  if (message.length > 200) {
    return 'ツイートは200文字以内で入力してください'
  }
  return ''
}
