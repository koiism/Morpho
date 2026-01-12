import { getPayload } from '@/lib/payload'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Sending email to ${body.to} with subject ${body.subject}: ${body.html}`)
    return new Response('OK')
  }
  try {
    const payload = await getPayload()

    await payload.sendEmail({
      to: body.to,
      subject: body.subject,
      html: body.html,
      ...(body.text && { text: body.text }),
    })

    return new Response('OK')
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response('Error', { status: 500 })
  }
}
