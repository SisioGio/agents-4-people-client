import React from 'react';

const elevenLabsLanguages = [
  'Arabic (Saudi Arabia)',
  'Arabic (UAE)',
  'Bulgarian',
  'Chinese',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English (Australia)',
  'English (Canada)',
  'English (UK)',
  'English (USA)',
  'Filipino',
  'Finnish',
  'French (Canada)',
  'French (France)',
  'German',
  'Greek',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Malay',
  'Norwegian',
  'Polish',
  'Portuguese (Brazil)',
  'Portuguese (Portugal)',
  'Romanian',
  'Russian',
  'Slovak',
  'Spanish (Mexico)',
  'Spanish (Spain)',
  'Swedish',
  'Tamil',
  'Turkish',
  'Ukrainian',
  'Vietnamese'
];

const ElevenLabsLanguagesList = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">🌍 Supported Languages</h2>
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {elevenLabsLanguages.map((language, index) => (
        <li key={index} className="flex items-center gap-2">
          <span role="img" aria-label="globe">🌐</span>
          {language}
        </li>
      ))}
    </ul>
  </div>
);

export default ElevenLabsLanguagesList;
