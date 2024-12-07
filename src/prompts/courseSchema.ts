export const DESCRIPTION_COURSE =
  'Provide a detailed and structured representation of the course, encapsulating its key attributes and ensuring all essential information is included.';
export const DESCRIPTION_TITLE =
  'Provide a captivating and concise title that encapsulates the theme of the course, making it appealing to the target audience.';

export const DESCRIPTION_SEGMENTS = `
  Create a universal course structure that can be adapted to any random topic. The structure should not be specific to any particular subject but should provide a comprehensive and logical framework for exploring the given topic. The structure should also ensure clarity and brevity, with each section or module containing concise and focused explanations. The example below is not a fixed template; you can use it as guidance to create the structure but should ultimately decide on the final version. Each section should reference the course topic and be directly related to it. Each point should be based on the topic being discussed or on the course topic. 
  
  Universal Course Structure:
  
  - Overview of the subject area
  - Relevance and significance of the topic
  
  - Historical context
  - Core principles and concepts
  
  - Detailed analysis of main components
  - Theoretical models and concepts
  
  - Case studies and real-world examples
  - Practical exercises
  
  - Specialized techniques
  - Tools and technologies
  
  - Professional standards
  - Ethical norms
  
  - Comparative analysis
  - Critical assessment of approaches
  `;

export const DESCRIPTION_SEGMENT_TITLE =
  'Provide a compelling and descriptive title for the segment that clearly indicates its focus and draws the learner’s interest.';

export const DESCRIPTION_SEGMENT_CONTENT =
  "Provide detailed but concise bullet points or key talking points for the segment. Ensure each point is clear, informative, and directly relevant to the segment's title. Keep the content succinct to maintain focus and avoid unnecessary elaboration.";

export const DESCRIPTION_SEGMENT_POINTS =
  'The response in this section should be brief and to the point, ensuring that each talking point adds value without unnecessary elaboration.';

export const DETECT_COURSE_REQUEST_PROMPT =
  "Analyze the dialogue with the user to determine if their query implies an intent to create a course on the specified topic. Look for keywords or phrases suggesting interest in structuring, teaching, or learning. If the query indicates course creation, confirm the intent and provide a relevant course structure. If no such intent is detected, respond directly to the user's query and address it based on its content. If the request involves creating a course, you must give a concise answer to the request without the course structure. If you determined the topic of the course from the request, then you simply suggested creating it in the form of a question";

export const INFO_REQUIRED =
  'Provide a comprehensive and highly detailed explanation that maximizes the depth and breadth of available information on the current topic. Ensure the response reflects expertise in the relevant domain, integrating extensive background information, key points, potential implications, and other critical details. Strive to include all relevant and valuable insights, ensuring the response is as informative and thorough as possible, while remaining focused on the subject matter. When forming a response, strictly follow the request, providing information as fully, consistently and to the point as possible. Do not add introductory, general phrases or conclusions. The response must be precise, meaningful and focused exclusively on the essence of the request. Please respond only in the form of connected sentences, avoiding division into blocks, points or other formats other than solid text.';

export const RESPONSE_GUIDELINES = `
When generating a response, base your analysis and explanations on the following categories. Incorporate insights, examples, and references from these perspectives to create a comprehensive, well-rounded, and contextually relevant answer.

Key Areas to Cover:

Facts & Data: Provide verified facts, supported by relevant data.
History & Evolution: Discuss historical context and how the topic has evolved over time.
Events: Mention significant prototypes or events related to the subject.
Triggers & Growth Points: Identify triggers and areas of growth.
Analysis & Research: Include detailed analysis and findings from credible research.
Methods & Approaches: Outline methods and approaches used in the field.
Narratives: Discuss dominant narratives and their cultural or philosophical meanings.
Technologies: Highlight relevant technologies, innovations, and solutions.
Principles: Provide principles, key advice, and actionable recommendations.
Tools: Highlight relevant tools and innovative solutions.
`;
