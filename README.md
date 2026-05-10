# Web Application Template

This is a template for creating node.js / react / next.js web application managed by IDP Universal Workspace Manager.

## Structure

```
.
├── src/                  # Source code
├── package.json          # Dependencies and scripts
├── .idp-environments.json  # Environment configuration (DEV/STAGING/PROD)
├── .idp.config.json      # IDP project metadata
├── .gitignore
└── README.md
```

## Environments

This project supports multi-environment configuration:
- **DEV**: Development environment
- **STAGING**: Staging environment  
- **PROD**: Production environment

Environment configuration is stored in `.idp-environments.json`.

## Commands

See package.json for available scripts.

## IDP Integration

This project is managed by IDP Universal Workspace Manager. Use IDP to:
- Switch between environments
- Build and deploy
- Manage Git and CI/CD
- View logs and reports
