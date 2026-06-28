# AeroDraft

AI-assisted Type Investigation Report (TIR) drafting for MRO organisations.

Built for **SA Air Works, Gurgaon** — DGCA Part-145 approved.

## What it does

- Generates TIRs in exact SA Air Works format from engineer inputs
- Streams output via OpenAI (gpt-4o-mini recommended)
- Fully editable output before print/PDF
- Client registry with AD tracking
- Regulatory digest (DGCA · EASA · FAA)
- Report history with localStorage persistence
- Demo mode: one-click GNC 255A avionics upgrade scenario

## Usage

Open `index.html` in any modern browser. No build step required — single-file app.

Set your OpenAI API key in Settings or in `.env` (used by the app directly in-browser).

## Stack

- Vanilla HTML/CSS/JS — zero dependencies
- OpenAI API (streaming)
- localStorage for persistence

## First demo target

CEO, Scandinavian Avionics Air Works (SAAW), Gurgaon
