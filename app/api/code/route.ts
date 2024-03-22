import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage : ChatCompletionMessageParam = {
  role: "system",
  content: "You are a code generator. Only answer in markdown code snippets. Use comments for explanations. "
}

export async function POST(
  req: Request
) {
  try{
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if(!userId){
      return new NextResponse("Unauthorised",{
        status:401
      });
    }

    if(!openai.apiKey){
      return new NextResponse("OpenAI API Key not configured",{status:500});
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    if(!freeTrial){
      return new NextResponse("Free trial has expired.",{ status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage,...messages]
    });

    await increaseApiLimit();

    return NextResponse.json(response.choices[0].message);

  }
  catch(error){
    console.log("[CODE_ERROR]",error);
    return new NextResponse("Internal Error",{ status:500 });
  }
}