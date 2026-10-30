# At Your Home Caregiving of Texas LLC — Website Demo

A mobile-first, multi-page business website built with HTML5, CSS3, and vanilla JavaScript.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `gallery.html` — Gallery and accessible lightbox
- `reviews.html` — Links to the public review listing without fabricating testimonials
- `faq.html` — Single-open accordion
- `contact.html` — Contact information, map, and validated email-preparation form
- `privacy.html` / `terms.html` — Draft legal-information pages

## Run locally
Open `index.html` in a browser, or run a local static server from this directory, for example:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

The site uses no frontend framework. Google Fonts, Unsplash images, and Google Maps are external resources and require an internet connection.

## Configure for another business
Edit **`js/config.js`** first. It centralizes:
- Business name, tagline, logo path
- Theme colours (`primaryColor`, `secondaryColor`, `accentColor`)
- Phone, email, address, WhatsApp number
- Facebook/Instagram links, Google Maps and review links
- Opening hours and the service-card content

Replace `images/logo.png` with the client's approved logo and preserve the path or update `BUSINESS.logo`.

## Accuracy and production notes
- Public business profile information from the old listing was used to shape the service descriptions. Confirm all service details, availability, payment options, and scope with the business before launch.
- The gallery uses illustrative stock images, not verified images from the Google Maps listing. Replace them with approved, original business images before launch.
- No customer testimonials are invented. `reviews.html` directs visitors to the public listing because review text could not be reliably verified for reproduction.
- The contact form performs client-side validation and opens a prefilled `mailto:` message. It does not submit data to a backend. For production lead capture, connect a secure form endpoint and publish an approved privacy notice.
- Privacy and terms pages are draft demo copy, not legal advice.
- External images and Google Maps may be unavailable offline.
