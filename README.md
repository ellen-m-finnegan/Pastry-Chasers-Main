# Pastry Chasers

A front-end web application for browsing, searching, and saving favourite exercises, built with Astro, Svelte, and custom CSS.

## Features

- Browse exercises by muscle group, type, or equipment
- Search for exercises with filters
- View detailed instructions and information for each exercise
- Add and manage favourite exercises (stored in localStorage)
- Responsive design with custom styles and Bootstrap
- Fun, pastry-themed UI and branding

## Tech Stack

- [Astro](https://astro.build/) for static site generation and routing
- [Svelte](https://svelte.dev/) for interactive UI components
- [Bootstrap](https://getbootstrap.com/) for layout and components
- Custom CSS in `src/styles/custom.css`
- External API: [API Ninjas Exercises](https://api-ninjas.com/api/exercises)

## Project Structure

```
src/
  components/      # Svelte and Astro UI components
  layouts/         # Shared layout files
  pages/           # Astro route files
  services/        # API/data logic modules
  styles/          # Custom CSS
public/
  images/          # Site images and icons
```

## Developer Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Visit Hosted GitHub Pages Site

You can find the live version of the site here:

[**Pastry Chasers**](https://ellen-m-finnegan.github.io/Pastry-Chasers-Main/)

## Svelte Integration

- Svelte components are loaded in Astro pages using `client:load` or `client:only="svelte"`.
- Ensure `@astrojs/svelte` is installed:
  ```bash
  npx astro add svelte
  ```

## API Usage

- API Ninjas [exercise API](https://www.api-ninjas.com/api/exercises) was used for all exercise data
- [Formspree](https://formspree.io/) was used for the contact form API.

## Styling

- Botstrap was used to give a responsive design

## Contributing

I used Github to handle my contributions

- I used Github Issues and Projects to track my progress

## Reports

Accessibility and Lighthouse reports are available to view in the `docs` folder.

## Credits

- Logo designed by Ellen Finnegan
- Images created using [Canva](https://www.canva.com)
- Equipment, motivation, muscle, and difficulty icons from [icons8](https://icons8.com/icons)
- Favorite, smile, sad, and dice icons from [Flaticon](https://www.flaticon.com)
- Contact form API from [Formspree](https://formspree.io)
- exercise api from [API Ninjas](https://www.api-ninjas.com/api/exercises)

## License

MIT

---

For questions or feedback, use the contact form on the About page or open an issue on GitHub.
