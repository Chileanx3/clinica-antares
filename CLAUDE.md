# Clinica Antares - Project Rules

## Deployment (MANDATORY)

**After ANY file change, always sync to the production server via FTP.**

### FTP Credentials
- **Server:** `ftp://c1370011.ferozo.com`
- **User:** `c1370011`
- **Password:** Check with user (was changed after session for security)

### Sync Command
```bash
lftp -u "c1370011,PASSWORD" ftp://c1370011.ferozo.com -e "
set ssl:verify-certificate no
cd public_html
mirror -R --verbose '/Users/matthewsouth/Desktop/My projects/Clinica Antares/' . --exclude .git/ --exclude CLAUDE.md
quit
"
```

### After upload, always fix permissions:
```bash
# Files: 644, Directories: 755
glob -a chmod 644 *.html
glob -a chmod 644 css/*.css
glob -a chmod 644 js/*.js
glob -a chmod 644 images/*
chmod 755 css
chmod 755 js
chmod 755 images
```

### Deployment Checklist
1. Make changes locally
2. Upload changed files to FTP (`public_html/`)
3. Fix permissions (644 for files, 755 for directories)
4. Commit and push to GitHub (`Chileanx3/clinica-antares`)

## Project Info

- **Type:** Static HTML/CSS/JS website (no framework)
- **Domain:** clinicantares.cl
- **Hosting:** Ferozo (DonWeb) - Panel at ferozo.host
- **GitHub:** https://github.com/Chileanx3/clinica-antares
- **Account:** Chileanx3 (personal)

## SSL Certificate
- **Provider:** Let's Encrypt (manually generated with certbot)
- **Expires:** 2026-05-23
- **Renewal:** Must regenerate with certbot before expiry and install via Ferozo panel (Dominios > SSL)
- **DNS challenges:** TXT records at `_acme-challenge.clinicantares.cl` and `_acme-challenge.www.clinicantares.cl` (can be removed after cert is installed, but leave for renewal)

## Tech Stack
- HTML5, CSS3, Vanilla JS (ES6+)
- Google Fonts (Montserrat, Poppins)
- Font Awesome 6.0.0
- AOS 2.3.4 (Animate on Scroll)
- No npm/node dependencies

## Lessons Learned
- Ferozo FTP uploads default to `600` permissions on some files — always chmod 644 after upload
- Ferozo panel does NOT have auto Let's Encrypt — must use manual certbot + DNS challenge
- Ferozo only accepts RSA certificates (not ECDSA) in their SSL panel
- Images must be webp for performance — PNGs were 2-3MB each, webp brings them to 50-230KB
