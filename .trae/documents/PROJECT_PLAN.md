# Project Plan: Dynamic Canvas SaaS

## 1. Project Vision (愿景)
Build a SaaS platform centered around a **low-code canvas** that empowers users to create "Dynamic Posters". These posters are composed of various components (platform built-in or user-uploaded plugins). The core innovation lies in the **dynamic parameter system**, allowing any component property to be static or dynamic.

This enables:
- **Dynamic Image Generation:** Generating personalized images via API (using Satori).
- **Dynamic Marketing Emails:** Sending personalized emails (using Resend).
- **Interactive Embeds:** Sharing dynamic content in Notion or other web pages.

## 2. Business Logic (业务逻辑)

### Core Entities
1.  **Canvas (画布):** The main container. Users can create multiple canvases.
2.  **Component (组件):** Building blocks (Text, Image, QR Code, Charts, etc.).
    -   **Built-in:** Provided by the platform.
    -   **Plugins:** Custom components uploaded by users.
3.  **Parameters (参数):**
    -   **Static:** Fixed values (e.g., background color = white).
    -   **Dynamic:** Values populated at runtime via API or URL parameters (e.g., `user_name`, `discount_code`).

### Workflow
1.  **Design Phase:** User drags and drops components onto the canvas and configures parameters.
2.  **Configuration Phase:** User marks specific parameters as "Dynamic" (e.g., mapping a text field to `{{name}}`).
3.  **Deployment/Usage Phase:**
    -   **API Mode:** Call an endpoint with JSON data to receive a generated image.
    -   **Email Mode:** Connect to a recipient list and send personalized emails using the canvas as a template.
    -   **Share Mode:** Generate a link that accepts query parameters to render the canvas dynamically in real-time.

## 3. Technical Implementation & Challenges (技术实现与难点)

### Tech Stack
-   **Framework:** Next.js + PayloadCMS (Backend/Admin).
-   **Database:** MongoDB.
-   **Storage:** Cloudflare R2 (via PayloadCMS S3 adapter).
-   **Rendering Engine:** Satori (for converting HTML/CSS to SVG/PNG).
-   **Email Service:** Resend.

### Key Challenges
1.  **Rendering Consistency:** Ensuring the canvas editor (DOM) matches the Satori output (SVG/PNG) exactly.
2.  **Performance:** Generating images on-the-fly under high concurrency.
3.  **Plugin Security:** Sandboxing user-uploaded components to prevent malicious code execution.
4.  **Data Validation:** Ensuring dynamic parameters are valid before rendering.

## 4. Business Value (商业价值)
-   **Marketing Automation:** drastically reduces the time to create personalized marketing assets.
-   **Personalization at Scale:** Enables 1-to-1 visual communication (e.g., "Year in Review" images, personalized event tickets).
-   **Integrations:** Acts as a visual micro-service for other platforms (Notion, CRMs).

## 5. Operational Strategy (运营策略)
-   **Template Marketplace:** Seed the platform with high-quality templates for common use cases (e.g., Conference Badges, E-commerce Banners).
-   **Developer Community:** Incentivize developers to create and sell custom component plugins.
-   **Freemium Model:** Free tier for basic usage, paid tier for high-volume API calls and advanced components.

## 6. Infrastructure Status (基础建设状态)
-   [x] **CMS Setup:** PayloadCMS 3.0 configured.
-   [x] **i18n:** configured for English (`en`) and Chinese (`zh`).
-   [x] **Media Storage:** Configured to use Cloudflare R2 via `@payloadcms/storage-s3`.
