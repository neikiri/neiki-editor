# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark: |
| 2.0.x   | :white_check_mark: |
| 2.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in neiki-editor, please report it responsibly.

**Do not open a public issue.**

Instead, send an email to **dev@neiki.eu** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Any potential impact

You can expect an initial response within **48 hours**.

## Scope

neiki-editor is a client-side rich text editor. Security considerations include:

- Cross-site scripting (XSS) via user-generated content
- Unsafe HTML injection or rendering
- Improper sanitization of input/output
- DOM-based vulnerabilities

## Best Practices

- Always sanitize user-generated content before rendering it
- Do not trust HTML input from unverified sources
- Keep neiki-editor updated to the latest version
- Avoid inserting raw HTML without validation

## Acknowledgements

We appreciate the security research community and will credit reporters (with permission).
