import { GoogleGenerativeAI } from "@google/generative-ai"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
})


const aiService = {
    prompt: async (question) => {
        const p = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": question
                        }
                    ]
                }
            ]
        }
        const result = await model.generateContent(p, { timeout: 60000 })
        return result.response
    },

    longContext: async (prompt, pdfPath) => {
        const instructions =
            `You are an elite researcher and subject matter expert with advanced analytical skills. Your expertise lies in carefully scrutinized comprehensive documents and synthesizing clear evidence-based answers.

            Task Description:
            You will be provided with a full-length document along with a query. Your task is to:

            Thoroughly Analyze: Read and understand the entire document, identifying all sections, details, and evidence that may be relevant to the query.

            Synthesize Information: Extract and integrate the pertinent information into a coherent and concise answer.

            Support Your Answer: Where applicable, reference specific parts of the document to substantiate your conclusions.

            Highlight Ambiguities: If the document does not fully address the query or leaves room for interpretation, clearly indicate it and any assumptions or uncertainties.

            Tone & Style:
            Use formal, precise language suitable for academic and professional research. Your answer should be clear, logical, and directly focused on addressing the query.

            Instructions:
            Query: ${prompt}
            Language Response: PT-BR

            Document: [Full document text provided]

            Provide the document title and a final answer that is based solely on the content of the document, meeting all the task descriptions requirements.`

        const pdfBuffer = fs.readFileSync(pdfPath)
        const pdfBase64 = pdfBuffer.toString('base64')
        const p = {
            "contents": [
                {
                    "parts": [
                        { "text": instructions },
                        { "inlineData": { 'mime_type': 'application/pdf', 'data': pdfBase64 } }
                    ]
                }
            ]
        }
        const result = await model.generateContent(p, { timeout: 60000 })
        return result.response
    },

    sinthetizePrompt: () => {

    },
}

export default aiService