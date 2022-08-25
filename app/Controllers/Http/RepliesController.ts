import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thread from 'App/Models/thread/Thread'
import ReplyValidator from 'App/Validators/threads/ReplyValidator'

export default class ReplieisController {

  public async store({request, response, params, auth}: HttpContextContract) {
    const { content } = await request.validate(ReplyValidator)

    const thread = await Thread.findOrFail(params.id)

    const reply = await thread.related('replies').create({
      userId: auth.user?.id,
      content,
    })

    await reply.load('user')
    await reply.load('thread')

    return response.ok({data: reply})
  }
}
