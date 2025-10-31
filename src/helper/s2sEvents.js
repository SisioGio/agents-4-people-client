class S2sEvent {
    static DEFAULT_INFER_CONFIG = {
      maxTokens: 1024,
      topP: 0.95,
      temperature: 0.7
    };
  
    static DEFAULT_SYSTEM_PROMPT = `
    You are an AI assistant supporting an Airbnb host. Your role is to provide friendly, professional, and helpful responses related to guest communication, booking questions, pricing strategies, house rules, property maintenance, and general hospitality practices.

Always speak clearly and concisely, using natural language that reflects kindness and expertise. Your goal is to help the host provide an excellent guest experience and manage their property smoothly.

If the user asks for help with anything outside Airbnb hosting, or if the topic involves inappropriate, harmful, or forbidden content (such as illegal activities, hate speech, or adult content), gently steer the conversation back to a relevant topic. For example, you may respond with:

“I’m here to help with Airbnb hosting topics. Let’s focus on something related to your guests, bookings, or property management.”

Avoid speculation or making up facts. Be honest if you don't know something.
`;
  
    static DEFAULT_AUDIO_INPUT_CONFIG = {
      mediaType: "audio/lpcm",
      sampleRateHertz: 16000,
      sampleSizeBits: 16,
      channelCount: 1,
      audioType: "SPEECH",
      encoding: "base64"
    };
  
    static DEFAULT_AUDIO_OUTPUT_CONFIG = {
      mediaType: "audio/lpcm",
      sampleRateHertz: 24000,
      sampleSizeBits: 16,
      channelCount: 1,
      voiceId: "matthew",
      encoding: "base64",
      audioType: "SPEECH"
    };
  
    static DEFAULT_TOOL_CONFIG = {
      tools: [
     {
        toolSpec: {
          name: "getKbTool",
          description: "get information about the Amazon policy",
          inputSchema: {
            json: JSON.stringify({
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "the query to be answered by the knowledge base",
                },
              },
              required: ["query"],
            }),
          },
        },
      }
    ]
    };

    static DEFAULT_CHAT_HISTORY = [
      {
        "content": "hi there i would like to cancel my hotel reservation",
        "role": "USER"
      },
      {
        "content": "Hello! I'd be happy to assist you with cancelling your hotel reservation. To get started, could you please provide me with your full name and the check-in date for your reservation?",
        "role": "ASSISTANT"
      },
      {
        "content": "yeah so my name is don smith",
        "role": "USER"
      },
      {
        "content": "Thank you, Don. Now, could you please provide me with the check-in date for your reservation?",
        "role": "ASSISTANT"
      },
      {
        "content": "yes so um let me check just a second",
        "role": "USER"
      },
      {
        "content": "Take your time, Don. I'll be here when you're ready.",
        "role": "ASSISTANT"
      }
    ];
  
    static sessionStart(inferenceConfig = S2sEvent.DEFAULT_INFER_CONFIG) {
      return { event: { sessionStart: { inferenceConfiguration: inferenceConfig } } };
    }
  
    static promptStart(promptName, audioOutputConfig = S2sEvent.DEFAULT_AUDIO_OUTPUT_CONFIG, toolConfig = S2sEvent.DEFAULT_TOOL_CONFIG) {
      return {
        "event": {
          "promptStart": {
            "promptName": promptName,
            "textOutputConfiguration": {
              "mediaType": "text/plain"
            },
            "audioOutputConfiguration": audioOutputConfig,
          
          "toolUseOutputConfiguration": {
            "mediaType": "application/json"
          },
          "toolConfiguration": toolConfig
        }
        }
      }
    }
  
    static contentStartText(promptName, contentName, role="SYSTEM") {
      return {
        "event": {
          "contentStart": {
            "promptName": promptName,
            "contentName": contentName,
            "type": "TEXT",
            "interactive": true,
            "role": role,
            "textInputConfiguration": {
              "mediaType": "text/plain"
            }
          }
        }
      }
    }
  
    static textInput(promptName, contentName, systemPrompt = S2sEvent.DEFAULT_SYSTEM_PROMPT) {
      var evt = {
        "event": {
          "textInput": {
            "promptName": promptName,
            "contentName": contentName,
            "content": systemPrompt
          }
        }
      }
      return evt;
    }
  
    static contentEnd(promptName, contentName) {
      return {
        "event": {
          "contentEnd": {
            "promptName": promptName,
            "contentName": contentName
          }
        }
      }
    }
  
    static contentStartAudio(promptName, contentName, audioInputConfig = S2sEvent.DEFAULT_AUDIO_INPUT_CONFIG) {
      return {
        "event": {
          "contentStart": {
            "promptName": promptName,
            "contentName": contentName,
            "type": "AUDIO",
            "interactive": true,
            "role": "USER",
            "audioInputConfiguration": {
              "mediaType": "audio/lpcm",
              "sampleRateHertz": 16000,
              "sampleSizeBits": 16,
              "channelCount": 1,
              "audioType": "SPEECH",
              "encoding": "base64"
            }
          }
        }
      }
    }
  
    static audioInput(promptName, contentName, content) {
      return {
        event: {
          audioInput: {
            promptName,
            contentName,
            content,
          }
        }
      };
    }
  
    static contentStartTool(promptName, contentName, toolUseId) {
      return {
        event: {
          contentStart: {
            promptName,
            contentName,
            interactive: false,
            type: "TOOL",
            toolResultInputConfiguration: {
              toolUseId,
              type: "TEXT",
              textInputConfiguration: { mediaType: "text/plain" }
            }
          }
        }
      };
    }
  
    static textInputTool(promptName, contentName, content) {
      return {
        event: {
          textInput: {
            promptName,
            contentName,
            content,
            role: "TOOL"
          }
        }
      };
    }
  
    static promptEnd(promptName) {
      return {
        event: {
          promptEnd: {
            promptName
          }
        }
      };
    }
  
    static sessionEnd() {
      return { event: { sessionEnd: {} } };
    }
  }
  export default S2sEvent;