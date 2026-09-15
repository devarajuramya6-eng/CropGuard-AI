# Security Policy

## Reporting a Vulnerability
Please do not report security vulnerabilities on public issues. Email the security team directly.

## Best Practices Enforced
- No hardcoded secrets (use .env files)
- Strict AuthZ and AuthN checks on all endpoints
- Tenant isolation (Farm data is private)
- Input validation on all user inputs
- Rate limiting and CSRF protection
