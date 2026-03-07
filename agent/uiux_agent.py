#!/usr/bin/env python3
"""
UI/UX Critique Agent — Shriyansh GameDev Portfolio
Analyzes a screenshot of the portfolio and gives structured design feedback.
Supports multi-turn follow-up conversation after the initial critique.
"""

import anthropic
import base64
import os
import sys
from pathlib import Path


SYSTEM_PROMPT = """You are an expert UI/UX designer and accessibility specialist with 15+ years
of experience reviewing web portfolios, apps, and digital products.

When given a design screenshot, produce a structured critique covering these sections:

1. First Impression       — 2-3 sentences on the overall feel and immediate impact
2. Visual Hierarchy       — layout, spacing, content flow, use of whitespace
3. Typography             — font choices, readability, size hierarchy, line height
4. Color & Contrast       — palette harmony, contrast ratios, WCAG AA compliance
5. Navigation & UX Flow   — ease of navigation, CTA clarity, user journey
6. Accessibility          — WCAG 2.1 issues, keyboard nav, alt text, focus states
7. Mobile Considerations  — responsiveness, touch targets, viewport behaviour
8. Top 5 Improvements     — numbered list, most impactful first, each with a concrete action

Rules:
- Be specific — reference actual elements you can see in the screenshot
- Be honest and direct, not vague or overly positive
- For each issue, briefly explain WHY it matters to the user
- Keep each section concise (3-6 bullet points max)
"""


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
MEDIA_TYPES = {
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif":  "image/gif",
}


def encode_image(image_path: str) -> tuple[str, str]:
    path = Path(image_path)
    ext = path.suffix.lower()
    if ext not in SUPPORTED_EXTENSIONS:
        print(f"Unsupported file type '{ext}'. Use: {', '.join(SUPPORTED_EXTENSIONS)}")
        sys.exit(1)
    media_type = MEDIA_TYPES[ext]
    with open(image_path, "rb") as f:
        data = base64.standard_b64encode(f.read()).decode("utf-8")
    return data, media_type


def stream_response(client: anthropic.Anthropic, messages: list) -> str:
    """Stream a response and return the full text."""
    full_text = ""
    with client.messages.stream(
        model="claude-opus-4-6",
        max_tokens=4096,
        thinking={"type": "adaptive"},
        system=SYSTEM_PROMPT,
        messages=messages,
    ) as stream:
        for event in stream:
            if event.type == "content_block_delta":
                if event.delta.type == "text_delta":
                    print(event.delta.text, end="", flush=True)
                    full_text += event.delta.text
        final = stream.get_final_message()

    print(f"\n\n{'─'*52}")
    print(f"Tokens used: {final.usage.input_tokens} in / {final.usage.output_tokens} out")
    return full_text


def run_agent(image_path: str) -> None:
    client = anthropic.Anthropic()

    print(f"\n{'='*52}")
    print("  UI/UX Critique Agent")
    print(f"  Analyzing: {Path(image_path).name}")
    print(f"  Model    : claude-opus-4-6 + adaptive thinking")
    print(f"{'='*52}\n")

    image_data, media_type = encode_image(image_path)

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": media_type,
                        "data": image_data,
                    },
                },
                {
                    "type": "text",
                    "text": (
                        "Please give me a full UI/UX critique of this portfolio design. "
                        "Cover all sections from the system prompt."
                    ),
                },
            ],
        }
    ]

    critique = stream_response(client, messages)
    messages.append({"role": "assistant", "content": critique})

    # Multi-turn follow-up conversation
    print("\nAsk follow-up questions about the design (or type 'exit' to quit).")
    print("Examples: 'How can I improve the mobile layout?'  |  'Rate the color contrast 1-10'")

    while True:
        print()
        try:
            user_input = input("You: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye!")
            break

        if user_input.lower() in ("exit", "quit", "q", ""):
            print("Goodbye!")
            break

        messages.append({"role": "user", "content": user_input})
        print("\nAgent: ", end="", flush=True)

        reply = stream_response(client, messages)
        messages.append({"role": "assistant", "content": reply})


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage:   python uiux_agent.py <screenshot.png>")
        print("Example: python uiux_agent.py portfolio_full.png")
        print("\nTip: Take a full-page screenshot of the portfolio and pass it here.")
        sys.exit(1)

    image_path = sys.argv[1]

    if not os.path.exists(image_path):
        print(f"Error: File not found — '{image_path}'")
        sys.exit(1)

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY environment variable is not set.")
        print("Get your key from: https://console.anthropic.com/")
        sys.exit(1)

    run_agent(image_path)


if __name__ == "__main__":
    main()
