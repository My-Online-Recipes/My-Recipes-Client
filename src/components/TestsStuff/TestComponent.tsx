import React, { useState } from 'react';
// import openai from './openaiConfig'; // Update the path accordingly

// Set your OpenAI API key

function TestComponent(): JSX.Element {
  const [recipeName, setRecipeName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  // const generateTags = async (): Promise<void> => {
  //   try {
  //     const prompt = `Generate related tags for the recipe name: "${recipeName}"\nTags:`;
  //     const response = await openai.Completion.create({
  //       engine: 'davinci-codex', // GPT-3.5 engine
  //       prompt,
  //       max_tokens: 50,
  //     });
  //
  //     const generatedTags = response.choices[0].text.trim();
  //     setTags(generatedTags.split(','));
  //   } catch (error) {
  //     console.error('Error generating tags:', error);
  //   }
  // };

  return (
    <div>
      <input
        type="text"
        value={recipeName}
        onChange={event => setRecipeName(event.target.value)}
      />
      {/*<button onClick={generateTags}>Generate Tags</button>*/}
      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default TestComponent;
