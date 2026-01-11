# Sigma Dict

A structured dictionary dataset stored in JSON format. This project aims to provide easy-to-parse dictionary entries for developers and linguists.

## Project Structure

The dictionary data is located in the `data` directory, organized by the first letter of the word.

```text
data/
  ├── d/
  │   ├── develop.json
  │   ├── direction.json
  │   └── ...
  ├── f/
  │   ├── fix.json
  │   └── ...
  └── ...
```

## Data Format

Each entry is a JSON file containing the following fields:

- `word`: The headword.
- `phonetic`: IPA pronunciation.
- `part_of_speech`: A list of applicable parts of speech (e.g., "noun", "verb").
- `meanings`: Definitions and examples grouped by part of speech.
- `tense_forms`: Conjugations and forms (base, past, past_participle, etc.).
- `synonyms`: A list of related words.
- `antonyms`: A list of opposite words.
- `usage_examples`: General usage sentences.

## Security

Please refer to SECURITY.md for information regarding supported versions and vulnerability reporting.

## Contributing

Feel free to add new words following the existing JSON structure in the appropriate subdirectory.
