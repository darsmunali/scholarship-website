# ScholarPath

A static scholarship website built with HTML, CSS, and vanilla JavaScript.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the site whenever code is pushed to the `main` branch.

1. Create a **public** repository on GitHub. Leave the option to add a README unchecked.
2. Install Git for Windows and open PowerShell in this project folder.
3. Configure your Git author details if you have not already:

   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

4. Initialize and push the site (replace the URL with your repository's HTTPS URL):

   ```powershell
   git init -b main
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin main
   ```

   GitHub will prompt you to authenticate. Do not put a password or access token in this file or in the remote URL.

5. In the repository, open **Settings > Pages** and set the build and deployment source to **GitHub Actions**.
6. Open the **Actions** tab and wait for the deployment workflow to finish. The site URL will appear in the workflow run and under **Settings > Pages**.

The site uses relative asset paths, so it works from a GitHub Pages project URL as well as a root domain.

## Before making it public

The student identification number has been removed from the page footers. Review the remaining content for any personal details you do not want to make public.
