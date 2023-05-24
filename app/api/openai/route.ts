import {NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function GET(request: Request) {

  if (!configuration.apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, {status: 400});
  }


  const {searchParams}= new URL(request.url)
  const question = searchParams.get('question') ?? ""

  if (question.trim().length === 0) {
    return NextResponse.json({ error: "Please enter a vaild question" }, {status: 400});
  }


  
  // try {
  //   const completion = await openai.createCompletion({
  //     model : "text-davinci-003",
  //     prompt : question,
  //     temperature : 0.6,
  //     max_tokens : 1000,
  //     top_p: 1,
  //     stream: true,
  //   }, { responseType: 'stream' })

  //   completion.data.

    // const reader = completion.stream();

    // reader.on('data', (data: any) => {
    //   // Process the received data chunk
    //   const result = data.toString();
    //   console.log(result);
    // });

    // reader.on('error', (error: any) => {
    //   console.error('Error occurred while streaming', error);
    // });

    // reader.on('end', () => {
    //   console.log('Streaming completed');
    // });



      // return NextResponse.json({ answer: completion.data.choices[0].text }, {status: 200});
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return NextResponse.json({ error: "An error occurred during your request" }, {status: 500});
  //   }
  // }

}
