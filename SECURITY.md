# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x.x   | :white_check_mark: |
| 2.x.x   | :white_check_mark: |
| 3.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Neiki's Editor, please report it responsibly.

**Do not open a public issue.**

Instead, send an email to **neikiri@neikiri.dev** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Any potential impact

You can expect an initial response within **48 hours**.

## Scope

Neiki's Editor is a client-side rich text editor. Security considerations include:

- Cross-site scripting (XSS) via user-generated content
- Unsafe HTML injection or rendering
- Improper sanitization of input/output
- DOM-based vulnerabilities

## Best Practices

- Always sanitize user-generated content before rendering it
- Do not trust HTML input from unverified sources
- Keep Neiki's Editor updated to the latest version
- Avoid inserting raw HTML without validation

## Acknowledgements

We appreciate the security research community and will credit reporters (with permission).
