import { saveGptCompletionRequestRecord } from '@job-launcher/sqlite-plugin/dist/handlers'

export enum RequestSceneEnum {
  testing = 1,
  readNoReplyAutoReminder = 2,
  geekAutoStartChatWithBoss = 3
}

let dbInitPromise
export const recordGptCompletionRequest = async (payload) => {
  const { getPublicDbFilePath } = await import(
    '@job-launcher/geek-auto-start-chat-with-boss/runtime-file-utils.mjs'
  )
  const { initDb } = await import('@job-launcher/sqlite-plugin')

  if (!dbInitPromise) {
    dbInitPromise = initDb(getPublicDbFilePath())
  }
  const ds = await dbInitPromise
  const o = { ...payload }
  await saveGptCompletionRequestRecord(ds, [o])
}
