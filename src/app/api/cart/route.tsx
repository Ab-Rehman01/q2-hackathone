import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(
      'https://bullet-mart.net.pk/wp-json/wc/v3/cart',
      {
        headers: {
          Authorization: `Basic ${btoa(
            process.env.WOO_COMMERCE_CONSUMER_KEY + ':' + process.env.WOO_COMMERCE_CONSUMER_SECRET
          )}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}
