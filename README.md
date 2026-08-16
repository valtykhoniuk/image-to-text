# Image to Text

Angular web app that extracts text from an uploaded image using the API Ninjas Image to Text API.

## Features

- Upload JPEG / PNG images (max 2 MB)
- Image preview before extraction
- OCR text extraction via API Ninjas
- Copy extracted text to clipboard

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create your local environment file:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

4. Paste your API Ninjas key into `src/environments/environment.ts`
5. Get a free key here: https://api-ninjas.com/api/imagetotext

## Run

```bash
ng serve
```

Open http://localhost:4200/

## Notes

- During local development, requests go through an Angular proxy (`proxy.conf.json`) to avoid CORS issues with API Ninjas.
- The assignment allows files up to 2 MB. API Ninjas free tier may reject larger images (around 200 KB), so use a small test image for demos.
- The API key is kept in a gitignored `environment.ts` file. Do not commit real keys.
